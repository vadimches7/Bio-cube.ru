// Public backend function: forwards lead payload to Albato webhook without CORS issues.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers ?? {}),
    },
  });
}

function asTrimmedString(v: unknown, maxLen: number) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, maxLen);
}

function asRecord(v: unknown): Record<string, unknown> {
  if (v && typeof v === "object") return v as Record<string, unknown>;
  return {};
}

function getClientIp(req: Request): string {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

function parseAllowedOrigins(envValue: string | undefined): Set<string> {
  const raw = (envValue ?? "").trim();
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function isOriginAllowed(origin: string | null, allowed: Set<string>): boolean {
  if (allowed.size === 0) return true; // allowlist is not configured
  if (!origin) return false;
  return allowed.has(origin);
}

// In-memory rate limit (best-effort). Works per function instance.
const RATE_LIMIT_WINDOW_MS = 60_000; // 60s
const RATE_LIMIT_MAX = 3; // 3 requests per window
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || now >= current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { ok: true };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  // Basic request size guard (best-effort)
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 50_000) {
    return json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  // Optional origin allowlist
  const allowedOrigins = parseAllowedOrigins(Deno.env.get("ALLOWED_ORIGINS"));
  const origin = req.headers.get("origin");
  if (!isOriginAllowed(origin, allowedOrigins)) {
    console.warn("[lead-webhook] Blocked by origin allowlist", { origin });
    return json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // Best-effort rate limit
  const ip = getClientIp(req);
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 120);
  const rateKey = `${ip}|${ua}`;
  const rl = checkRateLimit(rateKey);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many requests", retry_after_sec: rl.retryAfterSec ?? 60 },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (e) {
    console.error("[lead-webhook] Invalid JSON", e);
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const b = asRecord(body);

  // Backend honeypot: bots often fill "website" field
  const website = asTrimmedString(b["website"], 200);
  if (website) {
    console.warn("[lead-webhook] Honeypot triggered", { ip });
    return json({ ok: true, skipped: true });
  }

  const payload = {
    name: asTrimmedString(b["name"], 100),
    phone: asTrimmedString(b["phone"], 50),
    comment: asTrimmedString(b["comment"], 1000),
    messenger: asTrimmedString(b["messenger"], 20),

    mode: asTrimmedString(b["mode"], 30),
    form_name: asTrimmedString(b["form_name"], 60),
    page_url: asTrimmedString(b["page_url"], 2048),

    // UTM params (optional)
    utm_source: asTrimmedString(b["utm_source"], 100),
    utm_medium: asTrimmedString(b["utm_medium"], 100),
    utm_campaign: asTrimmedString(b["utm_campaign"], 150),
    utm_content: asTrimmedString(b["utm_content"], 150),
    utm_term: asTrimmedString(b["utm_term"], 150),

    timestamp: asTrimmedString(b["timestamp"], 40),
  };

  if (!payload.name || !payload.phone) {
    return json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const webhookUrl =
    Deno.env.get("ALBATO_WEBHOOK_URL") ??
    Deno.env.get("VITE_ALBATO_WEBHOOK_URL") ??
    "";

  if (!webhookUrl) {
    console.warn("[lead-webhook] Webhook URL is not configured. Skipping forward.");
    return json({ ok: true, skipped: true });
  }

  try {
    console.log("[lead-webhook] Forwarding lead", {
      mode: payload.mode,
      form_name: payload.form_name,
      messenger: payload.messenger,
    });

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => "");
    const preview = text.length > 400 ? `${text.slice(0, 400)}…` : text;

    console.log("[lead-webhook] Webhook response", {
      status: res.status,
      ok: res.ok,
      body_preview: preview,
    });

    if (!res.ok) {
      return json(
        { ok: false, error: `Webhook responded with HTTP ${res.status}` },
        { status: 502 },
      );
    }

    return json({ ok: true });
  } catch (e) {
    console.error("[lead-webhook] Forward failed", e);
    return json({ ok: false, error: "Forward failed" }, { status: 502 });
  }
});

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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    console.error("[lead-webhook] Invalid JSON", e);
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = {
    name: asTrimmedString(body?.name, 100),
    phone: asTrimmedString(body?.phone, 50),
    comment: asTrimmedString(body?.comment, 1000),
    messenger: asTrimmedString(body?.messenger, 20),

    mode: asTrimmedString(body?.mode, 30),
    form_name: asTrimmedString(body?.form_name, 60),
    page_url: asTrimmedString(body?.page_url, 2048),

    // UTM params (optional)
    utm_source: asTrimmedString(body?.utm_source, 100),
    utm_medium: asTrimmedString(body?.utm_medium, 100),
    utm_campaign: asTrimmedString(body?.utm_campaign, 150),
    utm_content: asTrimmedString(body?.utm_content, 150),
    utm_term: asTrimmedString(body?.utm_term, 150),

    timestamp: asTrimmedString(body?.timestamp, 40),
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

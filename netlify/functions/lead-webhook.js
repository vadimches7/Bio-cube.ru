// Netlify Function: lead-webhook
// Receives lead payload from the frontend and forwards it to Albato webhook.
//
// Environment variables (Netlify):
// - ALBATO_WEBHOOK_URL: target webhook URL (Albato incoming webhook)
//
// Notes:
// - We keep a canonical schema (comment/form_name/mode/...) and also provide
//   compatibility aliases (message/form/source/deal_name/lead_name), because
//   Albato templates often expect those names.

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function asTrimmedString(v, maxLen) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, maxLen);
}

function asRecord(v) {
  return v && typeof v === "object" ? v : {};
}

function parseModeFromPageUrl(pageUrl) {
  try {
    const u = new URL(pageUrl);
    const m = u.searchParams.get("mode");
    if (m === "installation" || m === "service") return m;
  } catch {
    // ignore
  }
  return "";
}

function getQueryParamFromUrl(urlString, key) {
  try {
    const u = new URL(urlString);
    return (u.searchParams.get(key) ?? "").trim();
  } catch {
    return "";
  }
}

exports.handler = async (event) => {
  // CORS preflight (optional; mostly useful if you call it cross-origin)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  // Guard: basic payload size
  const contentLength = Number(event.headers?.["content-length"] ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 50_000) {
    return json(413, { ok: false, error: "Payload too large" });
  }

  let body;
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  const b = asRecord(body);

  // Honeypot: bots often fill "website"
  const website = asTrimmedString(b.website, 200);
  if (website) {
    return json(200, { ok: true, skipped: true });
  }

  const page_url = asTrimmedString(b.page_url, 2048);
  const mode =
    asTrimmedString(b.mode ?? b.source, 30) ||
    parseModeFromPageUrl(page_url) ||
    "installation";
  const form_name = asTrimmedString(b.form_name ?? b.form, 60) || "site";
  const comment = asTrimmedString(b.comment ?? b.message, 1000);
  const messenger = asTrimmedString(b.messenger, 20) || "phone";

  // UTM: prefer explicit fields, fallback to extracting from page_url (?utm_*)
  const utm_source =
    asTrimmedString(b.utm_source, 100) || getQueryParamFromUrl(page_url, "utm_source");
  const utm_medium =
    asTrimmedString(b.utm_medium, 100) || getQueryParamFromUrl(page_url, "utm_medium");
  const utm_campaign =
    asTrimmedString(b.utm_campaign, 150) || getQueryParamFromUrl(page_url, "utm_campaign");
  const utm_content =
    asTrimmedString(b.utm_content, 150) || getQueryParamFromUrl(page_url, "utm_content");
  const utm_term =
    asTrimmedString(b.utm_term, 150) || getQueryParamFromUrl(page_url, "utm_term");

  const payload = {
    // Canonical fields
    name: asTrimmedString(b.name, 100),
    phone: asTrimmedString(b.phone, 50),
    comment,
    messenger,
    mode,
    form_name,
    page_url,

    // UTM (optional)
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,

    timestamp: asTrimmedString(b.timestamp, 40) || new Date().toISOString(),

    // Compatibility aliases
    message: comment,
    form: form_name,
    source: mode,
    deal_name: `BioCube — ${mode} — ${form_name}`,
    lead_name: `BioCube — ${mode} — ${form_name}`,
  };

  if (!payload.name || !payload.phone) {
    return json(400, { ok: false, error: "Missing required fields" });
  }

  const webhookUrl = (process.env.ALBATO_WEBHOOK_URL ?? "").trim();
  if (!webhookUrl) {
    return json(200, { ok: true, skipped: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => "");
    const preview = text.length > 400 ? `${text.slice(0, 400)}…` : text;

    if (!res.ok) {
      return json(502, {
        ok: false,
        error: `Webhook responded with HTTP ${res.status}`,
        body_preview: preview,
      });
    }

    return json(200, { ok: true });
  } catch (e) {
    return json(502, { ok: false, error: "Forward failed" });
  }
};



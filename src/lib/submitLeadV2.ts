import { getUTMParams, ServiceMode } from "@/contexts/ServiceModeContext";
import { supabase } from "@/integrations/supabase/client";

/**
 * submitLeadV2 - единый helper для отправки заявок (без проверок VITE_* env на клиенте)
 *
 * Включает:
 * - Honeypot поле для защиты от ботов
 * - Rate limit (60 секунд между отправками)
 * - UTM-параметры из URL
 * - Полный payload с метаданными
 */

export interface LeadFormData {
  name: string;
  phone: string;
  comment?: string;
  messenger?: "whatsapp" | "telegram" | "phone";
  honeypot?: string; // Должно быть пустым
}

export interface LeadMeta {
  mode: ServiceMode;
  formName: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

const RATE_LIMIT_KEY = "biocube_last_submit";
const RATE_LIMIT_MS = 60000;

function checkRateLimit(): boolean {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return true;
  const elapsed = Date.now() - parseInt(lastSubmit, 10);
  return elapsed >= RATE_LIMIT_MS;
}

function setRateLimitTimestamp(): void {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}

export function getRateLimitRemaining(): number {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return 0;

  const elapsed = Date.now() - parseInt(lastSubmit, 10);
  const remaining = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
  return Math.max(0, remaining);
}

export async function submitLead(
  formData: LeadFormData,
  meta: LeadMeta
): Promise<SubmitResult> {
  // 1) Honeypot
  if (formData.honeypot && formData.honeypot.trim() !== "") {
    console.warn("[submitLead] Honeypot triggered");
    return { success: true };
  }

  // 2) Rate limit
  if (!checkRateLimit()) {
    const remaining = getRateLimitRemaining();
    return {
      success: false,
      error: `Подождите ${remaining} сек. перед повторной отправкой`,
    };
  }

  // 3) Required fields
  if (!formData.name.trim()) return { success: false, error: "Укажите имя" };
  if (!formData.phone.trim()) return { success: false, error: "Укажите телефон" };

  // 4) Payload
  const payload = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    comment: formData.comment?.trim() || "",
    messenger: formData.messenger || "phone",

    mode: meta.mode,
    form_name: meta.formName,
    page_url: window.location.href,

    ...getUTMParams(),
    timestamp: new Date().toISOString(),
  };

  // 5) Invoke backend function
  try {
    const { data, error } = await supabase.functions.invoke("lead-webhook", {
      body: payload,
    });

    if (error) throw error;

    if ((data as any)?.skipped) {
      console.warn(
        "[submitLead] Webhook URL не задан на backend — заявка не отправлена наружу."
      );
    }

    setRateLimitTimestamp();

    // GTM event
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_submit_success",
        mode: meta.mode,
        form_name: meta.formName,
        messenger: formData.messenger || "phone",
        has_comment: Boolean(formData.comment?.trim()),
        ...getUTMParams(),
      });
    } catch {
      // no-op
    }

    return { success: true };
  } catch (err) {
    console.error("[submitLead] Error:", err);
    return {
      success: false,
      error: "Сервис отправки не настроен. Попробуйте позже или позвоните нам.",
    };
  }
}

import { getUTMParams, ServiceMode } from "@/contexts/ServiceModeContext";
import { normalizeRuPhoneForCRM } from "@/lib/phone";

type GTMEvent = Record<string, unknown>;

type GTMWindow = Window & {
  dataLayer?: GTMEvent[];
};

function pushToDataLayer(event: GTMEvent): void {
  const w = window as GTMWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(event);
}

/**
 * submitLead - Единый helper для отправки заявок
 * 
 * Включает:
 * - Honeypot поле для защиты от ботов
 * - Rate limit (60 секунд между отправками)
 * - UTM-параметры из URL
 * - Полный payload с метаданными
 */

// Интерфейс данных формы
export interface LeadFormData {
  name: string;
  phone: string;
  comment?: string;
  messenger?: "whatsapp" | "telegram" | "phone";
  honeypot?: string; // Должно быть пустым
}

// Интерфейс метаданных
export interface LeadMeta {
  mode: ServiceMode;
  formName: string;
}

// Результат отправки
export interface SubmitResult {
  success: boolean;
  error?: string;
}

// Rate limit: храним timestamp последней отправки
const RATE_LIMIT_KEY = "biocube_last_submit";
const RATE_LIMIT_MS = 60000; // 60 секунд

/**
 * Проверка rate limit
 */
function checkRateLimit(): boolean {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return true;
  
  const elapsed = Date.now() - parseInt(lastSubmit, 10);
  return elapsed >= RATE_LIMIT_MS;
}

/**
 * Установка timestamp последней отправки
 */
function setRateLimitTimestamp(): void {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}

/**
 * Получение оставшегося времени до следующей возможной отправки (в секундах)
 */
export function getRateLimitRemaining(): number {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return 0;
  
  const elapsed = Date.now() - parseInt(lastSubmit, 10);
  const remaining = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
  return Math.max(0, remaining);
}

/**
 * Основная функция отправки заявки
 */
export async function submitLead(
  formData: LeadFormData,
  meta: LeadMeta
): Promise<SubmitResult> {
  // 1. Проверка honeypot (защита от ботов)
  if (formData.honeypot && formData.honeypot.trim() !== "") {
    // Бот заполнил скрытое поле — тихо "успех"
    console.warn("[submitLead] Honeypot triggered");
    return { success: true };
  }
  
  // 2. Проверка rate limit
  if (!checkRateLimit()) {
    const remaining = getRateLimitRemaining();
    return { 
      success: false, 
      error: `Подождите ${remaining} сек. перед повторной отправкой` 
    };
  }
  
  // 3. Валидация обязательных полей
  if (!formData.name.trim()) {
    return { success: false, error: "Укажите имя" };
  }
  const phoneCRM = normalizeRuPhoneForCRM(formData.phone);
  if (!phoneCRM || phoneCRM.length !== 11 || !phoneCRM.startsWith("7")) {
    return { success: false, error: "Укажите телефон в формате +7 (___) ___-__-__" };
  }
  
  // 4. Формирование payload
  const payload = {
    // Данные формы
    name: formData.name.trim(),
    phone: phoneCRM,
    comment: formData.comment?.trim() || "",
    messenger: formData.messenger || "phone",
    
    // Метаданные
    mode: meta.mode,
    form_name: meta.formName,
    page_url: window.location.href,
    
    // UTM-параметры
    ...getUTMParams(),
    
    // Timestamp
    timestamp: new Date().toISOString(),
  };
  
  // 5. Отправка через backend-функцию (обходит CORS и не раскрывает URL вебхука на клиенте)
  try {
    // Primary path: Netlify Function proxy (same-origin)
    const res = await fetch("/.netlify/functions/lead-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as { skipped?: boolean; error?: string };
    if (!res.ok) {
      throw new Error(data?.error || `HTTP ${res.status}`);
    }

    if (data?.skipped) {
      console.warn("[submitLead] ALBATO_WEBHOOK_URL не задан на Netlify — заявка не отправлена наружу.");
    }

    // Устанавливаем rate limit
    setRateLimitTimestamp();

    // GTM: событие успешной заявки (для пикселя/метрики/GA через GTM)
    try {
      pushToDataLayer({
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
  } catch (error) {
    console.error("[submitLead] Error:", error);
    return {
      success: false,
      error: "Ошибка отправки. Попробуйте позже или позвоните нам.",
    };
  }
}

/**
 * Типы статусов формы
 */
export type FormStatus = "idle" | "loading" | "success" | "error";



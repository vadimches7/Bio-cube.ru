import { getUTMParams, ServiceMode } from "@/contexts/ServiceModeContext";

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
  if (!formData.phone.trim()) {
    return { success: false, error: "Укажите телефон" };
  }
  
  // 4. Формирование payload
  const payload = {
    // Данные формы
    name: formData.name.trim(),
    phone: formData.phone.trim(),
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
  
  // 5. Получаем URL вебхука из env
  const webhookUrl = import.meta.env.VITE_ALBATO_WEBHOOK_URL;
  
  if (!webhookUrl) {
    // В dev-режиме просто логируем
    console.log("[submitLead] Webhook URL не задан. Payload:", payload);
    
    // Симулируем успешную отправку для разработки
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRateLimitTimestamp();
    return { success: true };
  }
  
  // 6. Отправка на вебхук
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // Устанавливаем rate limit
    setRateLimitTimestamp();
    
    return { success: true };
  } catch (error) {
    console.error("[submitLead] Error:", error);
    return { 
      success: false, 
      error: "Ошибка отправки. Попробуйте позже или позвоните нам." 
    };
  }
}

/**
 * Типы статусов формы
 */
export type FormStatus = "idle" | "loading" | "success" | "error";


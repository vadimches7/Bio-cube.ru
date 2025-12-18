/**
 * Телефонные утилиты (RU).
 *
 * Требования:
 * - UI показывает маску: +7 (___) ___-__-__
 * - В CRM отправляем в виде цифр: 79002221212 (без +)
 */

function digitsOnly(input: string): string {
  return (input ?? "").replace(/\D/g, "");
}

function takeRuNational10Digits(digits: string): string {
  const d = digitsOnly(digits);
  if (!d) return "";

  // Если начинается с 7/8 (код страны/магистраль) — берём следующие 10 цифр.
  if (d.startsWith("7") || d.startsWith("8")) {
    return d.slice(1, 11);
  }

  // Иначе — берём первые 10 цифр (лишнее обрезаем с конца, чтобы не сдвигало начало)
  return d.slice(0, 10);
}

/**
 * Приводит любой ввод к digits-формату для CRM: 7XXXXXXXXXX.
 * - Если введено 10 цифр (без кода страны) → добавляем 7
 * - Если введено 8XXXXXXXXXX → заменяем 8 на 7
 * - Если введено больше → берём последние 10 и добавляем 7
 */
export function normalizeRuPhoneForCRM(input: string): string {
  const ten = takeRuNational10Digits(input);
  if (!ten) return "";
  if (ten.length !== 10) return ten; // частичный ввод
  return `7${ten}`;
}

/**
 * Форматирует ввод под маску +7 (___) ___-__-__
 * Работает с частичным вводом и вставкой текста.
 */
export function formatRuPhoneMask(input: string): string {
  // Берём только 10 цифр "тела" (после 7/8), лишнее обрезаем с конца
  const d = takeRuNational10Digits(input);

  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 8);
  const e = d.slice(8, 10);

  let out = "+7";
  if (a.length > 0) out += ` (${a}`;
  if (a.length === 3) out += ")";

  if (b.length > 0) out += `${a.length === 3 ? " " : ""}${b}`;
  if (c.length > 0) out += `-${c}`;
  if (e.length > 0) out += `-${e}`;

  return out;
}



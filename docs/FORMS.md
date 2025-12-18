# Forms → CRM (как устроено и как дебажить)

## Цель

Вам нужно одно: **лид должен попадать в CRM**.

Для этого сайт делает только “тонкую” отправку данных, а интеграция с CRM делается на стороне backend/webhook.

## Поток данных (Flow)

1. Пользователь заполняет форму (`ContactFormDialog`)
2. Клиент вызывает `submitLead(formData, meta)`
3. `submitLead` вызывает Supabase Edge Function: `lead-webhook`
4. `lead-webhook` форвардит payload в интеграцию (Albato/Make/Zapier/прямой webhook CRM)

## Где что настраивается

### На стороне сайта (Netlify env)

Нужно только для доступа к Supabase:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### На стороне Supabase (Functions secrets)

- `ALBATO_WEBHOOK_URL` — URL вебхука, который дальше доставляет лид в CRM  
  (может быть Albato/Make, либо прямой endpoint CRM)

Опционально:

- `ALLOWED_ORIGINS` — allowlist Origin через запятую (если включали)

## Как проверить, что лид реально ушёл

### 1) Проверка на стороне браузера

DevTools → **Network** → отправить форму → найти запрос:

- `.../functions/v1/lead-webhook`

Смотреть:

- HTTP статус (200/4xx/5xx)
- response body

### 2) Частые причины “форма показывает успех, но в CRM не пришло”

- **`skipped: true` в ответе**: на backend не настроен webhook (`ALBATO_WEBHOOK_URL` пустой)
- **429 Too many requests**: rate limit на Edge Function (best-effort)
- **403 Forbidden**: включён allowlist `ALLOWED_ORIGINS`, а домен не добавлен
- **400 Missing required fields**: пустые `name`/`phone` (или неправильно передались)
- **502 Webhook responded**: внешний webhook/CRM ответил ошибкой

## Что входит в payload

Типовой payload содержит:

- `name`, `phone`, `comment`, `messenger`
- `mode` (`installation|service`)
- `form_name` (какая форма/CTA)
- `page_url`
- `utm_*` (если есть)
- `timestamp`



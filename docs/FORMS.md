# Forms → CRM (как устроено и как дебажить)

## Цель

Вам нужно одно: **лид должен попадать в CRM**.

Для этого сайт делает только “тонкую” отправку данных, а интеграция с CRM делается на стороне backend/webhook.

## Поток данных (Flow)

1. Пользователь заполняет форму (`ContactFormDialog`)
2. Клиент вызывает `submitLead(formData, meta)`
3. `submitLead` вызывает Netlify Function: `/.netlify/functions/lead-webhook`
4. Netlify Function форвардит payload в интеграцию (Albato/Make/Zapier/прямой webhook CRM)

## Где что настраивается

### На стороне сайта (Netlify env)

Нужно только для форвардинга в CRM через Albato:

- `ALBATO_WEBHOOK_URL` — URL входящего вебхука Albato (или другого интегратора)

ВАЖНО: `ALBATO_WEBHOOK_URL` нельзя делать `VITE_*`, иначе URL попадёт на клиент.

## Как проверить, что лид реально ушёл

### 1) Проверка на стороне браузера

DevTools → **Network** → отправить форму → найти запрос:

- `/.netlify/functions/lead-webhook`

Смотреть:

- HTTP статус (200/4xx/5xx)
- response body

### 2) Частые причины “форма показывает успех, но в CRM не пришло”

- **`skipped: true` в ответе**: на Netlify не настроен webhook (`ALBATO_WEBHOOK_URL` пустой)
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

Дополнительно для удобства маппинга в Albato:

- `message` (алиас `comment`)
- `form` (алиас `form_name`)
- `source` (алиас `mode`)
- `deal_name`, `lead_name` (удобные названия для сделки)



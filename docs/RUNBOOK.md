# Runbook (что делать если что-то сломалось)

## 1) На Netlify 404 при переходе на /privacy или /offer

Причина: SPA + react-router, сервер пытается отдать “файл /privacy”.

Решение: нужен rewrite на `index.html`.

Проверить, что в репозитории есть:

- `netlify.toml` (redirects) и/или
- `public/_redirects`

## 2) Лиды “не приходят в CRM”

Проверка по шагам:

1. В браузере: DevTools → Network → запрос `.../functions/v1/lead-webhook`
2. Если ответа нет/ошибка — это проблема на уровне Supabase/env/доступа
3. Если ответ `ok: true`, но в CRM нет — проблема на стороне webhook/интеграции

Подсказки по статусам:

- `200` + `skipped: true` → не настроен `ALBATO_WEBHOOK_URL` в Supabase Secrets
- `403` → включён `ALLOWED_ORIGINS`, домен не добавлен
- `429` → лимит на Edge Function (можно увеличить/выключить)
- `502` → внешний webhook/CRM вернул ошибку

## 3) Сайт падает в консоли с ошибкой Supabase env

Причина: не заданы `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`.

Решение:

- на локалке: скопировать `env.example` → `.env` и заполнить
- на Netlify: добавить эти переменные в Environment variables

## 4) Сборка не проходит

Быстрая проверка локально:

- `npm run build`
- `npm run lint`






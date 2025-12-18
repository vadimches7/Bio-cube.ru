# Deploy (Netlify)

## TL;DR

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA routing**: настроено в репозитории (`netlify.toml` и `public/_redirects`)

## 1) Подключение репозитория

1. Netlify → **Add new site** → **Import an existing project**
2. Выбираем GitHub репозиторий
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 2) Переменные окружения (Netlify)

Netlify → Site settings → **Environment variables**

Нужно для работы Supabase клиента (и отправки форм):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Шаблон лежит в `env.example` (из-за ограничений окружения файл `.env.example` в репозитории не используем).

## 3) SPA / react-router

Чтобы прямые ссылки работали (например `/privacy`, `/offer`), нужен rewrite на `index.html`.

В репозитории уже добавлено:

- `netlify.toml` (redirects)
- `public/_redirects`

Достаточно одного из них, но наличие обоих безопасно.

## 4) Smoke-check после деплоя

- Открывается `/`
- Открывается **прямой переход** на `/privacy` и `/offer`
- Отправка формы: в DevTools → Network есть запрос на `/functions/v1/lead-webhook` (Supabase)



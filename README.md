# Bio-Cube.ru — лендинг (Vite + React + TS)

Лендинг с двумя режимами контента:
- **`installation`** — установка аквариума “под ключ”
- **`service`** — обслуживание / спасение / диагностика

Режим влияет на порядок секций и тексты, переключается через модалку и плавающий переключатель.

## Скрипты

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Роуты

- `/` — главная
- `/privacy` — политика конфиденциальности (заглушка, заменить перед продом)
- `/offer` — договор оферты (заглушка, заменить перед продом)

## Режимы (mode)

Режим берётся из query-параметра:
- `/?mode=installation`
- `/?mode=service`

Контекст: `src/contexts/ServiceModeContext.tsx`.

## Отправка заявок

Все формы идут через единый helper `src/lib/submitLead.ts` и вызывают backend-Edge Function `lead-webhook` в Supabase.

Настройка через env:
- `VITE_SUPABASE_URL` — URL проекта Supabase
- `VITE_SUPABASE_PUBLISHABLE_KEY` — anon/publishable key Supabase

Шаблон:
- `env.example` → скопировать в `.env` и заполнить.

Webhook URL для Albato **не должен попадать в клиент**. Его нужно задать в Supabase Secrets:
- `ALBATO_WEBHOOK_URL` (Project Settings → Functions/Secrets)

## Контакты/ссылки

Контактные ссылки вынесены в `src/lib/contact.ts` (телефон, WhatsApp, Telegram, email, адрес).

## Документация изменений

- `docs/CHANGELOG.md`
- `docs/AUDIT-2025-12-17.md`
- `docs/AUDIT-2025-12-18.md`

## Документация проекта (рекомендуемое)

- `docs/ARCHITECTURE.md` — как устроены режимы/роутинг/формы
- `docs/CONTENT.md` — где и как менять контент
- `docs/FORMS.md` — формы → CRM + дебаг
- `docs/DEPLOY.md` — деплой на Netlify
- `docs/RUNBOOK.md` — что делать если что-то сломалось


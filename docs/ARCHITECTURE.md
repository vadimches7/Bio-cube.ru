# Архитектура проекта (коротко)

## Стек

- Vite + React + TypeScript
- React Router (SPA)
- TailwindCSS + shadcn/ui (Radix)

## Роуты

- `/` — главная
- `/privacy` — политика (пока заглушка)
- `/offer` — оферта (пока заглушка)

## Режимы (mode)

Есть 2 режима контента:

- `installation` — установка “под ключ”
- `service` — обслуживание / спасение / диагностика

Источник режима:

- query param: `?mode=installation|service`

Логика:

- Контекст `ServiceModeContext` хранит `mode`, синхронизирует с URL и слушает `popstate`
- Главная (`src/pages/Index.tsx`) рендерит разные наборы секций в зависимости от `mode`

## Формы

Все формы идут через единый helper:

- `submitLead(formData, meta)` → Supabase Edge Function `lead-webhook` → webhook/CRM

Док: `docs/FORMS.md`











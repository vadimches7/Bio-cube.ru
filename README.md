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

Все формы идут через единый helper `src/lib/submitLead.ts`.

Настройка через env:
- `VITE_ALBATO_WEBHOOK_URL` — URL вебхука (если не задан, в dev отправка симулируется логом).

## Контакты/ссылки

Контактные ссылки вынесены в `src/lib/contact.ts` (телефон, WhatsApp, Telegram, email, адрес).

## Документация изменений

- `docs/CHANGELOG.md`
- `docs/AUDIT-2025-12-17.md`


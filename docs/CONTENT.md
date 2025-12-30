# Контент и правки (как менять лендинг безопасно)

## Где менять порядок секций

- `src/pages/Index.tsx` — порядок секций и то, что рендерится в зависимости от `mode`

## Где менять режимы / тексты по mode

- `src/contexts/ServiceModeContext.tsx` — `mode` из URL, синхронизация
- Секции в `src/components/sections/*` — тексты/CTA под режимы

## Картинки

### Кейсы “до/после”

- Папка: `public/cases/`
- Пример: `case-001-before.jpg`, `case-001-after.jpg`

### Отзывы (скриншоты)

- Папка: `public/reviews/`
- Имена: `001.jpg`, `002.jpg`, … (3 цифры)
- URL: `/reviews/001.jpg`

Если добавили больше скринов — увеличьте `REVIEW_IMAGES_COUNT` в `src/components/sections/ReviewsSection.tsx`.

## Юридические страницы

- `src/pages/Privacy.tsx` — сейчас заглушка
- `src/pages/Offer.tsx` — сейчас заглушка

Перед продом заменить на финальные тексты.











## Bio‑Cube UI: направления (3 карточки) + sticky‑header

Этот документ описывает, где находится новая логика выбора **направлений** (3 карточки) и sticky‑header, и как это масштабировать.

### Что сделано

- **Выбор направлений “Что вам нужно?”** теперь построен как **glassmorphism‑карточки** поверх общего emotional‑background с **watermark‑логотипом**.
- **3 направления**:
  - Установка аквариума под ключ (recommended)
  - Обслуживание аквариума
  - Декорирование аквариумов (ведёт на отдельную страницу‑заглушку)
- **Sticky‑header**: на скролле появляется CTA‑группа (Позвонить + Telegram + WhatsApp) с плавным **fade + slide**, на mobile — компактно (иконки).

---

### Где что лежит (структура компонентов)

- **Конфиг направлений (единый источник правды)**: `src/lib/directions.ts`
  - `DIRECTIONS[]` — массив направлений (карточек)
- **UI‑рендер карточек (glassmorphism + watermark)**: `src/components/DirectionsPicker.tsx`
- **Модалка “Что вам нужно?” (обёртка + блокировка закрытия)**: `src/components/ModeSelectDialog.tsx`
- **Страница‑заглушка для декора**: `src/pages/Decor.tsx`
- **Маршрут `/decor`**: `src/App.tsx`
- **Sticky‑header (появление CTA при скролле)**: `src/components/Header.tsx`
- **Контакты/ссылки (телефон, Telegram, WhatsApp)**: `src/lib/contact.ts`

---

### Как поменять фото команды (только в модалке выбора направления)

1) Сохраните фото в `public/brand/team-modal.jpg`
2) При необходимости поменяйте путь в `src/lib/brand.ts` → `TEAM_MODAL_PHOTO_IMAGE`

Фото используется **только** в модальном окне выбора направления (`ModeSelectDialog`).

---

### Как управлять направлениями (карточками)

Откройте `src/lib/directions.ts` и отредактируйте массив `DIRECTIONS`:

- **Тексты**: `title`, `subtitle`, `highlight`, `badges`, `cta`
- **Иконка**: `icon` (берётся из `lucide-react`)
- **Поведение**:
  - `kind: "mode"` + `mode: "installation" | "service"` — переключает текущий режим сайта
  - `kind: "route"` + `href: "/decor"` — ведёт на отдельную страницу

---

### Как добавить 4‑е направление (2 сценария)

#### Вариант A — 4‑е направление ведёт на отдельную страницу (рекомендуется)

1) Добавьте объект в `DIRECTIONS` с `kind: "route"` и `href: "/new-direction"`.
2) Создайте страницу, например `src/pages/NewDirection.tsx`.
3) Добавьте маршрут в `src/App.tsx`.

#### Вариант B — 4‑е направление становится новым “режимом” (mode)

Сейчас `ServiceMode` ограничен двумя значениями: `"installation" | "service"` в `src/contexts/ServiceModeContext.tsx`.

Если нужно добавить новый режим:

1) Расширьте `ServiceMode` (например `"decor"`).
2) Обновите логику секций в `src/pages/Index.tsx` (что показывать в новом режиме).
3) Обновите тексты/CTA (например в `HeroSection`, `QuizSection`, `FinalCTASection`), если они завязаны на `mode`.

---

### Sticky‑header: где менять порог/поведение

В `src/components/Header.tsx`:

- **Порог появления CTA**: `SCROLL_THRESHOLD_PX`
- **Анимация**: Tailwind‑классы на CTA‑контейнере (opacity/translate + duration)

Ссылки на “Позвонить / Telegram / WhatsApp” берутся из `src/lib/contact.ts`.



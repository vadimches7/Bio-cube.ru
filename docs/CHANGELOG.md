# Bio-Cube Landing — CHANGELOG

## Update (17.12.2025)

### Главное
- Сжата главная в режиме **service**: убраны дублирующие секции, оставлено “ядро” для конверсии.
- В `Hero`:
  - главный CTA в **фирменном зелёном**,
  - бейджи перенесены **над CTA**,
  - “Листайте” переведено **в поток** (без перекрытий),
  - вторичная кнопка в `service` ведёт на `#service-visit`.
- Убраны `href="#"`:
  - добавлены `/privacy` и `/offer`,
  - телефон/мессенджеры стали реальными ссылками.
- SEO-база в `index.html` обновлена (без lovable og-image).

### Техпроверка
- `npm run lint`: 0 ошибок (есть warnings react-refresh в UI).
- `npm run build`: PASSED.

## Audit Summary (17.12.2024)

### Текущая архитектура mode

1. **ServiceModeContext** (`src/contexts/ServiceModeContext.tsx`)
   - Хранит `mode: "installation" | "service"`
   - Читает из URL `?mode=` при загрузке
   - Обновляет URL через `history.replaceState` при изменении
   - Синхронизирует с `popstate` событием

2. **ModeSelectDialog** (`src/components/ModeSelectDialog.tsx`)
   - `isOpen=true` по умолчанию
   - Закрывается только выбором режима
   - ❌ Нет блокировки Esc
   - ❌ Нет подсветки рекомендуемого режима из URL

3. **FloatingModeSwitch** (`src/components/FloatingModeSwitch.tsx`)
   - Desktop: справа по центру
   - Mobile: внизу экрана
   - ❌ Показывается всегда, даже когда модалка открыта

### Секции и зависимость от mode

| Секция | Зависит от mode | Статус |
|--------|-----------------|--------|
| HeroSection | ✅ Да | Trust badges всегда bio-стиль |
| TrustSection | ❌ Нет | Нужно адаптировать |
| QuizSection | ❌ Нет | Для service нужен другой квиз |
| CasesSection | ✅ Да | OK |
| BeforeAfterSection | ✅ Да (только service) | OK |
| ProcessSection | ✅ Да | OK |
| GuaranteesSection | ❌ Нет | Нужно адаптировать |
| TeamSection | ❌ Нет | Оставить как есть |
| FAQSection | ❌ Нет | Нужно адаптировать |
| FinalCTASection | ✅ Да | OK |

### Формы

- **ContactFormDialog** — зависит от mode, но:
  - ❌ Нет реальной отправки (только симуляция)
  - ❌ Нет антиспама (honeypot, rate limit)
  - ❌ Нет единого helper'а

---

## План работ

### Этап 1: UX режимов (приоритет ВЫСОКИЙ) ✅
- [x] ModeSelectDialog: блокировка Esc
- [x] ModeSelectDialog: подсветка режима из URL как "рекомендуем"
- [x] FloatingModeSwitch: скрывать когда модалка открыта
- [x] ServiceModeContext: добавить `isModeSelected` состояние

### Этап 2: Контентные правки (приоритет СРЕДНИЙ) ✅
- [x] HeroSection: trust badges адаптировать под mode
- [x] QuizSection: адаптировать под mode (разные вопросы)
- [x] ServiceFormatsSection: создать для режима service
- [x] TrustSection: адаптировать под mode
- [x] GuaranteesSection: адаптировать под mode
- [x] FAQSection: адаптировать под mode
- [x] ProcessSection: адаптировать цвета под mode
- [x] CasesSection: адаптировать цвета под mode

### Этап 3: Формы и отправка (приоритет СРЕДНИЙ) ✅
- [x] Создать `src/lib/submitLead.ts`
- [x] Добавить honeypot поле
- [x] Добавить rate limit (60 сек)
- [x] Интегрировать во все формы
- [x] Добавить выбор мессенджера
- [x] Добавить поле комментария

### Этап 4: Качество сборки ✅
- [x] Проверить `npm run build` — PASSED
- [x] Проверить линтер — 0 ошибок

---

## Риски

1. **URL params** — replaceState не триггерит popstate, учтено
2. **Модалка и Esc** — нужно перехватывать keydown на уровне документа
3. **Формы** — webhook URL из env, нужен шаблон env
   - Примечание: из-за ограничений окружения в репозитории лежит `env.example` (без точки). Используйте его как шаблон для `.env`.
4. **Роутинг** — SPA, react-router, mode в query params

---

## Список изменённых файлов

- `src/contexts/ServiceModeContext.tsx` — добавлен isModeSelected
- `src/components/ModeSelectDialog.tsx` — блокировка Esc, подсветка режима
- `src/components/FloatingModeSwitch.tsx` — скрытие при открытой модалке
- `src/components/sections/HeroSection.tsx` — trust badges под mode
- `src/components/sections/QuizSection.tsx` — адаптация под mode
- `src/components/sections/TrustSection.tsx` — адаптация под mode
- `src/components/sections/GuaranteesSection.tsx` — адаптация под mode
- `src/components/sections/FAQSection.tsx` — адаптация под mode
- `src/components/sections/ServiceFormatsSection.tsx` — новая секция
- `src/pages/Index.tsx` — подключение ServiceFormatsSection
- `src/lib/submitLead.ts` — новый helper
- `src/components/ContactFormDialog.tsx` — интеграция submitLead
- `docs/CHANGELOG.md` — документация

---

## Payload для submitLead

```json
{
  "name": "Иван",
  "phone": "+7 999 123-45-67",
  "comment": "Интересует морской аквариум",
  "messenger": "whatsapp",
  "mode": "installation",
  "form_name": "hero_cta",
  "page_url": "https://bio-cube.ru/?mode=installation",
  "utm_source": "vk",
  "utm_medium": "cpc",
  "utm_campaign": "aquarium_install",
  "timestamp": "2024-12-17T15:30:00.000Z"
}
```

---

## Acceptance Checklist

- [x] Модалка выбора режима появляется ВСЕГДА при загрузке
- [x] Модалка НЕ закрывается по Esc / клику по overlay
- [x] Модалка закрывается ТОЛЬКО выбором режима
- [x] При ?mode=service в URL — подсвечивается карточка service как "Рекомендуем"
- [x] mode меняет контент всех секций (Hero, Quiz, Trust, Guarantees, FAQ, Process, Cases)
- [x] Floating switch НЕ виден когда модалка открыта
- [x] Floating switch работает desktop/mobile после выбора
- [x] Формы отправляются через единый helper (submitLead.ts)
- [x] Формы имеют honeypot + rate limit (60 сек)
- [x] Формы показывают loading/success/error
- [x] URL mode обновляется при переключении (history.replaceState)
- [x] npm run build проходит без ошибок ✅

### Дополнительно (контент для service)

- [x] Добавлен блок “Если у вас… — мы поможем” (problem → solution)
- [x] Добавлен блок “Что делаем за визит” + “Диагностика — без гаданий”
- [x] Форматы сервиса переписаны без цен: “кому подходит / результат”
- [x] Добавлен CTA “Срочно (до 4 часов)” с предзаполнением комментария в форму
- [x] Добавлен блок “Как проходит сервис” (шаги)
- [x] Добавлен блок “Что вы получаете после диагностики”
- [x] Добавлен блок “Для чего нужен разовый выезд”
- [x] Добавлен блок “Пресный/морской сервис” + мини‑кейсы с фото‑плейсхолдерами
- [x] Добавлен чек‑лист подготовки к визиту

---

## Как тестировать

1. Открыть `http://localhost:8080` — должна появиться модалка
2. Нажать Esc — модалка НЕ должна закрыться
3. Кликнуть по overlay — модалка НЕ должна закрыться
4. Открыть `http://localhost:8080/?mode=service` — карточка "Обслуживание" подсвечена
5. Выбрать режим — модалка закрывается, появляется floating switch
6. Переключить режим на floating switch — контент всех секций меняется
7. URL обновляется без перезагрузки
8. Заполнить форму и отправить — проверить loading/success состояния

---

## Backlog (будущие улучшения)

- [ ] Server endpoint вместо webhook (для надёжности)
- [ ] Сохранение выбора режима в localStorage (опционально)
- [ ] A/B тестирование для VK трафика
- [ ] Интеграция с Яндекс.Метрикой (цели)
- [ ] Интеграция с VK Pixel
- [ ] SEO: мета-теги под режим


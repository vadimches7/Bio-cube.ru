# Краткая справка для Gemini AI - Bio-Cube.ru

## 🎯 Проект
Лендинг Bio-Cube.ru (Vite + React + TypeScript) → планируется превращение в платформу-конструктор/маркетплейс

## 📦 Технологии
- **Frontend**: Vite 5.4.19, React 18.3.1, TypeScript 5.8.3
- **UI**: TailwindCSS 3.4.17, shadcn/ui (Radix UI)
- **Routing**: React Router 6.30.1
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **Backend**: Netlify Functions, Supabase (настроен, не используется)
- **Deploy**: Netlify

## 🏗️ Архитектура

### Режимы работы
```typescript
type ServiceMode = "installation" | "service" | "decoration";
```
- Определяется из URL: `?mode=installation|service|decoration`
- Влияет на контент секций и порядок блоков
- Управляется через `ServiceModeContext`

### Структура
```
src/
├── pages/Index.tsx              # Главная страница
├── contexts/ServiceModeContext.tsx  # Режимы
├── components/
│   ├── sections/ (20 файлов)    # Секции лендинга
│   ├── ui/ (48 файлов)          # shadcn/ui компоненты
│   └── ContactFormDialog.tsx    # Форма обратной связи
├── lib/
│   ├── submitLead.ts           # Отправка заявок
│   ├── phone.ts                # Форматирование телефонов
│   └── contact.ts              # Контактные данные
└── integrations/supabase/      # Supabase (настроен, не используется)
```

## 🔄 Система форм

### submitLead() - единый helper для всех форм
```typescript
submitLead(formData: LeadFormData, meta: LeadMeta): Promise<SubmitResult>
```

**Процесс**:
1. Honeypot проверка (защита от ботов)
2. Rate limiting (60 сек между отправками)
3. Валидация полей
4. Отправка → Netlify Function → Albato Webhook → CRM

**Payload**:
```typescript
{
  name, phone, comment, messenger,
  mode, form_name, page_url,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  timestamp
}
```

## 🗄️ База данных

### Текущее состояние
- Supabase настроен, но БД пустая (нет таблиц)
- Типы определены в `src/integrations/supabase/types.ts`
- Клиент в `src/integrations/supabase/client.ts`

### Планируемая схема (для маркетплейса)
```sql
organizations (id, name, slug, domain, logo_url, theme_colors, settings)
users (id, email, organization_id, role)
pages (id, organization_id, slug, title, blocks JSONB, seo_settings, published)
forms (id, organization_id, name, fields JSONB, webhook_url)
leads (id, organization_id, form_id, data JSONB, utm_params)
media (id, organization_id, url, type, metadata)
```

## 🎨 Дизайн-система "Glass OS"

**Цвета**:
- Background: `hsl(220 20% 6%)` - темный синий
- Bio Green: `hsl(145 60% 45%)`
- Amber: `hsl(38 90% 55%)`

**Эффекты**:
- Glassmorphism (`backdrop-blur-xl`)
- Градиенты
- Свечение (glow)
- Каустика (caustic) - свет через воду

## 📝 Конфигурация

### vite.config.ts
- Port: 8080
- Auto-open browser: true
- Code splitting: react, router, supabase, radix, tanstack, icons, charts
- Alias: `@/*` → `./src/*`

### netlify.toml
- Build: `npm run build`
- Publish: `dist`
- Functions: `netlify/functions`
- Redirects: SPA routing (`/*` → `/index.html`)

## 🔌 Интеграции

**Текущие**:
- ✅ Netlify Function → Albato Webhook → CRM
- ✅ Google Tag Manager (GTM)
- ⚠️ Supabase (настроен, не используется)

**Планируемые**:
- CRM (AmoCRM, Битрикс24)
- Email (SendGrid, Mailgun)
- SMS (Twilio)
- Платежи (Stripe, ЮKassa)

## 🚀 План миграции в маркетплейс

**Фаза 1**: Фундамент (2-3 недели)
- Supabase БД + схема
- Аутентификация
- Система организаций (multi-tenancy)
- Базовая админ-панель

**Фаза 2**: Конструктор (3-4 недели)
- Система блоков
- Drag & Drop редактор
- WYSIWYG редактор
- Предпросмотр и публикация

**Фаза 3**: Интеграции (2-3 недели)
- Динамические формы
- Интеграции с CRM
- Загрузка медиа
- Webhooks

**Фаза 4**: Полировка (2-3 недели)
- Шаблоны и темы
- Аналитика
- Оптимизация
- Документация

## 📚 Документация

- `docs/ANALYSIS-MARKETPLACE.md` - полный анализ для маркетплейса
- `docs/ARCHITECTURE-MARKETPLACE.md` - архитектура маркетплейса
- `docs/GEMINI-PROJECT-INFO.md` - полная информация о проекте

## 🔑 Ключевые файлы

**Архитектура**:
- `src/App.tsx` - структура приложения
- `src/pages/Index.tsx` - главная страница
- `src/contexts/ServiceModeContext.tsx` - режимы

**Формы**:
- `src/lib/submitLead.ts` - отправка заявок
- `src/components/ContactFormDialog.tsx` - форма
- `netlify/functions/lead-webhook.js` - backend

**Стили**:
- `src/index.css` - глобальные стили
- `tailwind.config.ts` - конфигурация Tailwind

## 💡 Особенности

- **Code Splitting**: Ручное разделение на чанки
- **Безопасность**: Honeypot + Rate limiting
- **SEO**: Мета-теги, структурированные данные
- **Производительность**: Lazy loading, оптимизация изображений

## 📞 Контакты

- Телефон: +7 (967) 133-07-73
- WhatsApp: +7 (916) 433-30-70
- Telegram: @biocube_zabota_bot
- Email: info@bio-cube.ru

**Юридическая информация**:
- ИП Нелюбов Денис Евгеньевич
- ИНН: 774330502176
- ОГРНИП: 318774600189566

---

**Для полной информации**: см. `docs/GEMINI-PROJECT-INFO.md`

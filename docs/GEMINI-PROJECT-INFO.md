# Полная информация о проекте Bio-Cube.ru для анализа в Gemini

## 📋 Оглавление
1. [Общая информация](#общая-информация)
2. [Технологический стек](#технологический-стек)
3. [Структура проекта](#структура-проекта)
4. [Конфигурационные файлы](#конфигурационные-файлы)
5. [Архитектура приложения](#архитектура-приложения)
6. [База данных и типы](#база-данных-и-типы)
7. [Ключевые компоненты](#ключевые-компоненты)
8. [Система форм и интеграции](#система-форм-и-интеграции)
9. [Стили и дизайн-система](#стили-и-дизайн-система)
10. [Планы развития](#планы-развития)

---

## Общая информация

**Название проекта**: Bio-Cube.ru  
**Тип**: Лендинг (планируется превращение в платформу-конструктор/маркетплейс)  
**Домен**: bio-cube.ru  
**Версия**: 0.0.0  
**Статус**: Production (лендинг), планируется миграция в маркетплейс

**Описание**: Лендинг для компании по установке и обслуживанию аквариумов. Поддерживает несколько режимов контента (installation, service, decoration) в зависимости от query-параметра.

---

## Технологический стек

### Frontend
- **Build Tool**: Vite 5.4.19
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **UI Framework**: TailwindCSS 3.4.17
- **Component Library**: shadcn/ui (Radix UI)
- **Routing**: React Router 6.30.1
- **State Management**: React Context API
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **HTTP Client**: Fetch API
- **Icons**: Lucide React 0.462.0

### Backend/Infrastructure
- **Hosting**: Netlify
- **Database**: Supabase (PostgreSQL) - настроен, но не используется активно
- **Functions**: Netlify Functions
- **Storage**: Supabase Storage (настроен, но не используется)
- **Auth**: Supabase Auth (настроен, но не используется)

### Development Tools
- **Linter**: ESLint 9.32.0
- **Type Checking**: TypeScript
- **CSS**: PostCSS + Autoprefixer
- **Package Manager**: npm (есть bun.lockb)

### Key Dependencies

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/*": "^1.x.x", // 20+ компонентов
    "@supabase/supabase-js": "^2.88.0",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  }
}
```

---

## Структура проекта

```
Bio-cube.ru/
├── src/
│   ├── App.tsx                    # Главный компонент приложения
│   ├── main.tsx                   # Точка входа
│   ├── index.css                  # Глобальные стили
│   ├── App.css                    # Стили приложения
│   │
│   ├── pages/                     # Страницы
│   │   ├── Index.tsx              # Главная страница
│   │   ├── NotFound.tsx           # 404 страница
│   │   ├── Privacy.tsx            # Политика конфиденциальности
│   │   └── Offer.tsx              # Договор оферты
│   │
│   ├── components/                # Компоненты
│   │   ├── sections/              # Секции лендинга (20 файлов)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── CasesSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── QuizSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── GuaranteesSection.tsx
│   │   │   ├── BeforeAfterSection.tsx
│   │   │   ├── FinalCTASection.tsx
│   │   │   └── Service*Section.tsx (10+ файлов)
│   │   │
│   │   ├── ui/                    # UI компоненты (shadcn/ui - 48 файлов)
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   └── ... (44 других)
│   │   │
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ContactFormDialog.tsx  # Модальное окно формы
│   │   ├── FloatingModeSwitch.tsx # Плавающий переключатель режимов
│   │   ├── ModeSelectDialog.tsx   # Диалог выбора режима
│   │   ├── VideoIntro.tsx         # Видео-заставка
│   │   └── BioCubeLogo.tsx
│   │
│   ├── contexts/                  # React Context
│   │   └── ServiceModeContext.tsx  # Контекст режимов работы
│   │
│   ├── lib/                       # Утилиты
│   │   ├── utils.ts               # cn() - утилита для классов
│   │   ├── contact.ts             # Контактные данные
│   │   ├── phone.ts               # Форматирование телефонов
│   │   └── submitLead.ts         # Отправка заявок
│   │
│   ├── hooks/                     # Кастомные хуки
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   └── integrations/              # Интеграции
│       └── supabase/
│           ├── client.ts          # Supabase клиент
│           └── types.ts          # Типы БД
│
├── public/                        # Статические файлы
│   ├── reviews/                   # Отзывы (61 изображение)
│   ├── cases/                     # Кейсы до/после
│   ├── brand/                     # Брендинг
│   ├── video/                     # Видео
│   └── robots.txt
│
├── netlify/                       # Netlify Functions
│   └── functions/
│       └── lead-webhook.js       # Webhook для CRM
│
├── supabase/                      # Supabase конфигурация
│   ├── config.toml
│   └── functions/
│       └── lead-webhook/
│           └── index.ts
│
├── docs/                          # Документация
│   ├── ARCHITECTURE.md
│   ├── CONTENT.md
│   ├── FORMS.md
│   ├── DEPLOY.md
│   ├── RUNBOOK.md
│   ├── ANALYSIS-MARKETPLACE.md
│   └── ARCHITECTURE-MARKETPLACE.md
│
├── vite.config.ts                 # Конфигурация Vite
├── tailwind.config.ts             # Конфигурация Tailwind
├── tsconfig.json                  # Конфигурация TypeScript
├── package.json                  # Зависимости
├── netlify.toml                   # Конфигурация Netlify
└── env.example                    # Шаблон переменных окружения
```

---

## Конфигурационные файлы

### package.json
```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: true, // Автоматическое открытие браузера
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          radix: [/* 20+ Radix компонентов */],
          tanstack: ["@tanstack/react-query"],
          icons: ["lucide-react"],
          charts: ["recharts"],
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        // shadcn/ui цвета через CSS переменные
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Кастомные цвета Bio-Cube
        bio: {
          DEFAULT: "hsl(var(--bio-green))",
          light: "hsl(var(--bio-green-light))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          light: "hsl(var(--amber-light))",
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

# React Router SPA: allow direct opens of /privacy, /offer, etc.
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Архитектура приложения

### Роутинг

**React Router v6** с следующими маршрутами:
- `/` - Главная страница (Index.tsx)
- `/privacy` - Политика конфиденциальности
- `/offer` - Договор оферты
- `*` - 404 страница (NotFound.tsx)

### Система режимов (ServiceModeContext)

**Типы режимов**:
```typescript
type ServiceMode = "installation" | "service" | "decoration";
```

**Функциональность**:
- Режим определяется из URL query-параметра: `?mode=installation|service|decoration`
- Синхронизация с URL через `window.history.replaceState`
- Слушатель `popstate` для поддержки кнопок браузера
- Контекст доступен через `useServiceMode()` hook

**Режимы влияют на**:
- Контент секций (тексты, CTA кнопки)
- Порядок секций на странице
- Формы и их заголовки

### Структура главной страницы (Index.tsx)

```typescript
<ServiceModeProvider>
  <main>
    <VideoIntro onComplete={...} />
    {showContent && (
      <>
        <FloatingModeSwitch />
        <HeroSection />
        <ServicesSection />
        <ReviewsSection />
        <Footer />
      </>
    )}
  </main>
</ServiceModeProvider>
```

**Особенности**:
- Видео-заставка при первой загрузке
- Плавающий переключатель режимов
- Динамический контент в зависимости от режима

---

## База данных и типы

### Supabase Types (src/integrations/supabase/types.ts)

**Текущее состояние**: База данных настроена, но пустая (нет таблиц)

```typescript
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      [_ in never]: never  // Нет таблиц
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
```

**Планируемая схема для маркетплейса** (из ANALYSIS-MARKETPLACE.md):

```sql
-- Организации (tenants)
organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  logo_url TEXT,
  theme_colors JSONB,
  settings JSONB,
  created_at TIMESTAMPTZ
)

-- Пользователи
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  organization_id UUID REFERENCES organizations(id),
  role TEXT CHECK (role IN ('owner', 'admin', 'user')),
  profile_data JSONB,
  created_at TIMESTAMPTZ
)

-- Страницы
pages (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  blocks JSONB NOT NULL,
  seo_settings JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  UNIQUE(organization_id, slug)
)

-- Формы
forms (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  fields JSONB NOT NULL,
  webhook_url TEXT,
  created_at TIMESTAMPTZ
)

-- Заявки
leads (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  form_id UUID REFERENCES forms(id),
  data JSONB NOT NULL,
  utm_params JSONB,
  created_at TIMESTAMPTZ
)

-- Медиа
media (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  url TEXT NOT NULL,
  type TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ
)
```

### Supabase Client (src/integrations/supabase/client.ts)

```typescript
export function getSupabaseClient() {
  if (_client) return _client;

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      "[supabase] Не заданы env-переменные VITE_SUPABASE_URL и/или VITE_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  _client = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return _client;
}
```

**Статус**: Клиент настроен, но не используется в текущей версии (лендинг работает без БД)

---

## Ключевые компоненты

### ServiceModeContext (src/contexts/ServiceModeContext.tsx)

**Основные функции**:
- `getModeFromURL()` - получение режима из URL
- `getUTMParams()` - извлечение UTM-параметров
- `updateURLMode()` - обновление URL без перезагрузки
- `ServiceModeProvider` - провайдер контекста
- `useServiceMode()` - хук для использования контекста

**Интерфейс**:
```typescript
interface ServiceModeContextType {
  mode: ServiceMode;
  setMode: (mode: ServiceMode) => void;
  isModeSelected: boolean;
  setModeSelected: () => void;
  suggestedMode: ServiceMode;
}
```

### ContactFormDialog (src/components/ContactFormDialog.tsx)

**Функциональность**:
- Модальное окно формы обратной связи
- Валидация полей (имя, телефон, комментарий)
- Выбор способа связи (телефон, WhatsApp, Telegram)
- Honeypot защита от ботов
- Rate limiting (60 секунд)
- Интеграция с `submitLead()`

**Поля формы**:
- `name` (обязательное)
- `phone` (обязательное, форматирование маской)
- `comment` (опциональное)
- `messenger` (выбор: phone/whatsapp/telegram)
- `honeypot` (скрытое поле для ботов)

### submitLead (src/lib/submitLead.ts)

**Основная функция отправки заявок**:

```typescript
export async function submitLead(
  formData: LeadFormData,
  meta: LeadMeta
): Promise<SubmitResult>
```

**Процесс**:
1. Проверка honeypot (защита от ботов)
2. Проверка rate limit (60 секунд)
3. Валидация обязательных полей
4. Формирование payload с UTM-параметрами
5. Отправка через Netlify Function `/.netlify/functions/lead-webhook`
6. Отправка события в GTM (Google Tag Manager)

**Payload структура**:
```typescript
{
  name: string,
  phone: string, // формат: 7XXXXXXXXXX
  comment: string,
  messenger: "phone" | "whatsapp" | "telegram",
  mode: ServiceMode,
  form_name: string,
  page_url: string,
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  utm_content?: string,
  utm_term?: string,
  timestamp: string
}
```

### Netlify Function: lead-webhook (netlify/functions/lead-webhook.js)

**Функциональность**:
- Принимает POST запрос с данными формы
- Валидирует payload
- Формирует совместимый формат для Albato
- Отправляет в CRM через `ALBATO_WEBHOOK_URL`
- Обрабатывает ошибки и возвращает статусы

**Особенности**:
- CORS поддержка
- Проверка размера payload (макс 50KB)
- Honeypot проверка
- Извлечение UTM из URL
- Формирование quiz_note для квизов

---

## Система форм и интеграции

### Форматирование телефонов (src/lib/phone.ts)

**Функции**:
- `normalizeRuPhoneForCRM(input: string): string` - приводит к формату `7XXXXXXXXXX`
- `formatRuPhoneMask(input: string): string` - форматирует под маску `+7 (___) ___-__-__`

**Логика**:
- Поддержка ввода с 7, 8, или без кода страны
- Автоматическое добавление 7 для 10-значных номеров
- Частичный ввод поддерживается

### Контактные данные (src/lib/contact.ts)

```typescript
export const CONTACT_PHONE_DISPLAY = "+7 (967) 133-07-73";
export const CONTACT_PHONE_E164 = "+79671330773";
export const WHATSAPP_PHONE_DISPLAY = "+7 (916) 433-30-70";
export const WHATSAPP_PHONE_E164 = "79164333070";
export const WHATSAPP_LINK = "https://wa.me/79164333070";
export const TELEGRAM_BOT_USERNAME = "@biocube_zabota_bot";
export const TELEGRAM_LINK = "https://t.me/biocube_zabota_bot";
export const CONTACT_EMAIL = "info@bio-cube.ru";
export const CONTACT_ADDRESS = "Москва";
export const LEGAL_NAME = "ИП Нелюбов Денис Евгеньевич";
export const LEGAL_INN = "774330502176";
export const LEGAL_OGRNIP = "318774600189566";
```

### Интеграции

**Текущие**:
- ✅ Netlify Functions → Albato Webhook → CRM
- ✅ Google Tag Manager (GTM) для аналитики
- ⚠️ Supabase (настроен, но не используется)

**Планируемые для маркетплейса**:
- CRM интеграции (AmoCRM, Битрикс24)
- Email сервисы (SendGrid, Mailgun)
- SMS (Twilio, Sms.ru)
- Платежи (Stripe, ЮKassa)
- Analytics (Google Analytics, Яндекс.Метрика)

---

## Стили и дизайн-система

### Цветовая схема (src/index.css)

**Темная тема (Bio-Cube Dark Theme)**:
- Background: `hsl(220 20% 6%)` - очень темный синий
- Foreground: `hsl(40 20% 95%)` - светло-бежевый
- Primary (Bio Green): `hsl(145 60% 45%)` - зеленый
- Accent (Amber): `hsl(38 90% 55%)` - янтарный

**CSS переменные**:
```css
--background: 220 20% 6%;
--foreground: 40 20% 95%;
--bio-green: 145 60% 45%;
--bio-green-light: 145 55% 60%;
--amber: 38 90% 55%;
--amber-light: 38 85% 65%;
```

### Дизайн-система "Glass OS"

**Характеристики**:
- Glassmorphism эффекты (`backdrop-blur-xl`)
- Градиентные фоны
- Свечение (glow effects)
- Каустика (caustic) - световые эффекты через воду
- Плавные анимации

**Ключевые классы**:
- `.glass` - стеклянный эффект
- `.card-premium` - премиум карточка с hover эффектом
- `.text-gradient-bio` - градиентный текст
- `.glow-bio` - свечение зеленым
- `.animate-caustics` - анимация каустики

### Анимации

**Кастомные keyframes**:
- `float` - плавание
- `swim` - движение рыбки
- `caustics-rays` - световые лучи
- `pulse-glow` - пульсирующее свечение
- `fade-up` - появление снизу
- `shimmer` - мерцание

---

## Переменные окружения

### env.example

```bash
## CRM webhook (server-side proxy)
## В проде задаётся в Netlify как Environment variable:
##   ALBATO_WEBHOOK_URL=...
## ВАЖНО: НЕ задавайте этот URL как VITE_* — иначе он попадёт в браузер.
ALBATO_WEBHOOK_URL=

## (опционально) Supabase — если вы используете его для других задач.
## Для формы→CRM он больше не нужен (используем Netlify Function прокси).
# VITE_SUPABASE_URL=
# VITE_SUPABASE_PUBLISHABLE_KEY=
```

**Использование**:
- `ALBATO_WEBHOOK_URL` - задается в Netlify Environment Variables (не в .env)
- `VITE_SUPABASE_URL` - для Supabase клиента (опционально)
- `VITE_SUPABASE_PUBLISHABLE_KEY` - для Supabase клиента (опционально)

---

## Планы развития

### Текущее состояние
✅ Лендинг с режимами контента  
✅ Формы с интеграцией в CRM  
✅ Glass OS дизайн-система  
✅ Адаптивная верстка  
✅ SEO оптимизация  

### Планируется превращение в маркетплейс

**Основные направления** (см. `docs/ANALYSIS-MARKETPLACE.md`):

1. **Многотенантность**
   - Система организаций (tenants)
   - Изоляция данных
   - Кастомные домены/поддомены

2. **Конструктор страниц**
   - Drag & Drop редактор
   - Система блоков
   - WYSIWYG редактор контента
   - Предпросмотр и публикация

3. **База данных**
   - Supabase PostgreSQL
   - Row Level Security
   - Миграции схемы

4. **Аутентификация**
   - Supabase Auth
   - Роли и права доступа
   - Управление пользователями

5. **API слой**
   - Supabase Edge Functions
   - REST API для CRUD операций
   - Валидация и безопасность

6. **Админ-панель**
   - Dashboard для управления
   - Редактор страниц
   - Аналитика
   - Настройки организации

7. **Интеграции**
   - Расширенная система интеграций
   - Webhooks
   - Платежи
   - Email/SMS

### План миграции (4 фазы)

**Фаза 1: Фундамент** (2-3 недели)
- Настройка Supabase
- Создание схемы БД
- Аутентификация
- Базовая админ-панель
- Система организаций

**Фаза 2: Конструктор** (3-4 недели)
- Система блоков
- Drag & Drop редактор
- Редактор контента
- Предпросмотр
- Публикация

**Фаза 3: Интеграции** (2-3 недели)
- Динамические формы
- Интеграции с CRM
- Загрузка медиа
- Webhooks

**Фаза 4: Полировка** (2-3 недели)
- Шаблоны и темы
- Аналитика
- Оптимизация
- Документация

---

## Документация проекта

### Существующая документация

1. **ARCHITECTURE.md** - архитектура текущего проекта
2. **CONTENT.md** - где и как менять контент
3. **FORMS.md** - формы → CRM + дебаг
4. **DEPLOY.md** - деплой на Netlify
5. **RUNBOOK.md** - что делать если что-то сломалось
6. **ANALYSIS-MARKETPLACE.md** - анализ для превращения в маркетплейс
7. **ARCHITECTURE-MARKETPLACE.md** - архитектура маркетплейса

### Ключевые файлы для понимания

**Архитектура**:
- `src/App.tsx` - структура приложения
- `src/pages/Index.tsx` - главная страница
- `src/contexts/ServiceModeContext.tsx` - система режимов

**Формы**:
- `src/lib/submitLead.ts` - отправка заявок
- `src/components/ContactFormDialog.tsx` - форма
- `netlify/functions/lead-webhook.js` - backend обработка

**Стили**:
- `src/index.css` - глобальные стили и дизайн-система
- `tailwind.config.ts` - конфигурация Tailwind

**Конфигурация**:
- `vite.config.ts` - настройки сборки
- `package.json` - зависимости
- `netlify.toml` - настройки деплоя

---

## Особенности реализации

### Code Splitting

Vite настроен на ручное разделение чанков:
- `react` - React и React DOM
- `router` - React Router
- `supabase` - Supabase клиент
- `radix` - все Radix UI компоненты
- `tanstack` - React Query
- `icons` - Lucide React
- `charts` - Recharts

### Производительность

- Lazy loading компонентов (где возможно)
- Оптимизация изображений
- Code splitting
- Минификация и сжатие

### Безопасность

- Honeypot защита от ботов
- Rate limiting (60 секунд между отправками)
- Валидация на клиенте и сервере
- CORS настройки
- Секреты в Netlify (не в клиенте)

### SEO

- Мета-теги
- Структурированные данные (где нужно)
- Sitemap (robots.txt)
- Оптимизация изображений

---

## Команды разработки

```bash
# Запуск dev-сервера
npm run dev
# Откроется на http://localhost:8080

# Production сборка
npm run build

# Просмотр production сборки
npm run preview

# Линтинг
npm run lint
```

---

## Контакты и юридическая информация

**Контактные данные** (из `src/lib/contact.ts`):
- Телефон: +7 (967) 133-07-73
- WhatsApp: +7 (916) 433-30-70
- Telegram: @biocube_zabota_bot
- Email: info@bio-cube.ru
- Адрес: Москва

**Юридическая информация**:
- Название: ИП Нелюбов Денис Евгеньевич
- ИНН: 774330502176
- ОГРНИП: 318774600189566

---

## Заключение

Проект представляет собой современный лендинг на React + TypeScript с:
- Модульной архитектурой
- Системой режимов контента
- Интеграцией с CRM
- Glass OS дизайн-системой
- Готовностью к масштабированию

**Следующий шаг**: Превращение в платформу-конструктор/маркетплейс с многотенантностью, конструктором страниц и расширенными интеграциями.

**Все детали плана миграции**: см. `docs/ANALYSIS-MARKETPLACE.md` и `docs/ARCHITECTURE-MARKETPLACE.md`

---

**Дата создания документа**: 2025-01-XX  
**Версия проекта**: 0.0.0 (лендинг)  
**Цель**: Полная информация для анализа в Gemini AI

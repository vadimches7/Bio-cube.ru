# Деплой на Beget через GitHub Actions

## Что было сделано
- Создан workflow `.github/workflows/deploy.yml`
- Добавлен `.htaccess` для SPA-роутинга
- При каждом push в `main` GitHub автоматически соберёт и задеплоит проект на Beget

## Настройка (одноразово)

### 1) Добавить GitHub Secrets
Репозиторий GitHub → **Settings → Secrets and variables → Actions → New repository secret**

Создайте 3 секрета:

| Имя | Значение | Где взять |
|-----|----------|-----------|
| `FTP_USERNAME` | логин FTP | Beget → Сайты → bio-cube.ru → FTP |
| `FTP_PASSWORD` | пароль FTP | Beget → Сайты → bio-cube.ru → FTP |
| (опционально) `FTP_SERVER` | `fishing5.beget.tech` | если нужно сменить сервер |

### 2) Проверить путь деплоя
В файле `.github/workflows/deploy.yml` указан путь:
```
server-dir: /bio-cube.ru/public_html/
```

Если в Beget у вас другой путь (например просто `/public_html/`), исправьте эту строку.

### 3) Настроить DNS (переключение на Beget)

#### Узнать IP Beget
Beget → Сайты → bio-cube.ru → IP-адрес (запишите)

#### Изменить DNS в Beget
Откройте DNS-зону `bio-cube.ru`:

**Удалить/заменить:**
- `@` A `75.2.60.5` (это Netlify) → **заменить на IP Beget**
- `www` CNAME `bio-cube-ru.netlify.app` → **заменить на CNAME `bio-cube.ru`**

**Итого должно быть:**
- `@ (bio-cube.ru)` → A `[IP_BEGET]`
- `www.bio-cube.ru` → CNAME `bio-cube.ru` (или A на тот же IP)
- `blog.bio-cube.ru` → оставить как есть (A `87.236.16.15`)

### 4) SSL/HTTPS
Beget → Сайты → bio-cube.ru → SSL:
- Включите **Let's Encrypt** (бесплатный сертификат)
- Подождите 5-15 минут пока применится

### 5) Первый деплой
После настройки Secrets:

```bash
git add .
git commit -m "Add Beget deploy workflow"
git push origin main
```

GitHub Actions автоматически:
1. Установит зависимости
2. Соберёт проект (`npm run build`)
3. Загрузит `dist/` на Beget по FTP

Следите за прогрессом: GitHub → Actions → Deploy to Beget

### 6) Проверка
После деплоя откройте (без VPN):
- `https://bio-cube.ru/`
- `https://bio-cube.ru/marketplace`
- `https://bio-cube.ru/health.txt`

Если открывается — всё готово!

## Масштабируемость
- **Фронт:** на Beget (статика)
- **API/База:** Supabase или отдельный backend
- **При росте:** можно добавить CDN или переехать на VPS без изменения архитектуры

## Troubleshooting

### Ошибка 404 на /marketplace
Проверьте `.htaccess` в `public_html` — должен быть файл с правилами SPA-rewrite.

### FTP Deploy fails
Проверьте:
- Secrets правильно введены (без пробелов)
- Путь `server-dir` совпадает с реальным в Beget
- У FTP-пользователя есть права на запись

### Сайт показывает старую версию
- Очистите кэш браузера
- Проверьте, что DNS переключился (может занять до 24ч, но обычно 5-60 мин)

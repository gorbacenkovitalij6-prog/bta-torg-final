# 🚗 БТА Торг - Премиум автомобили из Германии

[![Next.js](https://img.shields.io/badge/Next.js-15.3.7-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Современный веб-каталог премиум автомобилей из Германии с полнофункциональной админ-панелью и множественной загрузкой изображений.

## ✨ Основные возможности

- 📸 **Множественная загрузка фотографий** - добавляйте несколько фото для каждого автомобиля
- 🖼️ **Галерея изображений** - навигация по фото с плавными переходами
- 🔍 **Умный поиск и фильтры** - по марке, цене, году выпуска
- 🔐 **Админ-панель** - управление объявлениями с аутентификацией
- 📊 **Статистика просмотров** - Dashboard с аналитикой популярности объявлений
- 🎨 **Современный дизайн** - адаптивная верстка с анимациями
- ⚡ **Высокая производительность** - Next.js 15 с Turbopack
- 🗄️ **Supabase Backend** - база данных + хранилище файлов

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
bun install
```

### 2. Настройка Supabase

**Следуйте подробной инструкции:** [`.same/quick-start.md`](.same/quick-start.md)

Краткая версия:
1. Создайте таблицу `cars` (SQL в `.same/setup-database.sql`)
2. Создайте Storage bucket `car-images`
3. Создайте администратора в Authentication
4. Скопируйте ключи в `.env`

### 3. Запуск dev сервера

```bash
bun run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
brabus-clone/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Главная страница
│   │   ├── catalog/
│   │   │   └── page.tsx          # Каталог с формой и фильтрами
│   │   ├── admin/
│   │   │   └── page.tsx          # Админ-панель
│   │   └── api/
│   │       ├── cars/route.ts     # CRUD для автомобилей
│   │       └── upload/route.ts   # Загрузка файлов
│   ├── components/               # React компоненты
│   └── lib/
│       ├── supabaseClient.ts     # Клиент для браузера
│       └── supabaseAdmin.ts      # Клиент для сервера
├── .same/                        # Документация и инструкции
│   ├── quick-start.md           # Быстрый старт
│   ├── current-status.md        # Текущий статус
│   ├── supabase-setup.md        # Подробная настройка Supabase
│   └── setup-database.sql       # SQL для создания таблиц
└── public/                       # Статические файлы
```

## 🛠️ Технологии

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase (PostgreSQL + Storage)
- **Authentication:** Supabase Auth
- **Package Manager:** Bun
- **Deployment:** Netlify-ready

## 📚 Документация

- [**Быстрый старт**](.same/quick-start.md) - Пошаговая инструкция для начала работы
- [**Текущий статус**](.same/current-status.md) - Что работает и что в планах
- [**Настройка Supabase**](.same/supabase-setup.md) - Подробная настройка БД и хранилища
- [**Задачи**](.same/todos.md) - Выполненные и запланированные функции

## 🎯 Основные страницы

- `/` - Главная страница с премиум дизайном
- `/catalog` - Каталог автомобилей с фильтрами и поиском
- `/admin` - Админ-панель (требует аутентификацию)
- `/about` - О компании
- `/team` - Команда
- `/reviews` - Отзывы клиентов
- `/faq` - Часто задаваемые вопросы

## 🔐 Админ-панель

Доступ: [http://localhost:3000/admin](http://localhost:3000/admin)

**Функции:**
- 📊 **Dashboard с аналитикой** - статистика по всем объявлениям
- 👁️ **Счетчики просмотров** - отслеживание популярности
- ✏️ **Редактирование объявлений** - изменение всех полей и фото
- 🗑️ **Удаление объявлений** - с подтверждением
- 🔐 **Безопасный вход** - через Supabase Auth

**Dashboard показывает:**
- Всего объявлений
- Всего просмотров (сумма по всем авто)
- Самое популярное объявление
- Средний показатель просмотров

**Создание администратора:**
1. Supabase Dashboard → Authentication → Users
2. Add user → Create new user
3. Введите email и пароль
4. ✅ Auto Confirm User

**Или используйте скрипт:**
```bash
bun run create-admin.js
```

## 📸 Загрузка фотографий

Реализована серверная загрузка через `/api/upload`:

```typescript
// User Form → Server API → Supabase Storage → Public URL
POST /api/upload
Body: FormData { file: File }
Response: { url: string, path: string }
```

**Преимущества:**
- Безопасное использование `SUPABASE_SERVICE_ROLE_KEY`
- Обход проблем CORS
- Контроль размера и типа файлов
- Детальное логирование

## 🔧 Environment Variables

Создайте `.env` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Где найти:**
Supabase Dashboard → Project Settings → API

⚠️ **ВАЖНО:** `SUPABASE_SERVICE_ROLE_KEY` должен быть в секрете!

## 🚢 Деплой

Проект настроен для деплоя на Netlify:

```bash
# Build команда
npm run build

# Publish directory
.next
```

Настройки в `netlify.toml` уже готовы.

## 🐛 Troubleshooting

### Ошибка загрузки файлов
- Проверьте `.env` файл
- Убедитесь что bucket `car-images` создан
- Проверьте консоль браузера (F12)
- Проверьте терминал dev сервера

### Не могу войти в админ-панель
- Проверьте что пользователь создан в Authentication
- Включите Auto Confirm User
- Проверьте правильность email и пароля

### Изображения не отображаются
- Проверьте `next.config.js` → remotePatterns
- Перезапустите dev сервер
- Убедитесь что bucket публичный

## 📝 Лицензия

Этот проект создан для БТА Торг - компании по продаже премиум автомобилей из Германии.

## 🤝 Поддержка

Если возникли вопросы:
1. Проверьте [Quick Start Guide](.same/quick-start.md)
2. Прочитайте [Current Status](.same/current-status.md)
3. Проверьте консоль браузера и терминал на ошибки

---

Разработано с ❤️ для БТА Торг | Версия 213

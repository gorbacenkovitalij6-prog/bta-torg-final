# 🚗 БТА ТОРГ - Финальная версия

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Версия:** v289
**Дата создания:** 11 февраля 2026
**GitHub:** https://github.com/gorbacenkovitalij6-prog/bta-torg-final

---

## 📋 О проекте

Полнофункциональный веб-сайт для компании **БТА ТОРГ**, специализирующейся на пригоне автомобилей из Германии, Польши, Бельгии и Нидерландов. Проект включает полноценную админ-панель, каталог с фильтрацией, интеграцию с Supabase для хранения данных и изображений.

---

## ✨ Основные возможности

### 🎨 Frontend
- ✅ **Адаптивный дизайн** - работает на всех устройствах (mobile, tablet, desktop)
- ✅ **Hero с видео фоном** - локальное HTML5 видео с mouse trail эффектом
- ✅ **Framer Motion анимации** - плавные переходы и эффекты
- ✅ **shadcn/ui компоненты** - современная UI библиотека
- ✅ **9 страниц** - главная, каталог, о нас, команда, отзывы, FAQ, контакты, админ-панель

### 🗂️ Каталог автомобилей
- ✅ **Фильтры** - поиск, цена, год, марка
- ✅ **Галерея изображений** - множественные фото для каждого авто
- ✅ **Пагинация** - удобная навигация
- ✅ **Детальные страницы** - полная информация + lightbox для фото
- ✅ **Счетчик просмотров** - автоматическая статистика

### 🔐 Админ-панель
- ✅ **Supabase Auth** - безопасная аутентификация
- ✅ **CRUD операции** - создание, редактирование, удаление объявлений
- ✅ **Множественная загрузка фото** - до 10 изображений на объявление
- ✅ **Статистика просмотров** - dashboard с аналитикой
- ✅ **Графики** - визуализация данных (требует SQL миграцию)

### 💾 База данных
- ✅ **Supabase PostgreSQL** - надежное хранение данных
- ✅ **Supabase Storage** - файловое хранилище для изображений
- ✅ **RLS политики** - безопасность на уровне строк
- ✅ **API endpoints** - RESTful API для всех операций

---

## 🛠️ Технологии

| Категория | Технологии |
|-----------|-----------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Язык** | TypeScript 5.0 |
| **Стилизация** | Tailwind CSS 3.x |
| **UI компоненты** | shadcn/ui |
| **Анимации** | Framer Motion |
| **Runtime** | Bun 1.0+ |
| **База данных** | Supabase (PostgreSQL) |
| **Хранилище** | Supabase Storage |
| **Аутентификация** | Supabase Auth |
| **Деплой** | Netlify (готов к деплою) |

---

## 📦 Установка

### Требования

- **Bun** >= 1.0 ([установка](https://bun.sh/))
- **Node.js** >= 18 (для совместимости)
- **Git** для клонирования репозитория

### Шаги установки

1. **Клонировать репозиторий**

```bash
git clone https://github.com/gorbacenkovitalij6-prog/bta-torg-final.git
cd bta-torg-final
```

2. **Установить зависимости**

```bash
bun install
```

3. **Настроить переменные окружения**

Создайте файл `.env` в корне проекта:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database (опционально для Prisma)
DATABASE_URL=your_database_url
```

> 📘 **Подробная инструкция:** `.same/supabase-setup.md`

4. **Выполнить SQL миграцию** (критично!)

Откройте Supabase SQL Editor и выполните:
- `.same/FINAL-MIGRATION.sql` - основная миграция

5. **Запустить dev сервер**

```bash
bun run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## 🎯 Основные команды

```bash
# Разработка
bun run dev          # Запуск dev сервера (Next.js + Turbopack)

# Продакшен
bun run build        # Сборка для production
bun run start        # Запуск production сервера

# Качество кода
bun run lint         # Линтинг
bun run format       # Форматирование (Biome)
```

---

## 📁 Структура проекта

```
bta-torg-final/
├── .same/                      # Документация и инструкции
│   ├── testing-report.md      # Отчет о тестировании
│   ├── video-fix.md           # Решение проблемы с видео
│   ├── FINAL-MIGRATION.sql    # SQL миграция
│   └── ...
├── public/
│   ├── images/                # Изображения
│   └── videos/
│       └── hero-bg.mp4       # Видео для Hero (164MB)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx          # Главная страница
│   │   ├── catalog/          # Каталог
│   │   ├── admin/            # Админ-панель
│   │   ├── team/             # Команда
│   │   ├── reviews/          # Отзывы
│   │   ├── contacts/         # Контакты
│   │   ├── faq/              # FAQ
│   │   └── api/              # API routes
│   │       ├── cars/         # CRUD автомобилей
│   │       ├── upload/       # Загрузка файлов
│   │       └── stats/        # Статистика
│   ├── components/           # React компоненты
│   │   ├── ui/              # shadcn/ui компоненты
│   │   ├── Hero.tsx         # Hero с видео
│   │   ├── Navigation.tsx   # Навигация
│   │   ├── AddCarForm.tsx   # Форма добавления авто
│   │   └── ...
│   ├── lib/                  # Утилиты
│   │   ├── supabaseClient.ts
│   │   └── supabaseAdmin.ts
│   └── types/                # TypeScript типы
├── .env.example              # Пример env файла
├── next.config.js            # Конфигурация Next.js
├── tailwind.config.ts        # Конфигурация Tailwind
└── README.md
```

---

## 🎨 Ключевые функции

### 1. Hero с видео фоном

**Локальное HTML5 video** вместо YouTube для:
- ✅ Гарантированного воспроизведения
- ✅ Быстрой загрузки (кэширование)
- ✅ Работы офлайн
- ✅ Полного контроля

**Mouse trail эффект** - интерактивные цветные частицы при движении мыши.

### 2. Каталог автомобилей

- **Фильтрация** по цене, году, марке
- **Поиск** по названию, марке, модели
- **Галерея** - множественные фото с навигацией
- **Lightbox** - полноэкранный просмотр изображений

### 3. Админ-панель

**URL:** `/admin`

**Функции:**
- Вход через email/password (Supabase Auth)
- Создание объявлений с множественными фото
- Редактирование существующих объявлений
- Удаление объявлений
- Dashboard со статистикой просмотров

### 4. Отзывы

- **17 видеоотзывов** с Rutube
- **30 фотоотзывов** с каруселью
- **Обновленные имена** (включая женские)

---

## 🔧 Настройка Supabase

### 1. Создайте проект в Supabase

Перейдите на [supabase.com](https://supabase.com) и создайте новый проект.

### 2. Выполните SQL миграцию

Откройте **SQL Editor** и выполните файл `.same/FINAL-MIGRATION.sql`

Это создаст:
- ✅ Таблицу `cars` с полями: title, images, price, brand, model, year, mileage, transmission, engine, fuel_type, color, description, views
- ✅ Таблицу `daily_views` для статистики
- ✅ Функции: `increment_car_views`, `get_daily_stats`, `get_car_daily_stats`
- ✅ RLS политики для безопасности

### 3. Настройте Storage

1. Создайте bucket **"car-images"**
2. Сделайте его публичным
3. Настройте RLS политики (см. `.same/supabase-setup.md`)

### 4. Создайте пользователя

В **Authentication** → **Users** → **Add User**

---

## 🚀 Деплой

### Netlify (рекомендуется)

1. **Подключите репозиторий к Netlify**

2. **Настройте переменные окружения:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Deploy!** - автоматически через `netlify.toml`

### Vercel

```bash
vercel --prod
```

---

## 📊 Статистика проекта

- **Версий:** 289
- **Коммитов:** 3
- **Файлов:** 115+
- **Строк кода:** 12,885+
- **Страниц:** 9
- **API endpoints:** 5
- **Отзывов:** 17 (текст) + 17 (видео) + 30 (фото)
- **Менеджеров:** 11
- **Готовность:** 85%

---

## 🐛 Известные проблемы и решения

### 1. ⚠️ Требуется SQL миграция

**Проблема:** Статистика просмотров не работает
**Решение:** Выполните `.same/FINAL-MIGRATION.sql` в Supabase SQL Editor

### 2. ⚠️ Некоторые Rutube thumbnails не загружаются

**Проблема:** CORS policy блокирует thumbnails
**Решение:** Используйте fallback изображения (опционально)

### 3. ℹ️ Видео 164MB

**Информация:** Hero видео занимает 164MB
**Оптимизация:** Сожмите до 40-60MB для production (см. `.same/video-fix.md`)

---

## 📚 Документация

Подробная документация в папке `.same/`:

- **`START-HERE.md`** - быстрый старт
- **`testing-report.md`** - отчет о тестировании всех страниц
- **`video-fix.md`** - решение проблемы с видео Hero
- **`supabase-setup.md`** - настройка Supabase
- **`FINAL-MIGRATION.sql`** - SQL миграция для БД
- **`quick-start.md`** - быстрое начало работы
- **`todos.md`** - список задач и изменений

---

## 🔐 Безопасность

- ✅ Environment variables в `.env` (не в git)
- ✅ RLS политики в Supabase
- ✅ Supabase Auth для админ-панели
- ✅ Валидация данных на клиенте и сервере
- ✅ Защищенные API endpoints

---

## 🤝 Создано с помощью

Проект создан с помощью [Same](https://same.new) - AI coding assistant.

---

## 📄 Лицензия

MIT License - свободное использование для коммерческих и некоммерческих целей.

---

## 🔗 Ссылки

- **GitHub:** https://github.com/gorbacenkovitalij6-prog/bta-torg-final
- **Документация Next.js:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com

---

## ✅ Чек-лист перед запуском

- [ ] Клонирован репозиторий
- [ ] Установлен Bun
- [ ] Установлены зависимости (`bun install`)
- [ ] Создан проект в Supabase
- [ ] Выполнена SQL миграция (`.same/FINAL-MIGRATION.sql`)
- [ ] Создан bucket "car-images" в Supabase Storage
- [ ] Настроены RLS политики
- [ ] Создан файл `.env` с ключами
- [ ] Создан пользователь в Supabase Auth
- [ ] Запущен dev сервер (`bun run dev`)
- [ ] Протестирована админ-панель
- [ ] Проверена загрузка фото

---

**🎉 Готово к использованию!**

Если возникнут вопросы, смотрите документацию в `.same/` или создайте Issue на GitHub.

---

**Версия:** v289
**Последнее обновление:** 11 февраля 2026
**Создано с ❤️ с помощью [Same](https://same.new)**

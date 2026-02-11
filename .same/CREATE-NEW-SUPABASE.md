# 🆕 Создание нового проекта Supabase (5 минут)

## Шаг 1: Создайте проект

1. **Откройте:** https://app.supabase.com
2. **Войдите** в свой аккаунт (или зарегистрируйтесь)
3. **Нажмите:** "New Project"
4. **Заполните:**
   - **Organization:** выберите вашу организацию
   - **Name:** `bta-torg-auto` (или любое другое имя)
   - **Database Password:** придумайте надежный пароль (сохраните его!)
   - **Region:** выберите ближайший регион (например, Europe (Frankfurt))
   - **Pricing Plan:** Free
5. **Нажмите:** "Create new project"
6. **Подождите 2-3 минуты** пока проект создается

---

## Шаг 2: Скопируйте ключи API

После создания проекта:

1. **Откройте:** Project Settings (шестеренка слева внизу)
2. **Перейдите:** API
3. **Скопируйте:**

### Project URL
```
https://xxxxxxxxxx.supabase.co
```

### API Keys

**anon / public:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role (секретный!):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **ВАЖНО:** `service_role` ключ держите в секрете! Не публикуйте в GitHub!

---

## Шаг 3: Обновите .env файл

Откройте `brabus-clone/.env` и замените:

```env
NEXT_PUBLIC_SUPABASE_URL="https://ВАША-PROJECT-URL.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ВАШ-ANON-KEY"
SUPABASE_SERVICE_ROLE_KEY="ВАШ-SERVICE-ROLE-KEY"
```

**Пример:**
```env
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijk.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2MzQzNTYsImV4cCI6MjAyMzIxMDM1Nn0..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzYzNDM1NiwiZXhwIjoyMDIzMjEwMzU2fQ..."
```

---

## Шаг 4: Создайте таблицу `cars`

1. **Откройте:** SQL Editor (в левом меню)
2. **Создайте новый запрос:** New query
3. **Скопируйте весь SQL из файла:** `brabus-clone/.same/setup-database.sql`
4. **Вставьте в редактор** и нажмите **Run** (или Ctrl+Enter)
5. **Должно появиться:** `Success. No rows returned`

**Проверка:**
- Table Editor → должна появиться таблица `cars`
- Столбцы: id, title, subtitle, images (JSONB), price, brand, model, year, mileage, description, createdAt

---

## Шаг 5: Создайте Storage bucket

1. **Откройте:** Storage (в левом меню)
2. **Нажмите:** Create bucket
3. **Заполните:**
   - **Name:** `car-images`
   - **Public bucket:** ✅ **Включить!**
   - **File size limit:** 10 MB (или больше)
   - **Allowed MIME types:** оставьте пустым (или `image/*`)
4. **Нажмите:** Create bucket

**Проверка:**
- В списке buckets должен появиться `car-images` с меткой Public

---

## Шаг 6: Создайте Storage политики

1. **Откройте:** Storage → `car-images` → Policies
2. **Если политик нет, создайте их:**

### В SQL Editor выполните:

```sql
-- Политика 1: Публичное чтение изображений
CREATE POLICY "Публичное чтение изображений"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Политика 2: Разрешить загрузку изображений
CREATE POLICY "Разрешить загрузку изображений"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'car-images');
```

**Проверка:**
- Storage → car-images → Policies
- Должно быть минимум 2 политики (SELECT и INSERT)

---

## Шаг 7: Создайте администратора (опционально)

Для доступа к админ-панели `/admin`:

1. **Откройте:** Authentication → Users
2. **Нажмите:** Add user → Create new user
3. **Заполните:**
   - **Email:** ваш email (например, `admin@btatorg.ru`)
   - **Password:** надежный пароль
   - **Auto Confirm User:** ✅ **Включить!**
4. **Нажмите:** Create user

**Сохраните credentials:**
- Email: __________________
- Password: __________________

---

## Шаг 8: Тестирование

### Перезапустите dev сервер:

```bash
# В терминале нажмите Ctrl+C
cd brabus-clone
bun run dev
```

### Запустите тестовый скрипт:

```bash
bun run test-supabase.js
```

**Ожидаемый результат:**
```
=== ПРОВЕРКА SUPABASE ===

1. Environment variables:
   NEXT_PUBLIC_SUPABASE_URL: ✅ Установлен
   SUPABASE_SERVICE_ROLE_KEY: ✅ Установлен

2. Создание клиента Supabase...
   ✅ Клиент создан

3. Проверка bucket "car-images"...
   Найдено buckets: 1
   - car-images (Public)
   ✅ Bucket "car-images" найден (Public)

4. Проверка таблицы "cars"...
   ✅ Таблица "cars" найдена
   Записей в таблице: 0

5. Тест загрузки файла...
   ✅ Тестовый файл загружен: test-12345.txt
   ✅ Тестовый файл удален

✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!
```

### Тестируйте загрузку:

1. **Откройте:** http://localhost:3000/catalog
2. **Обновите страницу:** `Ctrl+Shift+R`
3. **Заполните форму** и **добавьте фото**
4. **Проверьте:**
   - Должно появиться: ✅ Объявление добавлено!
   - Карточка с фото появляется ниже
   - В Supabase Storage должны появиться загруженные файлы

---

## ✅ Готово!

Теперь у вас:
- ✅ Новый проект Supabase
- ✅ Таблица `cars` создана
- ✅ Bucket `car-images` настроен
- ✅ Политики Storage установлены
- ✅ Администратор создан
- ✅ Загрузка фотографий работает!

---

## 🐛 Если что-то не работает

### Ошибка подключения

```
Unable to connect. Is the computer able to access the url?
```

**Решение:**
- Проверьте, что URL в `.env` правильный
- Проверьте, что проект Supabase активен (не paused)
- Попробуйте создать новый проект

### Ошибка bucket not found

```
Bucket not found
```

**Решение:**
- Создайте bucket `car-images` в Storage
- Установите Public = ON

### Ошибка policy violation

```
new row violates row-level security policy
```

**Решение:**
- Создайте политики Storage (см. Шаг 6)
- Проверьте, что политика INSERT существует

---

## 📚 Полезные ссылки

- Supabase Dashboard: https://app.supabase.com
- Документация Supabase: https://supabase.com/docs
- Storage Documentation: https://supabase.com/docs/guides/storage
- SQL Editor: https://app.supabase.com/project/_/sql

---

**Удачи!** 🚀

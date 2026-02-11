# ✅ Проверочный список перед тестированием

## Быстрая проверка готовности

Выполните эти шаги, чтобы убедиться, что всё готово к тестированию загрузки фотографий.

---

## 1. Dev сервер запущен

**Статус:** ✅ Запущен

**URL для тестирования:**
- Каталог: http://localhost:3000/catalog
- Админ-панель: http://localhost:3000/admin

---

## 2. Environment Variables настроены

**Статус:** ✅ Настроены

**Файл:** `brabus-clone/.env`

```env
✅ NEXT_PUBLIC_SUPABASE_URL=https://dybmmygpbyaawiweidu.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
✅ SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

## 3. Supabase Dashboard настроен

### 3.1 Таблица `cars` создана

**Как проверить:**

1. Откройте: https://app.supabase.com/project/dybmmygpbyaawiweidu/editor
2. В списке таблиц слева должна быть таблица **`cars`**
3. Таблица должна содержать столбцы:
   - `id` (BIGSERIAL, PRIMARY KEY)
   - `title` (TEXT, NOT NULL)
   - `subtitle` (TEXT)
   - `images` (JSONB) ← **Обязательно для множественной загрузки!**
   - `price` (NUMERIC)
   - `brand` (TEXT)
   - `model` (TEXT)
   - `year` (INTEGER)
   - `mileage` (INTEGER)
   - `description` (TEXT)
   - `createdAt` (TIMESTAMP WITH TIME ZONE)

**Если таблицы нет:**

1. **SQL Editor** (левое меню)
2. **New query**
3. Скопируйте весь SQL из `brabus-clone/.same/setup-database.sql`
4. Нажмите **Run** (или `Ctrl+Enter`)
5. Должно появиться: `Success. No rows returned`

---

### 3.2 Storage bucket `car-images` создан

**Как проверить:**

1. Откройте: https://app.supabase.com/project/dybmmygpbyaawiweidu/storage/buckets
2. В списке бакетов должен быть **`car-images`**
3. **Public:** должно быть **ON** (✅ зеленая галочка)

**Если бакета нет:**

1. **Storage** → **Create bucket**
2. **Name:** `car-images`
3. **Public bucket:** ✅ **Включить!**
4. **Create**

---

### 3.3 Storage политики настроены

**Как проверить:**

1. **Storage** → `car-images` → **Policies**
2. Должно быть минимум 2 политики:
   - `Публичное чтение изображений` (SELECT)
   - `Разрешить загрузку изображений` (INSERT)

**Если политик нет:**

В **SQL Editor** выполните:

```sql
-- Политика 1: Публичное чтение
CREATE POLICY "Публичное чтение изображений"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Политика 2: Разрешить загрузку
CREATE POLICY "Разрешить загрузку изображений"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'car-images');
```

---

### 3.4 Администратор создан (для админ-панели)

**Как проверить:**

1. Откройте: https://app.supabase.com/project/dybmmygpbyaawiweidu/auth/users
2. В списке должен быть минимум 1 пользователь

**Если пользователя нет:**

1. **Authentication** → **Users** → **Add user**
2. **Create new user**
3. Заполните:
   - **Email:** ваш email (например, `admin@btatorg.ru`)
   - **Password:** придумайте надежный пароль (мин. 6 символов)
   - **Auto Confirm User:** ✅ **Обязательно включить!**
4. **Create user**

**Сохраните credentials:**
- Email: _________________
- Password: _________________

---

## 4. Тестовые изображения готовы

### Вариант A: Скачайте с Unsplash (рекомендуется)

Сохраните эти изображения на компьютер:

1. **BMW X5:** https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800
   - Правый клик → Сохранить как... → `bmw-1.jpg`

2. **BMW X5 Interior:** https://images.unsplash.com/photo-1542362567-b07e54358753?w=800
   - Сохранить как... → `bmw-2.jpg`

3. **BMW X5 Side:** https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800
   - Сохранить как... → `bmw-3.jpg`

### Вариант B: Используйте свои фото

Подготовьте 2-3 фотографии автомобилей в форматах:
- JPG, JPEG
- PNG
- WebP

**Требования:**
- Размер: до 5 МБ каждая
- Разрешение: от 800x600 до 4000x3000 пикселей

---

## 5. Консоль браузера открыта

**Перед тестированием:**

1. Откройте http://localhost:3000/catalog
2. Нажмите `F12` (или `Ctrl+Shift+I` / `Cmd+Option+I`)
3. Перейдите на вкладку **Console**
4. Очистите консоль (иконка 🚫 или `Ctrl+L`)

**Зачем это нужно:**
- Видеть логи загрузки в реальном времени
- Отслеживать ошибки (если они возникнут)
- Проверять успешность каждого шага

---

## 6. Терминал с dev сервером виден

**Убедитесь, что видите терминал где запущен:**
```bash
bun run dev
```

**Зачем это нужно:**
- Видеть серверные логи загрузки
- Отслеживать запросы к `/api/upload`
- Проверять, что файлы успешно загружаются в Supabase

---

## ✅ Итоговая проверка

Отметьте выполненные пункты:

- [ ] Dev сервер запущен на http://localhost:3000
- [ ] `.env` файл содержит все ключи Supabase
- [ ] Таблица `cars` создана в Supabase (проверено в Table Editor)
- [ ] Bucket `car-images` создан и **Public** (проверено в Storage)
- [ ] Storage политики настроены (минимум 2: SELECT и INSERT)
- [ ] Администратор создан (для последующего тестирования админ-панели)
- [ ] Тестовые изображения скачаны и сохранены
- [ ] Консоль браузера открыта (F12)
- [ ] Терминал dev сервера виден

**Если все пункты отмечены:**

🎉 **ВСЁ ГОТОВО К ТЕСТИРОВАНИЮ!**

Переходите к файлу **`.same/testing-guide.md`** для пошаговой инструкции.

---

## 🆘 Нужна помощь?

Если что-то не понятно или не работает:

1. **Документация:**
   - Полная инструкция: `.same/quick-start.md`
   - SQL для БД: `.same/setup-database.sql`
   - Детальная настройка: `.same/supabase-setup.md`

2. **Проверьте логи:**
   - Консоль браузера (F12)
   - Терминал dev сервера

3. **Типичные проблемы:**
   - Bucket не публичный → Storage → car-images → Settings → Public ON
   - Политики не созданы → SQL Editor → выполните CREATE POLICY
   - Таблица без столбца `images` → SQL Editor → выполните весь `.same/setup-database.sql`

---

**Готовы начать?** → Откройте `.same/testing-guide.md` 🚀

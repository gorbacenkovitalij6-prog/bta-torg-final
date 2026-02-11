# Настройка Supabase для БТА Торг

## 1. Создание таблицы `cars`

В Supabase Dashboard → SQL Editor выполните следующий SQL:

```sql
-- Создание таблицы cars
CREATE TABLE IF NOT EXISTS cars (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  images JSONB DEFAULT '[]'::jsonb, -- Массив URL изображений
  price NUMERIC,
  brand TEXT,
  model TEXT,
  year INTEGER,
  mileage INTEGER,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_cars_brand ON cars(brand);
CREATE INDEX idx_cars_year ON cars(year);
CREATE INDEX idx_cars_price ON cars(price);

-- RLS (Row Level Security) политики
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Разрешить всем читать объявления
CREATE POLICY "Публичное чтение объявлений"
  ON cars FOR SELECT
  USING (true);

-- Разрешить только аутентифицированным пользователям добавлять/изменять/удалять
CREATE POLICY "Только авторизованные могут вставлять"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Только авторизованные могут обновлять"
  ON cars FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Только авторизованные могут удалять"
  ON cars FOR DELETE
  TO authenticated
  USING (true);
```

**Примечание:** Если у вас уже есть таблица `cars` со столбцом `image` (TEXT), выполните миграцию:

```sql
-- Миграция с одного изображения на массив
ALTER TABLE cars ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Конвертируем старые данные
UPDATE cars
SET images = jsonb_build_array(image)
WHERE image IS NOT NULL AND images = '[]'::jsonb;

-- После проверки можно удалить старый столбец
-- ALTER TABLE cars DROP COLUMN image;
```

## 2. Настройка Storage для изображений

### Создание бакета `car-images`

1. Перейдите в Supabase Dashboard → Storage
2. Создайте новый bucket с именем `car-images`
3. Установите настройки:
   - **Public bucket**: ✅ Включено (для публичного доступа к изображениям)
   - **File size limit**: 5 MB (или больше по желанию)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`

### Политики Storage

В разделе Storage → Policies для бакета `car-images`:

```sql
-- Разрешить всем читать изображения
CREATE POLICY "Публичное чтение изображений"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Разрешить всем (включая анонимов) загружать изображения
CREATE POLICY "Разрешить загрузку изображений"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'car-images');

-- ⚠️ ВАЖНО: Для production рекомендуется ограничить INSERT только для аутентифицированных:
-- TO authenticated
```

**Для production:** Рекомендуется изменить политику INSERT, чтобы только авторизованные пользователи могли загружать:

```sql
-- Заменить политику на более безопасную
DROP POLICY IF EXISTS "Разрешить загрузку изображений" ON storage.objects;

CREATE POLICY "Только авторизованные могут загружать"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'car-images');
```

## 3. Настройка Authentication

### Создание первого администратора

1. Перейдите в Supabase Dashboard → Authentication → Users
2. Нажмите "Add user" → "Create new user"
3. Заполните:
   - **Email**: ваш email (например, `admin@btatorg.ru`)
   - **Password**: надежный пароль
   - **Auto Confirm User**: ✅ (чтобы не требовалось подтверждение email)

### Настройка Email Provider (опционально)

Если хотите использовать email-подтверждение и сброс пароля:

1. Перейдите в Authentication → Settings → Auth Providers
2. Настройте SMTP или используйте встроенный Supabase email (лимит 30 писем/час на бесплатном плане)

### Отключение регистрации (для безопасности)

Чтобы запретить публичную регистрацию:

1. Authentication → Settings → Auth Providers
2. **Enable email signups**: ❌ Отключить

Теперь только администраторы смогут создавать новых пользователей через Dashboard.

## 4. Environment Variables

Обновите `.env` в корне проекта:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database (для Prisma - опционально, не используется с Supabase)
DATABASE_URL="file:./prisma/dev.db"
```

**Где найти ключи:**
- Project Settings → API → Project URL
- Project Settings → API → `anon` `public` (для NEXT_PUBLIC_SUPABASE_ANON_KEY)
- Project Settings → API → `service_role` `secret` (для SUPABASE_SERVICE_ROLE_KEY)

⚠️ **ВАЖНО:** `service_role` ключ должен храниться в секрете и использоваться только на сервере!

## 5. Проверка настроек

### Тест 1: Загрузка изображения

```bash
# В консоли браузера на странице /catalog
const supabase = getSupabaseClient()
const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
const { data, error } = await supabase.storage.from('car-images').upload('test-123.jpg', file)
console.log(data, error)
```

### Тест 2: Создание объявления (через API)

```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Тестовый автомобиль",
    "images": ["https://example.com/image.jpg"],
    "price": 1000000,
    "brand": "BMW",
    "year": 2020
  }'
```

### Тест 3: Вход в админ-панель

1. Откройте http://localhost:3000/admin
2. Введите email и пароль администратора
3. Проверьте, что отображается список объявлений

## 6. Типичные проблемы

### "Upload error" при загрузке изображений
- Проверьте, что бакет `car-images` существует и публичный
- Проверьте политики Storage (должна быть разрешена INSERT)
- Проверьте размер файла (не превышает лимит бакета)

### "Failed to create car" при добавлении объявления
- Проверьте, что таблица `cars` создана
- Проверьте, что `SUPABASE_SERVICE_ROLE_KEY` установлен в `.env`
- Проверьте RLS политики для таблицы `cars`

### Не удается войти в админ-панель
- Проверьте, что пользователь создан в Authentication → Users
- Проверьте, что пользователь подтвержден (Auto Confirm включен)
- Проверьте правильность email и пароля

### Ошибка "relation cars does not exist"
- Выполните SQL для создания таблицы (см. раздел 1)
- Проверьте, что подключены к правильному проекту Supabase

## 7. Production Checklist

Перед деплоем в production:

- [ ] Создана таблица `cars` с RLS политиками
- [ ] Создан бакет `car-images` с правильными политиками
- [ ] Создан администратор в Authentication
- [ ] Отключена публичная регистрация (Enable email signups = false)
- [ ] Environment variables установлены в Netlify/Vercel
- [ ] Изменена политика Storage INSERT на `TO authenticated`
- [ ] Настроен SMTP для отправки писем (опционально)
- [ ] Протестирована загрузка изображений и создание объявлений
- [ ] Протестирован вход в админ-панель

## 8. Полезные ссылки

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
- [Authentication](https://supabase.com/docs/guides/auth)

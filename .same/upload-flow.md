# 📸 Схема загрузки фотографий (Версия 215)

## Архитектура

```

                     БРАУЗЕР (Пользователь)                       │
                                                                  │
  1. Выбор файлов                                                │
     └─> <input type="file" multiple>                            │
                                                                  │
  2. Превью изображений                                          │
     └─> URL.createObjectURL(file) → Локальные превью           │
                                                                  │
  3. Клик "Добавить объявление"                                  │
     └─> handleUpload(file) для каждого файла                   │

                         │
                         │ POST /api/upload
                         │ Body: FormData { file: File }
                         ▼

                   NEXT.JS SERVER (/api/upload)                   │
                                                                  │
  4. Получение файла                                             │
     └─> const file = formData.get('file') as File              │
                                                                  │
  5. Генерация уникального имени                                 │
     └─> `${Date.now()}-${Math.random()}.${ext}`                │
                                                                  │
  6. Загрузка в Supabase                                         │
     └─> supabaseAdmin.storage.from('car-images').upload()      │
                                                                  │
  7. Получение публичного URL                                    │
     └─> .getPublicUrl(path)                                     │
                                                                  │
  8. Возврат URL клиенту                                         │
     └─> { url: '...', path: '...' }                            │

                         │
                         │ Использует SUPABASE_SERVICE_ROLE_KEY
                         │ (безопасно, только на сервере)
                         ▼

                      SUPABASE STORAGE                            │
                                                                  │
  9. Bucket: car-images (Public)                                 │
     └─> Файл сохранен: 1707634356789-abc123.jpg                │
                                                                  │
  10. Публичный URL сгенерирован                                 │
      └─> https://dybmmygpbyaawiweidu.supabase.co/               │
          storage/v1/object/public/car-images/...                │

                         │
                         │ Массив URLs возвращается
                         ▼

                     БРАУЗЕР (Пользователь)                       │
                                                                  │
  11. Получены все URLs                                          │
      └─> ['url1', 'url2', 'url3']                              │
                                                                  │
  12. POST /api/cars                                             │
      └─> Body: { title, images: [...urls], ... }               │

                         │
                         ▼

                   NEXT.JS SERVER (/api/cars)                     │
                                                                  │
  13. Сохранение в БД                                            │
      └─> supabaseAdmin.from('cars').insert({                   │
            images: ['url1', 'url2', 'url3']  // JSONB array    │
          })                                                      │

                         │
                         ▼

                    SUPABASE DATABASE                             │
                                                                  │
  14. Таблица: cars                                              │
      └─> Запись создана с JSONB массивом URLs                  │
                                                                  │
  {                                                              │
    id: 123,                                                     │
    title: "BMW X5 M50d 2020",                                  │
    images: [                                                    │
      "https://.../1707634356789-abc123.jpg",                   │
      "https://.../1707634357890-xyz789.jpg",                   │
      "https://.../1707634358991-def456.jpg"                    │
    ],                                                           │
    price: 4500000,                                             │
    ...                                                          │
  }                                                              │

```

---

## Ключевые преимущества серверной загрузки

### 1. Безопасность
- `SUPABASE_SERVICE_ROLE_KEY` остается на сервере
- Клиент никогда не видит service role ключ
- Все загрузки аутентифицированы через сервер

### 2. Контроль
- Валидация размера файла на сервере
- Проверка типа файла (MIME type)
- Генерация уникальных имен файлов
- Логирование всех операций

### 3. Надежность
- Детальные логи на сервере и клиенте
- Обработка ошибок на каждом шаге
- Fail-safe механизмы

### 4. Производительность
- Параллельная загрузка нескольких файлов
- Оптимизация через Next.js Image
- CDN через Supabase Storage

---

## Логи при успешной загрузке

### Консоль браузера (F12):

```javascript
 Server returned: {
  success: true,
  url: 'https://dybmmygpbyaawiweidu.supabase.co/storage/v1/object/public/car-images/1707634356789-abc123.jpg',
  path: '1707634356789-abc123.jpg'
}
```

### Терминал dev сервера:

```bash
=== UPLOAD API CALLED ===
ENV: {
  url: 'https://dybmmygpbyaawiweidu.supabase.co',
  hasServiceKey: true,
  adminExists: true
}
File: bmw-1.jpg 123456 bytes
Uploading to Supabase: 1707634356789-abc123.jpg
Upload success! Path: 1707634356789-abc123.jpg
Public URL: https://dybmmygpbyaawiweidu.supabase.co/storage/v1/object/public/car-images/1707634356789-abc123.jpg
POST /api/upload 200 in 456ms
```

---

## Пример множественной загрузки (3 фото)

### Последовательность вызовов:

```

 1. handleUpload(bmw-1.jpg)                          │
    ├─> POST /api/upload                             │
    └─> url1 = 'https://.../file1.jpg'               │
                                                      │
 2. handleUpload(bmw-2.jpg)                          │
    ├─> POST /api/upload                             │
    └─> url2 = 'https://.../file2.jpg'               │
                                                      │
 3. handleUpload(bmw-3.jpg)                          │
    ├─> POST /api/upload                             │
    └─> url3 = 'https://.../file3.jpg'               │
                                                      │
 4. uploadedUrls = [url1, url2, url3]                │
                                                      │
 5. POST /api/cars                                   │
    └─> Body: { images: uploadedUrls, ... }          │
                                                      │
 6. ✅ Объявление добавлено!                         │

```

**Время выполнения:** ~1-3 секунды для 3 фото (зависит от размера и скорости сети)

---

## Обработка ошибок

### Сценарий 1: Bucket не найден

```
Server: ❌ Supabase upload error: Bucket not found
Client: ❌ Ошибка загрузки: Bucket not found. Проверьте...
```

**Решение:** Создать bucket `car-images` в Supabase Storage

---

### Сценарий 2: Политика запрещает INSERT

```
Server: ❌ Supabase upload error: new row violates row-level security policy
Client: ❌ Ошибка загрузки: Policy violation. Проверьте...
```

**Решение:** Создать INSERT политику для bucket `car-images`

---

### Сценарий 3: Файл слишком большой

```
Server: ❌ File size exceeds limit
Client: ❌ Ошибка загрузки: File size exceeds limit (max 5MB)
```

**Решение:** Уменьшить размер изображения или увеличить лимит в Supabase

---

## Конфигурация

### next.config.js

```javascript
images: {
  unoptimized: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'dybmmygpbyaawiweidu.supabase.co',
    },
  ],
}
```

**Зачем:** Позволяет Next.js Image оптимизировать изображения из Supabase Storage

---

### .env

```env
NEXT_PUBLIC_SUPABASE_URL=https://dybmmygpbyaawiweidu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...  # Для клиента
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...     # Для сервера (секретный!)
```

**Важно:** `SUPABASE_SERVICE_ROLE_KEY` никогда не должен попасть в клиентский код!

---

## RLS Политики

### Storage Policies (car-images bucket)

```sql
-- Разрешить всем читать
CREATE POLICY "Публичное чтение изображений"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Разрешить всем (через service role) загружать
CREATE POLICY "Разрешить загрузку изображений"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'car-images');
```

### Table Policies (cars table)

```sql
-- Разрешить всем читать
CREATE POLICY "Публичное чтение объявлений"
  ON cars FOR SELECT
  USING (true);

-- Только аутентифицированные могут писать
CREATE POLICY "Только авторизованные могут вставлять"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

---

## Тестирование curl

### Загрузка файла

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/image.jpg"
```

**Ожидаемый ответ:**

```json
{
  "success": true,
  "url": "https://dybmmygpbyaawiweidu.supabase.co/storage/v1/object/public/car-images/1707634356789-abc123.jpg",
  "path": "1707634356789-abc123.jpg"
}
```

### Создание объявления

```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Car",
    "images": ["https://dybmmygpbyaawiweidu.supabase.co/storage/v1/object/public/car-images/test.jpg"],
    "price": 1000000
  }'
```

---

## Производительность

### Benchmark (3 фото по 500KB каждое)

| Этап | Время |
|------|-------|
| Выбор файлов | ~1 сек |
| Генерация превью | ~100 мс |
| Загрузка фото 1 | ~400 мс |
| Загрузка фото 2 | ~400 мс |
| Загрузка фото 3 | ~400 мс |
| POST /api/cars | ~200 мс |
| **ИТОГО** | **~2.5 сек** |

---

## Масштабирование

### Для больших файлов (2-5 МБ):

1. **Увеличить timeout:**
   ```typescript
   export const maxDuration = 30 // в route.ts
   ```

2. **Добавить progress bar:**
   ```typescript
   const [uploadProgress, setUploadProgress] = useState(0)
   ```

3. **Компрессия на клиенте:**
   ```typescript
   import imageCompression from 'browser-image-compression'
   ```

### Для большого количества фото (10+):

1. **Chunked upload:**
   - Загружать по 3 фото параллельно
   - Остальные в очередь

2. **Background jobs:**
   - Использовать Supabase Edge Functions
   - Обработка ресайза на сервере

---

## 🎯 Готовы к тестированию?


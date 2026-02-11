-- 1. Создание таблицы cars
CREATE TABLE IF NOT EXISTS cars (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  price NUMERIC,
  brand TEXT,
  model TEXT,
  year INTEGER,
  mileage INTEGER,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);

-- 3. Включение Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- 4. Политики доступа

-- Разрешить всем читать объявления
CREATE POLICY "Публичное чтение объявлений"
  ON cars FOR SELECT
  USING (true);

-- Разрешить только аутентифицированным пользователям добавлять
CREATE POLICY "Только авторизованные могут вставлять"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Разрешить только аутентифицированным пользователям обновлять
CREATE POLICY "Только авторизованные могут обновлять"
  ON cars FOR UPDATE
  TO authenticated
  USING (true);

-- Разрешить только аутентифицированным пользователям удалять
CREATE POLICY "Только авторизованные могут удалять"
  ON cars FOR DELETE
  TO authenticated
  USING (true);

-- 5. Добавить тестовое объявление (опционально)
INSERT INTO cars (title, subtitle, images, price, brand, model, year, mileage, description)
VALUES (
  'BMW X5 M50d',
  'Премиум кроссовер с дизельным двигателем',
  '["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"]'::jsonb,
  4500000,
  'BMW',
  'X5',
  2020,
  45000,
  'Автомобиль в отличном состоянии, полная комплектация, один владелец.'
);

-- Готово! ✅

-- ══════════════════════════════════════════════════════════════════
-- БТА ТОРГ - SQL МИГРАЦИЯ ДЛЯ СТАТИСТИКИ ПРОСМОТРОВ
-- ══════════════════════════════════════════════════════════════════
-- Скопируйте весь этот файл и выполните в Supabase SQL Editor
-- URL: https://app.supabase.com/project/dybmmygpbyaawmiweidu/sql/new
-- ══════════════════════════════════════════════════════════════════

-- 1. Добавляем столбец views в таблицу cars
ALTER TABLE cars ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- 2. Создаем индекс для быстрой сортировки по просмотрам
CREATE INDEX IF NOT EXISTS idx_cars_views ON cars(views DESC);

-- 3. Обновляем существующие записи (если они есть)
UPDATE cars SET views = 0 WHERE views IS NULL;

-- 4. Создаем функцию для атомарного инкремента просмотров
-- (защита от race conditions при одновременных запросах)
CREATE OR REPLACE FUNCTION increment_car_views(car_id bigint)
RETURNS integer AS $$
DECLARE
  new_views integer;
BEGIN
  UPDATE cars
  SET views = COALESCE(views, 0) + 1
  WHERE id = car_id
  RETURNING views INTO new_views;

  RETURN new_views;
END;
$$ LANGUAGE plpgsql;

-- ══════════════════════════════════════════════════════════════════
-- ГОТОВО! ✅
-- ══════════════════════════════════════════════════════════════════
-- После выполнения вы увидите сообщение: "Success. No rows returned"
-- Теперь статистика просмотров будет работать в админ-панели!
-- ══════════════════════════════════════════════════════════════════

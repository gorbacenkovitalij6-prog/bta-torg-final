-- ══════════════════════════════════════════════════════════════════
-- Таблица статистики просмотров по дням
-- ══════════════════════════════════════════════════════════════════

-- 1. Создаем таблицу для хранения статистики по дням
CREATE TABLE IF NOT EXISTS daily_views (
  id BIGSERIAL PRIMARY KEY,
  car_id BIGINT REFERENCES cars(id) ON DELETE CASCADE,
  view_date DATE NOT NULL DEFAULT CURRENT_DATE,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(car_id, view_date)
);

-- 2. Создаем индексы для быстрой выборки
CREATE INDEX IF NOT EXISTS idx_daily_views_car_id ON daily_views(car_id);
CREATE INDEX IF NOT EXISTS idx_daily_views_date ON daily_views(view_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_views_car_date ON daily_views(car_id, view_date DESC);

-- 3. Обновляем функцию инкремента просмотров для записи в статистику
CREATE OR REPLACE FUNCTION increment_car_views(car_id bigint)
RETURNS integer AS $$
DECLARE
  new_views integer;
BEGIN
  -- Увеличиваем общий счетчик в таблице cars
  UPDATE cars
  SET views = COALESCE(views, 0) + 1
  WHERE id = car_id
  RETURNING views INTO new_views;

  -- Добавляем запись в daily_views или увеличиваем счетчик
  INSERT INTO daily_views (car_id, view_date, views_count)
  VALUES (car_id, CURRENT_DATE, 1)
  ON CONFLICT (car_id, view_date)
  DO UPDATE SET views_count = daily_views.views_count + 1;

  RETURN new_views;
END;
$$ LANGUAGE plpgsql;

-- 4. Создаем функцию для получения статистики по дням (последние 30 дней)
CREATE OR REPLACE FUNCTION get_daily_stats(days_count integer DEFAULT 30)
RETURNS TABLE (
  view_date date,
  total_views bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    dv.view_date,
    SUM(dv.views_count)::bigint as total_views
  FROM daily_views dv
  WHERE dv.view_date >= CURRENT_DATE - days_count
  GROUP BY dv.view_date
  ORDER BY dv.view_date ASC;
END;
$$ LANGUAGE plpgsql;

-- 5. Создаем функцию для получения статистики конкретного авто
CREATE OR REPLACE FUNCTION get_car_daily_stats(p_car_id bigint, days_count integer DEFAULT 30)
RETURNS TABLE (
  view_date date,
  views_count integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    dv.view_date,
    dv.views_count
  FROM daily_views dv
  WHERE dv.car_id = p_car_id
    AND dv.view_date >= CURRENT_DATE - days_count
  ORDER BY dv.view_date ASC;
END;
$$ LANGUAGE plpgsql;

-- ══════════════════════════════════════════════════════════════════
-- ГОТОВО! ✅
-- ══════════════════════════════════════════════════════════════════
-- Теперь доступны:
--   ✅ Таблица daily_views для хранения статистики по дням
--   ✅ Автоматическая запись просмотров при вызове increment_car_views
--   ✅ Функции для получения статистики (общей и по авто)
-- ══════════════════════════════════════════════════════════════════

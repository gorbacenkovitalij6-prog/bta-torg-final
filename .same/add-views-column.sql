-- Добавление поля views для статистики просмотров

-- 1. Добавляем столбец views
ALTER TABLE cars ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- 2. Создаем индекс для быстрой сортировки по просмотрам
CREATE INDEX IF NOT EXISTS idx_cars_views ON cars(views DESC);

-- 3. Обновляем существующие записи (если они есть)
UPDATE cars SET views = 0 WHERE views IS NULL;

-- Готово! ✅
-- Теперь каждое объявление имеет счетчик просмотров

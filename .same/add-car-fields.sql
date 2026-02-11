-- ══════════════════════════════════════════════════════════════════
-- Добавление дополнительных характеристик автомобилей
-- ══════════════════════════════════════════════════════════════════

-- 1. Добавляем новые поля
ALTER TABLE cars ADD COLUMN IF NOT EXISTS transmission TEXT; -- Коробка передач
ALTER TABLE cars ADD COLUMN IF NOT EXISTS engine TEXT; -- Двигатель (например, "3.0 TDI 286 л.с.")
ALTER TABLE cars ADD COLUMN IF NOT EXISTS fuel_type TEXT; -- Тип топлива
ALTER TABLE cars ADD COLUMN IF NOT EXISTS color TEXT; -- Цвет

-- 2. Создаем индексы для фильтрации
CREATE INDEX IF NOT EXISTS idx_cars_transmission ON cars(transmission);
CREATE INDEX IF NOT EXISTS idx_cars_fuel_type ON cars(fuel_type);
CREATE INDEX IF NOT EXISTS idx_cars_color ON cars(color);

-- ══════════════════════════════════════════════════════════════════
-- ГОТОВО! ✅
-- ══════════════════════════════════════════════════════════════════
-- Теперь можно добавлять автомобили с полными характеристиками!
-- ══════════════════════════════════════════════════════════════════

# 🚨 ВАЖНО: Выполните этот SQL в Supabase Dashboard

## Шаг 1: Откройте SQL Editor

**URL:** https://app.supabase.com/project/dybmmygpbyaawmiweidu/sql/new

## Шаг 2: Скопируйте и выполните этот SQL

```sql
-- Добавление поля views для статистики просмотров
ALTER TABLE cars ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Создаем индекс для быстрой сортировки по просмотрам
CREATE INDEX IF NOT EXISTS idx_cars_views ON cars(views DESC);

-- Обновляем существующие записи (если они есть)
UPDATE cars SET views = 0 WHERE views IS NULL;

-- Создаем функцию для атомарного инкремента (защита от race conditions)
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
```

## Шаг 3: Нажмите RUN (или Ctrl+Enter)

Должно появиться сообщение: **Success. No rows returned**

## Шаг 4: Вернитесь в терминал и запустите проверку

```bash
bun run migrate-views.js
```

Должно вывести:
```
✅ Поле views уже существует
✅ МИГРАЦИЯ ЗАВЕРШЕНА УСПЕШНО!
```

---

## ✅ После выполнения

Статистика просмотров будет работать:
- Dashboard в админ-панели покажет общую статистику
- Каждый просмотр страницы автомобиля увеличивает счетчик
- В таблице админки будет колонка "Просмотры"

---

**Статус:** ⏳ Ожидает выполнения SQL

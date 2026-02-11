// Миграция: добавление поля views для статистики просмотров
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n=== МИГРАЦИЯ: Добавление поля views ===\n')

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Ошибка: отсутствуют ключи Supabase в .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})

async function migrate() {
  try {
    console.log('1. Проверка текущей структуры таблицы...')

    // Проверяем, существует ли поле views
    const { data: existingCars, error: checkError } = await supabase
      .from('cars')
      .select('id, views')
      .limit(1)

    if (checkError && checkError.message.includes('column "views" does not exist')) {
      console.log('   ⚠️  Поле views отсутствует, будет добавлено\n')

      console.log('2. Выполнение SQL миграции...')
      console.log('   📝 Запустите следующий SQL в Supabase Dashboard → SQL Editor:\n')

      const sql = `-- Добавление поля views для статистики просмотров
ALTER TABLE cars ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_cars_views ON cars(views DESC);
UPDATE cars SET views = 0 WHERE views IS NULL;`

      console.log(sql)
      console.log('\n   📍 URL: https://app.supabase.com/project/dybmmygpbyaawmiweidu/sql/new')
      console.log('\n   ℹ️  Или используйте готовый файл: .same/add-views-column.sql\n')

      console.log('   После выполнения SQL, запустите этот скрипт снова для проверки.\n')
      process.exit(1)
    } else if (checkError) {
      throw checkError
    }

    console.log('   ✅ Поле views уже существует\n')

    console.log('2. Проверка данных...')
    const { data: allCars, error: dataError } = await supabase
      .from('cars')
      .select('id, title, views')
      .order('id', { ascending: true })

    if (dataError) throw dataError

    console.log(`   Найдено объявлений: ${allCars.length}`)
    allCars.forEach(car => {
      console.log(`   - ID ${car.id}: "${car.title}" - ${car.views || 0} просмотров`)
    })

    console.log('\n✅ МИГРАЦИЯ ЗАВЕРШЕНА УСПЕШНО!\n')
    console.log('Теперь можно использовать статистику просмотров.\n')

  } catch (error) {
    console.error('\n❌ Ошибка миграции:', error.message)
    console.error(error)
    process.exit(1)
  }
}

migrate()

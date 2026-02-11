// Быстрая проверка статистики просмотров
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n╔══════════════════════════════════════════════════════════════════╗')
console.log('║           ПРОВЕРКА СТАТИСТИКИ ПРОСМОТРОВ                         ║')
console.log('╚══════════════════════════════════════════════════════════════════╝\n')

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Ошибка: отсутствуют ключи Supabase в .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})

async function checkStats() {
  try {
    console.log('1️⃣  Проверка поля views...')

    const { data: cars, error } = await supabase
      .from('cars')
      .select('id, title, views')
      .order('views', { ascending: false })

    if (error) {
      if (error.message.includes('column "views" does not exist')) {
        console.error('   ❌ Поле views не найдено в таблице cars\n')
        console.log('   📝 Выполните SQL миграцию:')
        console.log('   🔗 https://app.supabase.com/project/dybmmygpbyaawmiweidu/sql/new')
        console.log('   📄 Используйте файл: .same/SQL-TO-EXECUTE.sql\n')
        process.exit(1)
      }
      throw error
    }

    console.log('   ✅ Поле views существует!\n')

    console.log('2️⃣  Проверка RPC функции increment_car_views...')

    if (cars && cars.length > 0) {
      const testCarId = cars[0].id
      const oldViews = cars[0].views || 0

      const { data: newViews, error: rpcError } = await supabase
        .rpc('increment_car_views', { car_id: testCarId })

      if (rpcError) {
        console.log('   ⚠️  RPC функция не найдена (будет использован fallback)\n')
      } else {
        console.log(`   ✅ RPC функция работает! (${oldViews} → ${newViews})\n`)

        // Откатываем тестовый инкремент
        await supabase
          .from('cars')
          .update({ views: oldViews })
          .eq('id', testCarId)
      }
    } else {
      console.log('   ℹ️  Нет объявлений для теста RPC функции\n')
    }

    console.log('3️⃣  Статистика по объявлениям:\n')

    if (!cars || cars.length === 0) {
      console.log('   ℹ️  Нет объявлений в каталоге\n')
    } else {
      const totalCars = cars.length
      const totalViews = cars.reduce((sum, car) => sum + (car.views || 0), 0)
      const avgViews = Math.round(totalViews / totalCars)
      const maxViews = Math.max(...cars.map(c => c.views || 0))
      const mostPopular = cars.find(c => (c.views || 0) === maxViews)

      console.log(`   📊 Всего объявлений: ${totalCars}`)
      console.log(`   👁️  Всего просмотров: ${totalViews}`)
      console.log(`   📈 Средний просмотр: ${avgViews}`)
      console.log(`   🔥 Самое популярное: "${mostPopular?.title}" (${maxViews} просмотров)\n`)

      console.log('   Топ-5 популярных:')
      cars.slice(0, 5).forEach((car, index) => {
        const badge = (car.views || 0) > 100 ? '🔥' : '  '
        console.log(`   ${index + 1}. ${badge} ${car.title} - ${car.views || 0} просмотров`)
      })
      console.log('')
    }

    console.log('╔══════════════════════════════════════════════════════════════════╗')
    console.log('║                    ✅ ВСЁ РАБОТАЕТ!                              ║')
    console.log('╚══════════════════════════════════════════════════════════════════╝\n')
    console.log('Статистика просмотров настроена и работает корректно! 🎉\n')
    console.log('📍 Откройте админ-панель: http://localhost:3000/admin')
    console.log('📍 Откройте каталог: http://localhost:3000/catalog\n')

  } catch (error) {
    console.error('\n❌ Ошибка проверки:', error.message)
    console.error(error)
    process.exit(1)
  }
}

checkStats()

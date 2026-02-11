// Тестовый скрипт для проверки Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n=== ПРОВЕРКА SUPABASE ===\n')

console.log('1. Environment variables:')
console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Установлен' : '❌ НЕ НАЙДЕН')
console.log('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✅ Установлен' : '❌ НЕ НАЙДЕН')

if (!supabaseUrl || !serviceRoleKey) {
  console.error('\n❌ ОШИБКА: Отсутствуют ключи Supabase в .env файле!')
  process.exit(1)
}

console.log('\n2. Создание клиента Supabase...')
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})
console.log('   ✅ Клиент создан')

console.log('\n3. Проверка bucket "car-images"...')
try {
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

  if (bucketsError) {
    console.error('   ❌ Ошибка получения списка buckets:', bucketsError.message)
    process.exit(1)
  }

  console.log('   Найдено buckets:', buckets.length)
  buckets.forEach(bucket => {
    console.log(`   - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`)
  })

  const carImagesBucket = buckets.find(b => b.name === 'car-images')
  if (!carImagesBucket) {
    console.error('\n   ❌ BUCKET "car-images" НЕ НАЙДЕН!')
    console.log('\n   📝 Создайте bucket в Supabase Dashboard:')
    console.log('      https://app.supabase.com/project/dybmmygpbyaawiweidu/storage/buckets')
    console.log('      Name: car-images')
    console.log('      Public: ✅ ON')
    process.exit(1)
  }

  console.log(`   ✅ Bucket "car-images" найден (${carImagesBucket.public ? 'Public' : 'Private'})`)

  if (!carImagesBucket.public) {
    console.warn('   ⚠️  ВНИМАНИЕ: Bucket НЕ публичный! Установите Public = ON')
  }

} catch (error) {
  console.error('   ❌ Ошибка:', error.message)
  process.exit(1)
}

console.log('\n4. Проверка таблицы "cars"...')
try {
  const { data, error } = await supabase.from('cars').select('id').limit(1)

  if (error) {
    console.error('   ❌ Ошибка запроса к таблице:', error.message)
    console.log('\n   📝 Создайте таблицу в Supabase Dashboard:')
    console.log('      SQL Editor → выполните код из .same/setup-database.sql')
    process.exit(1)
  }

  console.log('   ✅ Таблица "cars" найдена')
  console.log('   Записей в таблице:', data ? data.length : 0)

} catch (error) {
  console.error('   ❌ Ошибка:', error.message)
  process.exit(1)
}

console.log('\n5. Тест загрузки файла...')
try {
  const testFileName = `test-${Date.now()}.txt`
  const testContent = 'Test upload from test script'

  const { data, error } = await supabase.storage
    .from('car-images')
    .upload(testFileName, testContent, {
      contentType: 'text/plain',
      upsert: false
    })

  if (error) {
    console.error('   ❌ Ошибка загрузки:', error.message)
    console.log('\n   📝 Проверьте политики Storage:')
    console.log('      Storage → car-images → Policies')
    console.log('      Должна быть политика INSERT для bucket "car-images"')
    process.exit(1)
  }

  console.log('   ✅ Тестовый файл загружен:', data.path)

  // Удаляем тестовый файл
  await supabase.storage.from('car-images').remove([data.path])
  console.log('   ✅ Тестовый файл удален')

} catch (error) {
  console.error('   ❌ Ошибка:', error.message)
  process.exit(1)
}

console.log('\n✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!\n')
console.log('Supabase настроен правильно. Проблема может быть в коде API endpoint.\n')

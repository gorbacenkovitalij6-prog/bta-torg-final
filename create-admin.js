// Скрипт для создания администратора в Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n=== СОЗДАНИЕ АДМИНИСТРАТОРА ===\n')

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Ошибка: отсутствуют ключи Supabase в .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

// Данные администратора
const adminEmail = 'admin@btatorg.ru'
const adminPassword = 'BTATorg2025!Admin'

async function createAdmin() {
  try {
    console.log('1. Проверка существующих пользователей...')

    // Проверяем, существует ли уже пользователь с таким email
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      console.error('   ❌ Ошибка получения списка пользователей:', listError.message)
      console.log('\n   ℹ️  Используйте Supabase Dashboard для создания администратора:')
      console.log('   📍 https://app.supabase.com/project/dybmmygpbyaawmiweidu/auth/users')
      console.log('')
      console.log('   Email: admin@btatorg.ru')
      console.log('   Password: BTATorg2025!Admin')
      console.log('   Auto Confirm User: ✅\n')
      process.exit(1)
    }

    const existingUser = existingUsers.users.find(u => u.email === adminEmail)

    if (existingUser) {
      console.log(`   ✅ Администратор уже существует: ${adminEmail}`)
      console.log(`   User ID: ${existingUser.id}`)
      console.log(`   Создан: ${new Date(existingUser.created_at).toLocaleString('ru-RU')}`)
      console.log(`   Подтвержден: ${existingUser.email_confirmed_at ? 'Да' : 'Нет'}`)
      console.log('\n✅ ВСЁ ГОТОВО! Можно входить в админ-панель:\n')
      console.log('   URL: http://localhost:3000/admin')
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
      console.log('')
      return
    }

    console.log('   Пользователь не найден, создаём нового...\n')

    console.log('2. Создание администратора...')

    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Автоматически подтверждаем email
      user_metadata: {
        role: 'admin',
        name: 'Администратор БТА Торг'
      }
    })

    if (error) {
      console.error('   ❌ Ошибка создания пользователя:', error.message)
      console.log('\n   ℹ️  Используйте Supabase Dashboard для создания администратора:')
      console.log('   📍 https://app.supabase.com/project/dybmmygpbyaawmiweidu/auth/users')
      console.log('')
      console.log('   Email: admin@btatorg.ru')
      console.log('   Password: BTATorg2025!Admin')
      console.log('   Auto Confirm User: ✅\n')
      process.exit(1)
    }

    console.log('   ✅ Администратор создан успешно!')
    console.log(`   User ID: ${data.user.id}`)
    console.log(`   Email: ${data.user.email}`)
    console.log('')

    console.log('✅ ВСЁ ГОТОВО! Теперь можно входить в админ-панель:\n')
    console.log('   URL: http://localhost:3000/admin')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log('')
    console.log('💡 Сохраните эти данные в надежном месте!\n')

  } catch (error) {
    console.error('\n❌ Непредвиденная ошибка:', error)
    console.log('\n   ℹ️  Используйте Supabase Dashboard для создания администратора:')
    console.log('   📍 https://app.supabase.com/project/dybmmygpbyaawmiweidu/auth/users\n')
    process.exit(1)
  }
}

createAdmin()

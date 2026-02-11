import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// POST /api/cars/views?id=123
// Увеличивает счетчик просмотров для автомобиля
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Используем PostgreSQL функцию для атомарного инкремента
    const { data, error } = await supabaseAdmin.rpc('increment_car_views', {
      car_id: parseInt(id)
    })

    // Если функция не существует, используем UPDATE
    if (error && error.message.includes('function') && error.message.includes('does not exist')) {
      console.log('Using UPDATE fallback (RPC function not found)')

      // Fallback: обычный UPDATE
      const { data: currentCar, error: fetchError } = await supabaseAdmin
        .from('cars')
        .select('views')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      const newViews = (currentCar.views || 0) + 1

      const { data: updatedCar, error: updateError } = await supabaseAdmin
        .from('cars')
        .update({ views: newViews })
        .eq('id', id)
        .select('views')
        .single()

      if (updateError) throw updateError

      return NextResponse.json({ views: updatedCar.views })
    }

    if (error) throw error

    return NextResponse.json({ views: data })
  } catch (e) {
    console.error('Views increment error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to increment views' },
      { status: 500 }
    )
  }
}

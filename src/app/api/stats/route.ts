import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// GET /api/stats?days=30
// Получает статистику просмотров по дням
export async function GET(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const carId = searchParams.get('carId')

    // Если запрашивается статистика конкретного авто
    if (carId) {
      const { data, error } = await supabaseAdmin.rpc('get_car_daily_stats', {
        p_car_id: parseInt(carId),
        days_count: days
      })

      if (error) {
        console.error('RPC error:', error)
        // Fallback: получаем данные напрямую
        const { data: fallbackData, error: fallbackError } = await supabaseAdmin
          .from('daily_views')
          .select('view_date, views_count')
          .eq('car_id', carId)
          .gte('view_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          .order('view_date', { ascending: true })

        if (fallbackError) throw fallbackError
        return NextResponse.json(fallbackData || [])
      }

      return NextResponse.json(data || [])
    }

    // Общая статистика по всем авто
    const { data, error } = await supabaseAdmin.rpc('get_daily_stats', {
      days_count: days
    })

    if (error) {
      console.error('RPC error:', error)
      // Fallback: получаем данные напрямую
      const { data: fallbackData, error: fallbackError } = await supabaseAdmin
        .from('daily_views')
        .select('view_date, views_count')
        .gte('view_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('view_date', { ascending: true })

      if (fallbackError) throw fallbackError

      // Группируем по датам
      const grouped = (fallbackData || []).reduce((acc: Record<string, number>, item: { view_date: string; views_count: number }) => {
        const date = item.view_date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += item.views_count
        return acc
      }, {})

      const result = Object.entries(grouped).map(([view_date, total_views]) => ({
        view_date,
        total_views
      }))

      return NextResponse.json(result)
    }

    return NextResponse.json(data || [])
  } catch (e) {
    console.error('Stats API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

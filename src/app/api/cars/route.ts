import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(req: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json([])

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    // If ID is provided, return single car
    if (id) {
      const { data, error } = await supabaseAdmin
        .from('cars')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return NextResponse.json(data)
    }

    // Otherwise return all cars
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .order('createdAt', { ascending: false })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (e) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    const body = await req.json()
    const { title, subtitle, images, price, brand, model, year, mileage, transmission, engine, fuel_type, color, description } = body

    // Support both 'image' and 'images' for backward compatibility
    const imageArray = images || (body.image ? [body.image] : [])

    if (!title || !imageArray.length) {
      return NextResponse.json({ error: 'Title and at least one image are required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('cars')
      .insert({
        title,
        subtitle,
        images: imageArray, // Store as JSON array
        price,
        brand,
        model,
        year,
        mileage,
        transmission,
        engine,
        fuel_type,
        color,
        description,
      })
      .select('*')
      .single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (e) {
    console.error('API error:', e)
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}

// PUT endpoint for editing cars
export async function PUT(req: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const body = await req.json()
    const { title, subtitle, images, price, brand, model, year, mileage, transmission, engine, fuel_type, color, description } = body

    const imageArray = images || []

    if (!title || !imageArray.length) {
      return NextResponse.json({ error: 'Title and at least one image are required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('cars')
      .update({
        title,
        subtitle,
        images: imageArray,
        price,
        brand,
        model,
        year,
        mileage,
        transmission,
        engine,
        fuel_type,
        color,
        description,
      })
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (e) {
    console.error('Update error:', e)
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

// DELETE endpoint for admin panel
export async function DELETE(req: Request) {
  try {
    if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    const { error } = await supabaseAdmin
      .from('cars')
      .delete()
      .eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Delete error:', e)
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}

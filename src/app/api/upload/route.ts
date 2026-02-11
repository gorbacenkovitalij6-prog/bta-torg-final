import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Для Next.js 15+ App Router
export const runtime = 'nodejs'
export const maxDuration = 60 // 60 секунд для больших файлов

// Динамический роутинг для обработки больших файлов
export const dynamic = 'force-dynamic'

// НОВЫЙ ПОДХОД: Принимаем файл как blob/buffer напрямую
// Избегаем ограничения FormData в Next.js (1 МБ)
export async function POST(req: NextRequest) {
  try {
    console.log('=== UPLOAD API v217 - BLOB MODE ===')
    console.log('ENV:', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      adminExists: !!supabaseAdmin
    })

    // Получаем метаданные из headers
    const contentType = req.headers.get('content-type') || 'application/octet-stream'
    const fileName = req.headers.get('x-file-name') || 'upload'
    const fileSize = req.headers.get('content-length')

    console.log('File metadata:', {
      name: fileName,
      type: contentType,
      size: fileSize
    })

    // Проверка размера (максимум 10 МБ)
    if (fileSize && parseInt(fileSize) > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10 MB limit' },
        { status: 413 }
      )
    }

    // Читаем body как ArrayBuffer
    const buffer = await req.arrayBuffer()

    console.log('Buffer received:', buffer.byteLength, 'bytes')

    // Генерируем уникальное имя файла
    const ext = fileName.split('.').pop() || 'jpg'
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Проверка Supabase
    if (!supabaseAdmin) {
      console.error('ERROR: supabaseAdmin is undefined!')
      return NextResponse.json(
        { error: 'Supabase not configured - check .env file' },
        { status: 500 }
      )
    }

    console.log('Uploading to Supabase:', uniqueFileName)

    // Загружаем в Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('car-images')
      .upload(uniqueFileName, buffer, {
        contentType: contentType.startsWith('image/') ? contentType : 'image/jpeg',
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Upload success! Path:', data.path)

    // Получаем публичный URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('car-images')
      .getPublicUrl(data.path)

    console.log('Public URL:', publicUrlData.publicUrl)

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: data.path
    })

  } catch (error) {
    console.error('API upload error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Upload failed'
    }, { status: 500 })
  }
}

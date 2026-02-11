'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import type { Car } from '@/types/car';

interface AddCarFormProps {
  onCarAdded: (car: Car) => void;
}

export function AddCarForm({ onCarAdded }: AddCarFormProps) {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    brand: '',
    model: '',
    price: '',
    year: '',
    mileage: '',
    transmission: '',
    engine: '',
    fuelType: '',
    color: '',
    description: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)

    const previews = selectedFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const removePreview = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  async function handleUpload(file: File): Promise<string> {
    const fileBuffer = await file.arrayBuffer()

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'X-File-Name': file.name,
      },
      body: fileBuffer,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown' }))
      throw new Error(`Upload failed: ${errorData.error || response.statusText}`)
    }

    const result = await response.json()
    if (!result.url) {
      throw new Error('No URL in response')
    }

    return result.url
  }

  async function addCar(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!form.title || !files.length) {
      setErrorMsg('Заполните название и добавьте хотя бы одно фото.')
      return
    }

    setSubmitting(true)

    try {
      // Upload all images
      const uploadedUrls: string[] = []
      for (const file of files) {
        try {
          const url = await handleUpload(file)
          uploadedUrls.push(url)
        } catch (err: unknown) {
          console.error('Upload error', err)
          const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
          setErrorMsg(`Ошибка загрузки: ${errorMessage}`)
          setSubmitting(false)
          return
        }
      }

      const payload = {
        title: form.title,
        subtitle: form.subtitle || undefined,
        brand: form.brand || undefined,
        model: form.model || undefined,
        images: uploadedUrls,
        price: form.price ? Number(form.price) : undefined,
        year: form.year ? Number(form.year) : undefined,
        mileage: form.mileage ? Number(form.mileage) : undefined,
        transmission: form.transmission || undefined,
        engine: form.engine || undefined,
        fuel_type: form.fuelType || undefined,
        color: form.color || undefined,
        description: form.description || undefined,
      }

      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const t = await res.text().catch(() => '')
        console.error('POST /api/cars failed', res.status, t)
        setErrorMsg('Не удалось сохранить объявление.')
        setSubmitting(false)
        return
      }

      const created = await res.json()
      onCarAdded(created)

      // Reset form
      setForm({ title: '', subtitle: '', brand: '', model: '', price: '', year: '', mileage: '', transmission: '', engine: '', fuelType: '', color: '', description: '' })
      setFiles([])
      setImagePreviews([])
      setSuccessMsg('✅ Объявление успешно добавлено!')

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch (err) {
      console.error(err)
      setErrorMsg('Непредвиденная ошибка.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 uppercase tracking-wide">
        Добавить новое объявление
      </h2>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm">
          {successMsg}
        </div>
      )}

      <form onSubmit={addCar}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Название *"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.subtitle}
            onChange={e => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Подзаголовок"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.brand}
            onChange={e => setForm({ ...form, brand: e.target.value })}
            placeholder="Марка"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.model}
            onChange={e => setForm({ ...form, model: e.target.value })}
            placeholder="Модель"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            placeholder="Цена (₽)"
            type="number"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
            placeholder="Год"
            type="number"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <input
            value={form.mileage}
            onChange={e => setForm({ ...form, mileage: e.target.value })}
            placeholder="Пробег (км)"
            type="number"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Новые характеристики */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            value={form.transmission}
            onChange={e => setForm({ ...form, transmission: e.target.value })}
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Коробка передач</option>
            <option value="Автомат">Автомат</option>
            <option value="Механика">Механика</option>
            <option value="Робот">Робот</option>
            <option value="Вариатор">Вариатор</option>
          </select>

          <input
            value={form.engine}
            onChange={e => setForm({ ...form, engine: e.target.value })}
            placeholder="Двигатель (например, 3.0 TDI 286 л.с.)"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />

          <select
            value={form.fuelType}
            onChange={e => setForm({ ...form, fuelType: e.target.value })}
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Тип топлива</option>
            <option value="Бензин">Бензин</option>
            <option value="Дизель">Дизель</option>
            <option value="Электро">Электро</option>
            <option value="Гибрид">Гибрид</option>
            <option value="Газ">Газ</option>
          </select>

          <input
            value={form.color}
            onChange={e => setForm({ ...form, color: e.target.value })}
            placeholder="Цвет (например, Черный металлик)"
            className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Описание"
          rows={3}
          className="w-full border border-gray-300 px-4 py-3 rounded mb-4 focus:ring-2 focus:ring-black focus:border-transparent"
        />

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Фотографии (можно выбрать несколько) *</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Выбрать файлы</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {files.length > 0 && (
              <span className="text-sm text-gray-600">
                Выбрано: {files.length} {files.length === 1 ? 'файл' : 'файлов'}
              </span>
            )}
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removePreview(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-3 uppercase text-sm tracking-wider hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        >
          {submitting ? 'Сохранение…' : 'Добавить объявление'}
        </button>
      </form>
    </div>
  )
}

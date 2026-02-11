'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Car {
  id: number;
  title: string;
  subtitle?: string | null;
  images: string[];
  price?: number | null;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  transmission?: string | null;
  engine?: string | null;
  fuel_type?: string | null;
  color?: string | null;
  description?: string | null;
  views?: number | null;
}

interface EditCarModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCar: Car) => void;
}

export function EditCarModal({ car, isOpen, onClose, onSave }: EditCarModalProps) {
  const [form, setForm] = useState({
    title: car.title,
    subtitle: car.subtitle || '',
    brand: car.brand || '',
    model: car.model || '',
    price: car.price?.toString() || '',
    year: car.year?.toString() || '',
    mileage: car.mileage?.toString() || '',
    transmission: car.transmission || '',
    engine: car.engine || '',
    fuelType: car.fuel_type || '',
    color: car.color || '',
    description: car.description || '',
  });

  const [images, setImages] = useState<string[]>(car.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form when car changes
  useEffect(() => {
    setForm({
      title: car.title,
      subtitle: car.subtitle || '',
      brand: car.brand || '',
      model: car.model || '',
      price: car.price?.toString() || '',
      year: car.year?.toString() || '',
      mileage: car.mileage?.toString() || '',
      transmission: car.transmission || '',
      engine: car.engine || '',
      fuelType: car.fuel_type || '',
      color: car.color || '',
      description: car.description || '',
    });
    setImages(car.images || []);
    setNewFiles([]);
    setNewPreviews([]);
  }, [car]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...selectedFiles]);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileBuffer = await file.arrayBuffer();

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'X-File-Name': file.name,
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown' }));
      throw new Error(`Upload failed: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    if (!result.url) {
      throw new Error('No URL in response');
    }

    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Upload new files
      const uploadedUrls: string[] = [];
      for (const file of newFiles) {
        try {
          const url = await uploadFile(file);
          uploadedUrls.push(url);
        } catch (err) {
          console.error('Upload error:', err);
          setError(`Ошибка загрузки файла: ${err instanceof Error ? err.message : 'Unknown'}`);
          setSubmitting(false);
          return;
        }
      }

      // Combine existing images with newly uploaded
      const allImages = [...images, ...uploadedUrls];

      if (!form.title || allImages.length === 0) {
        setError('Название и хотя бы одно фото обязательны');
        setSubmitting(false);
        return;
      }

      const payload = {
        title: form.title,
        subtitle: form.subtitle || null,
        brand: form.brand || null,
        model: form.model || null,
        images: allImages,
        price: form.price ? Number(form.price) : null,
        year: form.year ? Number(form.year) : null,
        mileage: form.mileage ? Number(form.mileage) : null,
        transmission: form.transmission || null,
        engine: form.engine || null,
        fuel_type: form.fuelType || null,
        color: form.color || null,
        description: form.description || null,
      };

      const res = await fetch(`/api/cars?id=${car.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        console.error('PUT /api/cars failed:', res.status, errorText);
        setError('Не удалось обновить объявление');
        setSubmitting(false);
        return;
      }

      const updatedCar = await res.json();
      onSave(updatedCar);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Непредвиденная ошибка');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Редактировать объявление
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Название *"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Подзаголовок"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="Марка"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="Модель"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Цена (₽)"
                type="number"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="Год"
                type="number"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                placeholder="Пробег (км)"
                type="number"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Дополнительные характеристики */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={form.transmission}
                onChange={(e) => setForm({ ...form, transmission: e.target.value })}
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
                onChange={(e) => setForm({ ...form, engine: e.target.value })}
                placeholder="Двигатель (например, 3.0 TDI 286 л.с.)"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />

              <select
                value={form.fuelType}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
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
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                placeholder="Цвет (например, Черный металлик)"
                className="border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Описание"
              rows={3}
              className="w-full border border-gray-300 px-4 py-3 rounded mb-4 focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {/* Existing Images */}
            {images.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Текущие фото</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative aspect-square rounded overflow-hidden border border-gray-200">
                        <Image
                          src={image}
                          alt={`Фото ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            {newPreviews.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Новые фото (будут загружены)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative aspect-square rounded overflow-hidden border border-green-300">
                        <img
                          src={preview}
                          alt={`Новое фото ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Photos */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Добавить фото</label>
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
                <span className="text-sm text-gray-500">
                  {newFiles.length > 0 && `Выбрано: ${newFiles.length} файлов`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {submitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

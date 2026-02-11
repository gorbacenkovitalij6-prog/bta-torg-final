'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

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
  createdAt?: string | null;
  views?: number | null;
}

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadCar() {
      try {
        const res = await fetch(`/api/cars?id=${id}`, { cache: 'no-store' });
        const data = await res.json();

        if (data && !Array.isArray(data)) {
          setCar({
            ...data,
            images: data.images || (data.image ? [data.image] : []),
          });

          // Увеличиваем счетчик просмотров
          fetch(`/api/cars/views?id=${id}`, { method: 'POST' }).catch((err) => {
            console.warn('Failed to increment views:', err);
          });
        } else {
          console.error('Car not found');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [id]);

  const nextImage = () => {
    if (car && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    if (car && car.images.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevLightboxImage = () => {
    if (car && car.images.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setFormSuccess(true);
    setContactForm({ name: '', phone: '', email: '', message: '' });
    setFormSubmitting(false);

    setTimeout(() => setFormSuccess(false), 3000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-16 flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Загрузка...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!car) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-16 flex flex-col items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-600 mb-6">Автомобиль не найден</p>
          <button
            onClick={() => router.push('/catalog')}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться в каталог
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-black transition-colors">
              Главная
            </button>
            <span>/</span>
            <button onClick={() => router.push('/catalog')} className="hover:text-black transition-colors">
              Каталог
            </button>
            <span>/</span>
            <span className="text-black font-semibold">{car.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => router.push('/catalog')}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад в каталог
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4 group cursor-pointer">
                {car.images.length > 0 ? (
                  <>
                    <Image
                      src={car.images[currentImageIndex]}
                      alt={car.title}
                      fill
                      className="object-cover"
                      onClick={() => openLightbox(currentImageIndex)}
                    />

                    {/* Navigation Arrows */}
                    {car.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {car.images.length}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Нет фото
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-black' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${car.title} - фото ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl lg:text-4xl font-light uppercase tracking-wider mb-4"
              >
                {car.title}
              </motion.h1>

              {car.subtitle && (
                <p className="text-lg text-gray-600 mb-6">{car.subtitle}</p>
              )}

              {car.price && (
                <div className="text-4xl font-bold mb-8">
                  {car.price.toLocaleString()} ₽
                </div>
              )}

              {/* Specifications */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
                  Характеристики
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {car.brand && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Марка</p>
                      <p className="font-semibold">{car.brand}</p>
                    </div>
                  )}
                  {car.model && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Модель</p>
                      <p className="font-semibold">{car.model}</p>
                    </div>
                  )}
                  {car.year && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Год выпуска</p>
                      <p className="font-semibold">{car.year}</p>
                    </div>
                  )}
                  {car.mileage && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Пробег</p>
                      <p className="font-semibold">{car.mileage.toLocaleString()} км</p>
                    </div>
                  )}
                  {car.transmission && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Коробка передач</p>
                      <p className="font-semibold">{car.transmission}</p>
                    </div>
                  )}
                  {car.engine && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Двигатель</p>
                      <p className="font-semibold">{car.engine}</p>
                    </div>
                  )}
                  {car.fuel_type && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Тип топлива</p>
                      <p className="font-semibold">{car.fuel_type}</p>
                    </div>
                  )}
                  {car.color && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Цвет</p>
                      <p className="font-semibold">{car.color}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
                    Описание
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {car.description}
                  </p>
                </div>
              )}

              {/* Contact Form */}
              <div className="bg-black text-white rounded-lg p-6">
                <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
                  Оставить заявку
                </h2>

                {formSuccess ? (
                  <div className="bg-green-500 text-white p-4 rounded mb-4">
                    ✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Ваше имя *"
                      required
                      className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Телефон *"
                      required
                      className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Сообщение"
                      rows={3}
                      className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                      {formSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </button>
                  </form>
                )}

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-300 mb-3">Или свяжитесь с нами напрямую:</p>
                  <div className="space-y-2">
                    <a href="tel:+79001234567" className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
                      <Phone className="w-4 h-4" />
                      +7 (900) 123-45-67
                    </a>
                    <a href="mailto:info@btatorg.ru" className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
                      <Mail className="w-4 h-4" />
                      info@btatorg.ru
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && car.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg">
              {lightboxIndex + 1} / {car.images.length}
            </div>

            {/* Previous Button */}
            {car.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
            )}

            {/* Image */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={car.images[lightboxIndex]}
                alt={car.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            {car.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

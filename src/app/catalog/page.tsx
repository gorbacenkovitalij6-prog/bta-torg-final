'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Car {
  id: number
  title: string
  subtitle?: string | null
  images: string[]
  price?: number | null
  brand?: string | null
  model?: string | null
  year?: number | null
  mileage?: number | null
  transmission?: string | null
  engine?: string | null
  fuel_type?: string | null
  color?: string | null
  description?: string | null
  createdAt?: string | null
  views?: number | null
}

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/cars', { cache: 'no-store' })
        const data = await res.json()
        if (Array.isArray(data)) {
          const normalized = data.map(car => ({
            ...car,
            images: car.images || (car.image ? [car.image] : [])
          }))
          setCars(normalized)
          setFilteredCars(normalized)
        } else {
          console.warn('Unexpected /api/cars payload', data)
          setCars([])
          setFilteredCars([])
        }
      } catch (e) {
        console.error(e)
        setCars([])
        setFilteredCars([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...cars]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(car =>
        car.title?.toLowerCase().includes(term) ||
        car.brand?.toLowerCase().includes(term) ||
        car.model?.toLowerCase().includes(term) ||
        car.description?.toLowerCase().includes(term)
      )
    }

    // Price filter
    if (minPrice) {
      result = result.filter(car => (car.price || 0) >= Number(minPrice))
    }
    if (maxPrice) {
      result = result.filter(car => (car.price || 0) <= Number(maxPrice))
    }

    // Year filter
    if (minYear) {
      result = result.filter(car => (car.year || 0) >= Number(minYear))
    }
    if (maxYear) {
      result = result.filter(car => (car.year || 0) <= Number(maxYear))
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter(car => car.brand?.toLowerCase() === selectedBrand.toLowerCase())
    }

    setFilteredCars(result)
    setCurrentPage(1)
  }, [searchTerm, minPrice, maxPrice, minYear, maxYear, selectedBrand, cars])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage || 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCars.slice(startIndex, endIndex);

  // Get unique brands for filter dropdown
  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand).filter(Boolean))) as string[]

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setSearchTerm('')
    setMinPrice('')
    setMaxPrice('')
    setMinYear('')
    setMaxYear('')
    setSelectedBrand('')
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-light uppercase tracking-wider mb-4 text-center"
          >
            Каталог автомобилей
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 mb-4"
          >
            Премиум автомобили из Германии
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm text-gray-500"
          >
            Найдено автомобилей: <span className="font-semibold text-black">{filteredCars.length}</span>
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold uppercase tracking-wide">Фильтры</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Сбросить все
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Поиск по названию, марке..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Brand */}
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Все марки</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Price Range */}
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="Цена от"
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="Цена до"
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {/* Year Range */}
            <input
              type="number"
              value={minYear}
              onChange={e => setMinYear(e.target.value)}
              placeholder="Год от"
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="number"
              value={maxYear}
              onChange={e => setMaxYear(e.target.value)}
              placeholder="Год до"
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <p className="text-center text-gray-600">Загрузка...</p>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">Ничего не найдено</p>
              <p className="text-gray-500 mb-6">Попробуйте изменить фильтры или очистить поиск</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                <ChevronLeft className="w-5 h-5" />
                Назад
              </button>

              <span className="text-gray-600">
                Страница <span className="font-bold">{currentPage}</span> из {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                Вперед
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Car Card Component with Image Gallery
function CarCard({ car, index }: { car: Car; index: number }) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = car.images || []

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const viewDetails = () => {
    router.push(`/catalog/${car.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]}
              alt={car.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Image navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Нет фото
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-base font-bold uppercase tracking-wide mb-2">
          {car.title}
        </h3>
        {car.subtitle && (
          <p className="text-sm text-gray-600 mb-2">{car.subtitle}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          {car.year && <span>{car.year} г.</span>}
          {car.mileage && <span>• {car.mileage.toLocaleString()} км</span>}
        </div>

        {car.price && (
          <p className="text-lg font-bold mb-4">{car.price.toLocaleString()} ₽</p>
        )}

        <button
          onClick={viewDetails}
          className="w-full bg-black text-white py-2 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Подробнее
        </button>
      </div>
    </motion.div>
  )
}

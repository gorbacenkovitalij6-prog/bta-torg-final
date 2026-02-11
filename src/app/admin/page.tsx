'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, LogOut, Lock, Edit } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { EditCarModal } from '@/components/EditCarModal';
import { AddCarForm } from '@/components/AddCarForm';
import { StatisticsCharts } from '@/components/StatisticsCharts';

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

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const supabase = getSupabaseClient();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (user) {
        loadCars();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadCars();
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCars = async () => {
    setLoadingCars(true);
    try {
      const res = await fetch('/api/cars', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        const normalized = data.map((car: Car & { image?: string }) => ({
          ...car,
          images: car.images || (car.image ? [car.image] : []),
        }));
        setCars(normalized);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCars(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        loadCars();
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка входа. Проверьте email и пароль.';
      setLoginError(message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCars([]);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedCar: Car) => {
    setCars(cars.map((c) => (c.id === updatedCar.id ? updatedCar : c)));
    setEditModalOpen(false);
    setEditingCar(null);
  };

  const handleCarAdded = (newCar: Car) => {
    setCars([newCar, ...cars]);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это объявление?')) return;

    try {
      const res = await fetch(`/api/cars?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCars(cars.filter((c) => c.id !== id));
      } else {
        alert('Не удалось удалить объявление');
      }
    } catch (e) {
      console.error(e);
      alert('Ошибка удаления');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Загрузка...</p>
      </main>
    );
  }

  if (!user) {
    // Login Form
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-center mb-2 uppercase tracking-wide">
                Админ-панель
              </h1>
              <p className="text-center text-gray-600 mb-6">
                Войдите, чтобы управлять объявлениями
              </p>

              {loginError && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                  {loginError}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="admin@btatorg.ru"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase tracking-wide"
                >
                  {loggingIn ? 'Вход...' : 'Войти'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Нет учетной записи? Создайте пользователя в Supabase Dashboard → Authentication
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-light uppercase tracking-wider mb-2">
                Админ-панель
              </h1>
              <p className="text-gray-600">
                Вы вошли как: <span className="font-semibold">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Выйти
            </button>
          </div>

          {/* Stats Dashboard */}
          {!loadingCars && cars.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Total Cars */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
                  Всего объявлений
                </p>
                <p className="text-4xl font-bold text-blue-900">{cars.length}</p>
              </div>

              {/* Total Views */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mb-2">
                  Всего просмотров
                </p>
                <p className="text-4xl font-bold text-green-900">
                  {cars.reduce((sum, car) => sum + (car.views || 0), 0).toLocaleString()}
                </p>
              </div>

              {/* Most Viewed */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                <p className="text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
                  Самое популярное
                </p>
                <p className="text-lg font-bold text-purple-900 truncate">
                  {cars.reduce((max, car) =>
                    (car.views || 0) > (max.views || 0) ? car : max,
                    cars[0]
                  ).title}
                </p>
                <p className="text-sm text-purple-600">
                  {Math.max(...cars.map(c => c.views || 0)).toLocaleString()} просмотров
                </p>
              </div>

              {/* Average Views */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
                <p className="text-sm text-orange-600 font-semibold uppercase tracking-wide mb-2">
                  Средний просмотр
                </p>
                <p className="text-4xl font-bold text-orange-900">
                  {Math.round(cars.reduce((sum, car) => sum + (car.views || 0), 0) / cars.length)}
                </p>
              </div>
            </div>
          )}

          {/* Statistics Charts */}
          {!loadingCars && cars.length > 0 && (
            <div className="mb-8">
              <StatisticsCharts />
            </div>
          )}

          {/* Add Car Form */}
          {!loadingCars && <AddCarForm onCarAdded={handleCarAdded} />}

          {/* Cars Table */}
          {loadingCars ? (
            <p className="text-center text-gray-600">Загрузка объявлений...</p>
          ) : cars.length === 0 ? (
            <p className="text-center text-gray-600">Нет объявлений</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Фото
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Название
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Марка
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Год
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Цена
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      👁️ Просмотры
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {car.images && car.images.length > 0 ? (
                          <div className="relative w-20 h-20 rounded overflow-hidden">
                            <Image
                              src={car.images[0]}
                              alt={car.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                            Нет фото
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{car.title}</div>
                        {car.subtitle && (
                          <div className="text-sm text-gray-600">{car.subtitle}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {car.brand || '—'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {car.year || '—'}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {car.price ? `${car.price.toLocaleString()} ₽` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{(car.views || 0).toLocaleString()}</span>
                          {(car.views || 0) > 100 && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded">
                              🔥 Популярное
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(car)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">💡 Как добавить объявление?</h3>
            <p className="text-sm text-gray-700">
              Перейдите на страницу <Link href="/catalog" className="text-blue-600 hover:underline font-semibold">/catalog</Link> и используйте форму вверху страницы для добавления новых автомобилей.
            </p>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {editingCar && (
        <EditCarModal
          car={editingCar}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingCar(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      <Footer />
    </main>
  );
}

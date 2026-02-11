'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';

interface DailyStats {
  view_date: string;
  total_views: number;
}

interface WeeklyStats {
  week: string;
  total_views: number;
}

export function StatisticsCharts() {
  const [dailyData, setDailyData] = useState<DailyStats[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7' | '30' | '90'>('30');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    loadStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats?days=${period}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        // Формируем данные для графика по дням
        const daily = data.map((item: { view_date: string; total_views?: number; views_count?: number }) => ({
          view_date: new Date(item.view_date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
          }),
          total_views: Number(item.total_views || item.views_count || 0),
        }));

        setDailyData(daily);

        // Группируем по неделям
        const weekly = groupByWeek(data);
        setWeeklyData(weekly);
      }
    } catch (e) {
      console.error('Failed to load stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const groupByWeek = (data: { view_date: string; total_views?: number; views_count?: number }[]): WeeklyStats[] => {
    const weeks: { [key: string]: number } = {};

    data.forEach((item) => {
      const date = new Date(item.view_date);
      const weekStart = getWeekStart(date);
      const weekKey = weekStart.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
      });

      if (!weeks[weekKey]) {
        weeks[weekKey] = 0;
      }
      weeks[weekKey] += Number(item.total_views || item.views_count || 0);
    });

    return Object.entries(weeks).map(([week, total_views]) => ({
      week,
      total_views,
    }));
  };

  const getWeekStart = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Понедельник
    return new Date(date.setDate(diff));
  };

  const totalViews = dailyData.reduce((sum, item) => sum + item.total_views, 0);
  const avgViews = dailyData.length > 0 ? Math.round(totalViews / dailyData.length) : 0;
  const maxViews = Math.max(...dailyData.map((d) => d.total_views), 0);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <p className="text-center text-gray-600">Загрузка статистики...</p>
      </div>
    );
  }

  const chartData = viewMode === 'daily' ? dailyData : weeklyData;
  const xKey = viewMode === 'daily' ? 'view_date' : 'week';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase tracking-wide">
          Статистика просмотров
        </h2>
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                viewMode === 'daily'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Calendar className="w-4 h-4" />
              По дням
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              По неделям
            </button>
          </div>

          {/* Period Selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as '7' | '30' | '90')}
            className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="7">7 дней</option>
            <option value="30">30 дней</option>
            <option value="90">90 дней</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
            Всего просмотров
          </p>
          <p className="text-4xl font-bold text-blue-900">{totalViews.toLocaleString()}</p>
          <p className="text-sm text-blue-600 mt-2">за {period} дней</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mb-2">
            Среднее в день
          </p>
          <p className="text-4xl font-bold text-green-900">{avgViews}</p>
          <p className="text-sm text-green-600 mt-2">просмотров</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <p className="text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
            Максимум в день
          </p>
          <p className="text-4xl font-bold text-purple-900">{maxViews}</p>
          <p className="text-sm text-purple-600 mt-2">просмотров</p>
        </div>
      </div>

      {/* Charts */}
      {chartData.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Нет данных за выбранный период</p>
          <p className="text-sm text-gray-500">
            Статистика будет отображаться после первых просмотров объявлений
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
              Динамика просмотров
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey={xKey}
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total_views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Просмотры"
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
              Распределение по периодам
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey={xKey}
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total_views"
                  fill="#10b981"
                  name="Просмотры"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

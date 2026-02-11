'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Send } from 'lucide-react';

export default function TeamPage() {
  const team = [
    {
      firstName: 'Евгений',
      lastName: 'Черных',
      position: 'Старший менеджер',
      description: '7 лет в сфере автоподбора, более 150 автомобилей, подобранных и доставленных клиентам под ключ. Руководит отделом продаж и координирует работу команды.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/jvHzns7B/image-2026-02-09-10-37-04.png',
    },
    {
      firstName: 'Артём',
      lastName: 'Смирнов',
      position: 'Менеджер',
      description: '5 лет помогаю клиентам безопасно купить авто. Более 83 машин, доставленных и оформленных "под ключ", каждый проект — под личным контролем.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/xqkh8Lpb/image-2026-02-09-10-37-30.png',
    },
    {
      firstName: 'Александр',
      lastName: 'Жуков',
      position: 'Менеджер',
      description: 'Организует подбор, доставку и таможенное оформление. 4 года опыта в международных перевозках, более 60 успешных сделок.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/F4t2VdQP/image-2026-02-09-10-38-00.png',
    },
    {
      firstName: 'Иван',
      lastName: 'Луганов',
      position: 'Менеджер',
      description: '4 года занимаюсь автопригоном под ключ: от поиска и торгов до растаможки и постановки на учёт. Более 70 довольных клиентов.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/8LD7jLQZ/image-2026-02-09-10-38-43.png',
    },
    {
      firstName: 'Андрей',
      lastName: 'Мальцев',
      position: 'Менеджер',
      description: '6 лет опыта в автобизнесе. Специализируюсь на премиум-сегменте: Mercedes, BMW, Audi. Организовал доставку более 90 автомобилей из Европы.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/nNDJGG2R/image-2026-02-09-10-39-30.png',
    },
    {
      firstName: 'Юлия',
      lastName: 'Смирнова',
      position: 'Менеджер',
      description: 'Помогаю клиентам найти автомобиль мечты из Европы. Полное сопровождение сделки от выбора до постановки на учёт. Более 50 довольных клиентов.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/zTpDhvGB/image-2026-02-11-13-33-25.png',
    },
    {
      firstName: 'Андрей',
      lastName: 'Рублев',
      position: 'Менеджер',
      description: 'Специализируюсь на подборе автомобилей из Германии. 5 лет опыта работы с европейскими аукционами. Более 80 успешных сделок под ключ.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/sMvzdtN/image-2026-02-11-13-37-54.png',
    },
    {
      firstName: 'Алексей',
      lastName: 'Лобанов',
      position: 'Менеджер',
      description: '3 года строю для клиентов комфортный путь к своему автомобилю. Более 50 машин под ключ, каждый этап — под моим контролем от А до Я.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/GvVr9fGn/image-2026-02-09-10-39-54.png',
    },
    {
      firstName: 'Сергей',
      lastName: 'Иванов',
      position: 'Менеджер',
      description: '5 лет в автоподборе. Эксперт по внедорожникам и кроссоверам. Помог приобрести более 80 автомобилей с европейских аукционов и дилеров.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/zzRMKDq/image-2026-02-09-10-40-43.png',
    },
    {
      firstName: 'Михаил',
      lastName: 'Попов',
      position: 'Менеджер',
      description: '4 года в сфере международных автоперевозок. Специализация — юридическое сопровождение и таможенное оформление. Более 65 успешных проектов.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/Gm3Jb7x/image-2026-02-09-10-41-01.png',
    },
    {
      firstName: 'Роман',
      lastName: 'Маслов',
      position: 'Менеджер',
      description: '5 лет в автоподборе. Работаю с проверенными партнёрами по всей Европе. Более 75 автомобилей доставлено и оформлено без скрытых проблем и рисков.',
      telegram: 'https://t.me/btatorg',
      image: 'https://i.ibb.co/8LC3N8fQ/image-2026-02-09-10-42-14.png',
    },
  ];


  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - УЛУЧШЕННЫЙ */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-sm font-semibold">👥 Команда экспертов</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              Наша команда
            </h1>

            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Профессионалы с многолетним опытом, которые помогут вам найти и купить идеальный автомобиль из Европы
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10</div>
                <div className="text-sm text-indigo-200">Экспертов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">7+</div>
                <div className="text-sm text-indigo-200">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">600+</div>
                <div className="text-sm text-indigo-200">Довольных клиентов</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Team Members Section - УЛУЧШЕННЫЙ */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-6 hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 group flex flex-col h-full overflow-hidden relative"
              >
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Avatar - УВЕЛИЧЕН */}
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden mb-6 mx-auto group-hover:scale-105 transition-all duration-500 shadow-2xl ring-4 ring-white group-hover:ring-indigo-200 z-10">
                  <Image
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    loading={index < 4 ? "eager" : "lazy"}
                    priority={index < 4}
                    quality={85}
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Info */}
                <div className="text-center mb-6 flex-grow relative z-10">
                  <h3 className="text-2xl font-bold mb-3 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {member.firstName} {member.lastName}
                  </h3>
                  <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full mb-4 shadow-md">
                    {member.position}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Telegram Contact - УЛУЧШЕННАЯ КНОПКА */}
                <div className="pt-6 border-t border-gray-200 mt-auto relative z-10">
                  <a
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#0088cc] to-[#0099dd] hover:from-[#0077b5] hover:to-[#0088cc] text-white py-4 px-6 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden"
                  >
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                    <Send className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10 text-lg">Связаться в Telegram</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Хотите присоединиться к нашей команде?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Мы всегда ищем талантливых и мотивированных специалистов, которые разделяют наши ценности и хотят развиваться в автомобильной индустрии
            </p>
            <a
              href="mailto:hr@btatorg.ru"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block"
            >
              Отправить резюме →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

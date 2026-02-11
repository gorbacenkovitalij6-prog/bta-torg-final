'use client';

import { motion } from 'framer-motion';

export function BrabusCrawler() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-800 to-slate-900 py-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            «БТА ТОРГ» — ВАШ НАДЁЖНЫЙ ПАРТНЁР
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            в покупке автомобиля из Европы.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Экономим ваше время. Защищаем ваши интересы. Доставляем уверенность.
          </p>
          <p className="text-sm text-gray-400 italic mb-8">
            Получите новое поступление авто, сделанное на заказ специально для вас (а не пропонем неактуальную прошлогоднюю базу на тысячи авто).
          </p>

          <button className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            Связаться с менеджером
          </button>
        </motion.div>
      </div>
    </section>
  );
}

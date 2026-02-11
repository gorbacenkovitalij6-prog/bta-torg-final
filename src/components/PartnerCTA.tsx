'use client';

import { motion } from 'framer-motion';

export function PartnerCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              «БТА ТОРГ» — ВАШ НАДЁЖНЫЙ ПАРТНЁР
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              в покупке автомобиля из Европы.
            </p>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
              Экономим ваше время. Защищаем ваши интересы. Доставляем уверенность.
            </p>
            <p className="text-sm text-blue-200 italic mb-8">
              Получите новое поступление авто, сделанное на заказ специально для вас (а не пропонем неактуальную прошлогоднюю базу на тысячи авто).
            </p>

            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Связаться с менеджером
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Globe, Calendar } from 'lucide-react';

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
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
              <span className="text-sm font-semibold">📞 Свяжитесь с нами</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              Контакты
            </h1>

            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Мы всегда на связи и готовы помочь вам найти идеальный автомобиль
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Phone */}
            <motion.a
              href="tel:+79001234567"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Телефон</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-2">+7 (900) 123-45-67</p>
                <p className="text-sm text-gray-500">Звоните с 9:00 до 21:00</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:info@btatorg.ru"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50 group-hover:to-emerald-50 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-lg font-bold text-green-600 mb-2">info@btatorg.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/79001234567"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50 group-hover:to-green-50 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">+7 (900) 123-45-67</p>
                <p className="text-sm text-gray-500">Быстрые ответы 24/7</p>
              </div>
            </motion.a>

            {/* Telegram */}
            <motion.a
              href="https://t.me/btatorg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50 group-hover:to-blue-50 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Telegram</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">@btatorg</p>
                <p className="text-sm text-gray-500">Онлайн консультации</p>
              </div>
            </motion.a>
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Address & Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Наш офис
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4 mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Адрес</h3>
                  <p className="text-gray-600 leading-relaxed">
                    г. Москва, ул. Примерная, д. 123<br />
                    БЦ "Автопремиум", офис 456
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-4">Режим работы</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Понедельник - Пятница</span>
                      <span className="font-bold text-gray-900">9:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Суббота - Воскресенье</span>
                      <span className="font-bold text-gray-900">10:00 - 19:00</span>
                    </div>
                    <div className="pt-3 border-t border-indigo-100">
                      <span className="text-indigo-600 font-semibold">💬 Онлайн консультации 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
                <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                  Оставьте заявку и получите консультацию эксперта в течение 15 минут
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span>Бесплатная консультация</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span>Подбор из 1000+ авто в Европе</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>Поддержка на всех этапах</span>
                  </div>
                </div>

                <a
                  href="tel:+79001234567"
                  className="block w-full bg-white text-indigo-600 text-center py-4 px-6 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Позвонить сейчас
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

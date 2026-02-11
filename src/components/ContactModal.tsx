'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 md:p-12 rounded-t-3xl relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-10 left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                    <span className="text-sm font-semibold">📞 Свяжитесь с нами</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
                  <p className="text-lg text-indigo-100">
                    Мы всегда на связи и готовы помочь вам найти идеальный автомобиль
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">Как с нами связаться</h3>

                    {/* Phone */}
                    <a
                      href="tel:+79001234567"
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Телефон</div>
                        <div className="text-lg text-indigo-600 font-semibold">+7 (900) 123-45-67</div>
                        <div className="text-sm text-gray-500">Звоните с 9:00 до 21:00</div>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:info@btatorg.ru"
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Email</div>
                        <div className="text-lg text-green-600 font-semibold">info@btatorg.ru</div>
                        <div className="text-sm text-gray-500">Ответим в течение 2 часов</div>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/79001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">WhatsApp</div>
                        <div className="text-lg text-green-600 font-semibold">+7 (900) 123-45-67</div>
                        <div className="text-sm text-gray-500">Быстрые ответы 24/7</div>
                      </div>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/btatorg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Telegram</div>
                        <div className="text-lg text-blue-600 font-semibold">@btatorg</div>
                        <div className="text-sm text-gray-500">Онлайн консультации</div>
                      </div>
                    </a>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">Дополнительная информация</h3>

                    {/* Address */}
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-2">Адрес офиса</div>
                          <div className="text-gray-600 leading-relaxed">
                            г. Москва, ул. Примерная, д. 123<br />
                            БЦ "Автопремиум", офис 456
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                      <div className="flex items-start gap-3 mb-4">
                        <Clock className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-3">Режим работы</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Пн - Пт:</span>
                              <span className="font-semibold text-gray-900">9:00 - 21:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Сб - Вс:</span>
                              <span className="font-semibold text-gray-900">10:00 - 19:00</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-indigo-100">
                              <span className="text-indigo-600 font-semibold">Онлайн консультации 24/7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl">
                      <h4 className="font-bold text-lg mb-2">Готовы начать?</h4>
                      <p className="text-indigo-100 text-sm mb-4">
                        Оставьте заявку и получите консультацию эксперта в течение 15 минут
                      </p>
                      <a
                        href="tel:+79001234567"
                        className="block w-full bg-white text-indigo-600 text-center py-3 px-6 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                      >
                        Позвонить сейчас
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

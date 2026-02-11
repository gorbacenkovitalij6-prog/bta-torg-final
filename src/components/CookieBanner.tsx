'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white max-w-2xl w-full p-8 relative shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-light uppercase tracking-wider mb-4">
          Для вашего удобства!
        </h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Мы используем файлы cookie, чтобы предоставить вам полный функционал сайта БТА ТОРГ, включая производительность, статистику
          и настройки местоположения. Чтобы в полной мере использовать наши услуги, нажмите &quot;Принять все&quot;, чтобы согласиться на использование
          файлов cookie. Для получения дополнительной информации ознакомьтесь с нашей Политикой конфиденциальности.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm uppercase tracking-wide">Required Cookies</span>
            <input type="checkbox" checked disabled className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm uppercase tracking-wide">Statistics</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm uppercase tracking-wide">Career</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm uppercase tracking-wide">Google Maps</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm uppercase tracking-wide">YouTube</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsVisible(false)}
            className="flex-1 bg-black text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Подтвердить выбор
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-1 bg-black text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}

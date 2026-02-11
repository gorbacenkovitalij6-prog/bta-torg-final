'use client';

import Link from 'next/link';
import { Instagram, Youtube, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-100 text-zinc-900 w-full border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand + description */}
          <div className="space-y-3">
            <div className="text-sm font-bold tracking-wider uppercase">БТА ТОРГ</div>
            <p className="text-sm leading-6 text-zinc-600">
              Мы создаём современную, индивидуальную роскошь, разрабатываем продукты, которые
              производят вау‑эффект и ставят наших клиентов в центр внимания.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">Обнаружить</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Тюнинг‑мастерская</Link></li>
              <li><Link href="#" className="hover:underline">Магазин модной одежды</Link></li>
              <li><Link href="#" className="hover:underline">Cars4Sale</Link></li>
              <li><Link href="#" className="hover:underline">Кто мы есть</Link></li>
              <li><Link href="#" className="hover:underline">Карьера</Link></li>
            </ul>
            <div className="mt-6">
              <h5 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-2">Версия по стране/языку</h5>
              <Link href="#" className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900">
                <Globe className="h-4 w-4" /> Международный – английский
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">Свяжитесь с нами</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Найдите дилера</Link></li>
              <li><Link href="#" className="hover:underline">Контакт</Link></li>
              <li><Link href="#" className="hover:underline">Отзыв и предъявление претензий</Link></li>
              <li><Link href="#" className="hover:underline">Защита бренда</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Выходные данные</Link></li>
              <li><Link href="#" className="hover:underline">Условия</Link></li>
              <li><Link href="#" className="hover:underline">Политика конфиденциальности</Link></li>
              <li><Link href="#" className="hover:underline">Настройки файлов cookie</Link></li>
              <li><Link href="#" className="hover:underline">Доступность</Link></li>
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3">Информационный бюллетень</h4>
            <p className="text-sm text-zinc-600 mb-3">
              Станьте частью сообщества БТА ТОРГ и подпишитесь на рассылку прямо сейчас!
            </p>
            <button className="w-full bg-black text-white text-[11px] tracking-[0.2em] uppercase py-3 hover:bg-zinc-800">
              Информационный бюллетень
            </button>

            <div className="mt-8">
              <h5 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3">Социальные сети</h5>
              <div className="flex items-center gap-4 text-zinc-600">
                <Link href="#" aria-label="Instagram" className="hover:text-zinc-900"><Instagram className="h-5 w-5" /></Link>
                <Link href="#" aria-label="YouTube" className="hover:text-zinc-900"><Youtube className="h-5 w-5" /></Link>
                <Link href="#" aria-label="LinkedIn" className="hover:text-zinc-900"><Linkedin className="h-5 w-5" /></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
          <p>— БТА ТОРГ 2017–2026</p>
          <p className="mt-2 md:mt-0">Международный – английский</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Когда прокручиваем больше 100vh (высота экрана), меняем стиль
      if (window.scrollY > window.innerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    setMenuOpen(false);
    router.push(href);
    // Сбрасываем состояние через небольшую задержку
    setTimeout(() => setIsNavigating(false), 500);
  };

  const menuItems = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'О нас', href: '/about' },
    { label: 'Команда', href: '/team' },
    { label: 'Как мы работаем', href: '#' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Админ', href: '/admin' },
  ];

  return (
    <>
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-pulse"></div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 max-w-[1920px] mx-auto">
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`hover:opacity-70 transition-all duration-300 ${
              isScrolled ? 'text-black' : 'text-gray-600'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-10 h-10" />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 group">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
            >
              <Image
                src="/images/logo.svg"
                alt="БТА ТОРГ"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:rotate-6"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest text-black"
            >
              БТА ТОРГ
            </motion.span>
          </Link>

          {/* Right: Icons */}
          <div className={`flex items-center space-x-5 transition-all duration-300 ${
            isScrolled ? 'text-black' : 'text-gray-600'
          }`}>
            <button className="hover:opacity-70 transition-opacity">
              <Globe className="w-9 h-9" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Side Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
              className="fixed left-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-gray-200">
                    <Image
                      src="/images/logo.svg"
                      alt="БТА ТОРГ"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-3xl font-bold tracking-widest">БТА ТОРГ</span>
                </motion.div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="w-10 h-10" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="px-6 py-8">
                <ul className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity block w-full text-left"
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="px-6 py-8 border-t border-gray-200 mt-8">
                <p className="text-sm uppercase text-gray-500 mb-4">Follow Us</p>
                <div className="flex space-x-5">
                  <a href="#" className="text-lg hover:opacity-70">Instagram</a>
                  <a href="#" className="text-lg hover:opacity-70">YouTube</a>
                  <a href="#" className="text-lg hover:opacity-70">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

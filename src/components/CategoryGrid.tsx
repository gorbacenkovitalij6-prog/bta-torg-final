'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const topCategory = {
  image: 'https://i.ibb.co/Wvm1dMFF/Gemini-Generated-Image-lcy56plcy56plcy5.jpg',
  title: 'ОТ 10 ДО 15 МЛН ₽',
  subtitle: 'Эксклюзивные автомобили премиум-класса',
  buttonText: 'СМОТРЕТЬ КАТАЛОГ',
};

const bottomCategories = [
  {
    image: 'https://i.ibb.co/N6jzXx53/Gemini-Generated-Image-4gy27j4gy27j4gy2.jpg',
    title: 'ОТ 5 ДО 10 МЛН ₽',
    subtitle: 'Премиум автомобили',
    buttonText: 'СМОТРЕТЬ КАТАЛОГ',
  },
  {
    image: 'https://i.ibb.co/HLFkzPS9/Gemini-Generated-Image-3op3m63op3m63op3.jpg',
    title: 'ОТ 1 ДО 5 МЛН ₽',
    subtitle: 'Комфортные седаны',
    buttonText: 'СМОТРЕТЬ КАТАЛОГ',
  },
  {
    image: 'https://i.ibb.co/jk5ynhqX/Gemini-Generated-Image-30ed7h30ed7h30ed.jpg',
    title: 'ДО 1 МЛН ₽',
    subtitle: 'Бюджетные варианты',
    buttonText: 'СМОТРЕТЬ КАТАЛОГ',
  },
];

export function CategoryGrid() {
  return (
    <section>
      {/* Top Category - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0">
          <Image
            src={topCategory.image}
            alt={topCategory.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center text-white px-6">
          <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-wider mb-2">
            {topCategory.title}
          </h3>
          <p className="text-lg lg:text-xl text-gray-200 mb-6">{topCategory.subtitle}</p>
          <button className="bg-white text-black px-8 py-3 text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors">
            {topCategory.buttonText}
          </button>
        </div>
      </motion.div>

      {/* Bottom Categories - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {bottomCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative h-[60vh] overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={90}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center text-white px-6">
              <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-2">
                {category.title}
              </h3>
              {category.subtitle && (
                <p className="text-lg text-gray-200 mb-6">{category.subtitle}</p>
              )}
              <button className="bg-white text-black px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors mt-4">
                {category.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const newsItems = [
  {
    image: 'https://ext.same-assets.com/1719477383/40709277.jpeg',
    title: 'Эксклюзивный доступ к миру премиум автомобилей',
    date: '03.02.2026',
    excerpt: 'В год 140-летия автомобиля, автолюбители могут рассчитывать на уникальные предложения...',
  },
  {
    image: 'https://ext.same-assets.com/1719477383/2583172295.jpeg',
    title: 'Смелость. Индивидуальность. 900 Superblack.',
    date: '02.02.2026',
    excerpt: 'Эта модель определяется вневременной черно-черной эстетикой премиум-класса...',
  },
  {
    image: 'https://ext.same-assets.com/1719477383/3133550902.jpeg',
    title: 'Обновление. Выделись. 900 MINT.',
    date: '02.02.2026',
    excerpt: 'Ожидание закончено. Впервые суперкар создан на базе Lamborghini, объединяя...',
  },
  {
    image: 'https://ext.same-assets.com/1719477383/1351466683.jpeg',
    title: 'БТА ТОРГ на FAT ICE RACE 2026 в Целль-ам-Зее',
    date: '30.01.2026',
    excerpt: 'Впервые БТА ТОРГ примет участие в FAT Ice Race 30 и 31 января 2026 года. Одна из...',
  },
];

export function LatestNews() {
  return (
    <section id="latest-news" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-light uppercase tracking-wider text-center mb-12 text-brabus-heading"
        >
          Последние новости
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.21, 0.45, 0.27, 0.9]
              }}
            >
              <Link href="#" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <h3 className="text-sm lg:text-base font-medium uppercase mb-2 tracking-wide group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  <span className="font-semibold">{item.date}</span> - {item.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Показать больше
          </button>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Individualization() {
  return (
    <section id="team-section" className="relative w-full h-[70vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white" />

      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.27, 0.9] }}
          >
            <h2 className="text-3xl lg:text-5xl font-light uppercase tracking-wider mb-4 text-brabus-heading">
              Наша команда профессионалов
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mb-8">
              Опытные специалисты с многолетним стажем помогут вам найти и купить автомобиль мечты из Европы
            </p>
            <Link href="/team" className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Познакомиться
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.45, 0.27, 0.9] }}
            className="relative h-[400px] hidden lg:block"
          >
            <Image
              src="/images/individualization.jpg"
              alt="Команда БТА ТОРГ"
              fill
              className="object-contain"
              loading="lazy"
              sizes="(max-width: 1024px) 0vw, 50vw"
              quality={85}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

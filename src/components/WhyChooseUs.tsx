'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Check, Shield, Award, Briefcase, Heart } from 'lucide-react';

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Создаём параллакс трансформации для каждого изображения
  const image1Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const image2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const image3Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const image4Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageTransforms = [image1Y, image2Y, image3Y, image4Y];

  const benefits = [
    {
      title: 'ПОЛНАЯ ЮРИДИЧЕСКАЯ БЕЗОПАСНОСТЬ',
      description: 'Ваш автомобиль будет ввезен и оформлен в РФ строго по закону — без рисков и скрытых проблем.',
      details: [
        'Точно то, что вы хотите',
        'Мы фиксируем все ваши требования в договоре: марка, комплектация, год, пробег, бюджет — и ищем именно такой автомобиль.',
      ],
      image: 'https://i.ibb.co/j7bF33G/photo-2026-02-03-13-15-49.jpg',
      icon: Shield,
    },
    {
      title: 'ЕВРОПЕЙСКОЕ КАЧЕСТВО — ПО РАЗУМНОЙ ЦЕНЕ',
      description: 'Используем лучшие предложения с автобирж Европы и 10-летних дилеров, чтобы вы купили европейское авто в рамках вашего бюджета.',
      image: 'https://i.ibb.co/SDhMNhxn/image.jpg',
      icon: Award,
    },
    {
      title: 'МЫ БЕРЁМ НА СЕБЯ ВСЁ СЛОЖНОЕ:',
      description: 'Поиск, бронирование, выкуп и доставка авто.',
      details: [
        'Комплексная диагностика + проверка истории и юридической чистоты.',
        'Поддержка на каждом этапе — от выбора до постановки на учет.',
      ],
      image: 'https://i.ibb.co/7JvYcVv1/Gemini-Generated-Image-o50b52o50b52o50b.jpg',
      icon: Briefcase,
    },
    {
      title: 'ВАМ ОСТАЁТСЯ ТОЛЬКО:',
      items: [
        'Описать желаемый автомобиль',
        'Выбрать способ оплаты',
        'Получить ключи — спокойно и без стресса',
      ],
      image: 'https://i.ibb.co/gL9gyGWZ/1.png',
      icon: Heart,
    },
  ];

  return (
    <section ref={sectionRef} id="about-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            ВЫБИРАЕТЕ АВТО - ОСТАЛЬНОЕ БЕРЁМ НА СЕБЯ
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="space-y-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2"
                style={{ y: imageTransforms[index] }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>

                {benefit.details && (
                  <div className="space-y-3">
                    {benefit.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}

                {benefit.items && (
                  <div className="space-y-3">
                    {benefit.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

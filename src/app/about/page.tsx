'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Shield, Award, Users, Globe, TrendingUp, Heart, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Надежность',
      description: 'Мы гарантируем юридическую чистоту каждого автомобиля и прозрачность всех сделок',
    },
    {
      icon: Heart,
      title: 'Забота о клиентах',
      description: 'Индивидуальный подход к каждому клиенту и поддержка на всех этапах покупки',
    },
    {
      icon: Target,
      title: 'Профессионализм',
      description: 'Команда экспертов с многолетним опытом работы на европейском рынке',
    },
    {
      icon: Zap,
      title: 'Оперативность',
      description: 'Быстрый подбор автомобиля и организация доставки в кратчайшие сроки',
    },
  ];

  const achievements = [
    { number: '10+', label: 'лет на рынке', icon: TrendingUp },
    { number: '500+', label: 'довольных клиентов', icon: Users },
    { number: '50+', label: 'марок автомобилей', icon: Globe },
    { number: '98%', label: 'повторных обращений', icon: Award },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">О компании БТА ТОРГ</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Мы помогаем россиянам приобретать качественные автомобили из Европы по справедливым ценам уже более 10 лет
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>БТА ТОРГ</strong> была основана в 2014 году группой энтузиастов, влюбленных в автомобили и стремящихся сделать покупку европейских авто доступной для каждого россиянина.
                </p>
                <p>
                  Начав с небольшого офиса в Москве и команды из 3 человек, мы выросли в крупную компанию с представительствами в Германии, Бельгии и Нидерландах. За это время мы помогли более 500 клиентам стать владельцами автомобилей их мечты.
                </p>
                <p>
                  Сегодня мы - это команда профессионалов, которая знает все тонкости европейского рынка, таможенного оформления и регистрации автомобилей в России. Мы гордимся тем, что 98% наших клиентов обращаются к нам повторно или рекомендуют нас своим друзьям.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-7xl font-bold mb-4">10+</div>
                  <div className="text-2xl">лет успешной работы</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Наши ценности</h2>
            <p className="text-lg text-gray-600">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Наши достижения</h2>
            <p className="text-lg text-gray-600">
              Цифры, которыми мы гордимся
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl"
              >
                <achievement.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-700 font-medium">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Сделать покупку качественного европейского автомобиля простой, прозрачной и доступной для каждого россиянина. Мы стремимся не просто продавать автомобили, а помогать людям осуществлять их мечты о идеальном транспорте.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link
                href="/#contact"
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Начать сотрудничество →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

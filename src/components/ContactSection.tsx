'use client';

import { motion } from 'framer-motion';

export function ContactSection() {
  return (
    <section className="py-20 lg:py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-light uppercase tracking-wider mb-6">
            Остались вопросы?
          </h2>
          <p className="text-sm lg:text-base text-gray-300 mb-12">
            Свяжитесь с нами, и наши специалисты помогут вам найти идеальный автомобиль
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Ваш email"
            className="px-6 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Отправить
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

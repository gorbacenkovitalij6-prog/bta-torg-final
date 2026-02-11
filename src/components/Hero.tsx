'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
}

const colors = ['#f967fb', '#53bc28', '#6958d5', '#83f36e', '#fe8a2e', '#ff008a', '#60aed5'];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Create new particles at mouse position
      const newParticles: Particle[] = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 15 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        });
      }

      particlesRef.current = [...particlesRef.current, ...newParticles].slice(-150); // Keep last 150 particles
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particlesRef.current = particlesRef.current
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: particle.opacity - 0.02,
          size: particle.size * 0.98,
        }))
        .filter(particle => particle.opacity > 0);

      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      {/* YouTube Video Background */}
      <div className="absolute inset-0">
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            transform: 'scale(1.5)',
          }}
          src="https://www.youtube.com/embed/L9_Qdsd67X0?autoplay=1&mute=1&loop=1&playlist=L9_Qdsd67X0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Hero Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Interactive Canvas for Mouse Trail */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Gradient Overlay for fade effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-20" />

      {/* Content with Parallax */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center text-white px-6 pointer-events-none z-30"
        style={{ opacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl lg:text-6xl xl:text-7xl font-light uppercase tracking-widest mb-6 text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
        >
          The Next Frontier.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm lg:text-base uppercase tracking-wider mb-8 opacity-90 drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
        >
          БТА ТОРГ - Автомобили из Германии
        </motion.p>

        {/* Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6 pointer-events-auto"
        >
          <motion.a
            href="https://t.me/btatorg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#0088cc] to-[#0099dd] text-white px-8 py-4 text-sm uppercase tracking-wider rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            Связаться в Telegram
          </motion.a>

          <motion.a
            href="tel:+79001234567"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 text-sm uppercase tracking-wider rounded-lg border border-white/50 hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +7 (900) 123-45-67
          </motion.a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white/10 backdrop-blur-md text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 border border-white/50 pointer-events-auto shadow-lg hover:shadow-xl"
        >
          Узнать больше
        </motion.button>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm w-full z-40">
        <div className="flex justify-between items-center w-full px-2 sm:px-4 md:px-6 py-3 md:py-4">
          <a
            href="#latest-news"
            className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity flex-1 text-center px-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Каталог
          </a>
          <a
            href="#team-section"
            className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity flex-1 text-center px-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Команда
          </a>
          <a
            href="#about-us"
            className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity flex-1 text-center px-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            О нас
          </a>
          <a
            href="#reviews-section"
            className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity flex-1 text-center px-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Отзывы
          </a>
        </div>
      </div>


    </section>
  );
}

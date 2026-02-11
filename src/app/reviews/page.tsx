'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Star, ThumbsUp, TrendingUp, Award, X, Play, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const videoReviews = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    rutubeUrl: 'https://rutube.ru/video/455e0d9155c82f6b3cb07b0695dca17c/',
    thumbnail: 'https://pic.rutube.ru/video/45/5e/455e0d9155c82f6b3cb07b0695dca17c.jpg',
    date: 'Январь 2024',
    rating: 5,
  },
  {
    id: 2,
    name: 'Дмитрий Козлов',
    rutubeUrl: 'https://rutube.ru/video/7e7a45995116386e3ef5b30de66df99a/',
    thumbnail: 'https://pic.rutube.ru/video/7e/7a/7e7a45995116386e3ef5b30de66df99a.jpg',
    date: 'Декабрь 2023',
    rating: 5,
  },
  {
    id: 3,
    name: 'Сергей Петров',
    rutubeUrl: 'https://rutube.ru/video/9b8b9062f36f3cddcccd89fff0c21b9e/',
    thumbnail: 'https://pic.rutube.ru/video/9b/8b/9b8b9062f36f3cddcccd89fff0c21b9e.jpg',
    date: 'Ноябрь 2023',
    rating: 5,
  },
  {
    id: 4,
    name: 'Михаил Васильев',
    rutubeUrl: 'https://rutube.ru/shorts/e2f6aa6941bfd3e080d3c80d6d7a7279/',
    thumbnail: 'https://pic.rutube.ru/video/e2/f6/e2f6aa6941bfd3e080d3c80d6d7a7279.jpg',
    date: 'Октябрь 2023',
    rating: 5,
  },
  {
    id: 5,
    name: 'Андрей Соколов',
    rutubeUrl: 'https://rutube.ru/shorts/9b915ceae504bfe0e6eaadea600e8dbe/',
    thumbnail: 'https://pic.rutube.ru/video/9b/91/9b915ceae504bfe0e6eaadea600e8dbe.jpg',
    date: 'Сентябрь 2023',
    rating: 5,
  },
  {
    id: 6,
    name: 'Игорь Новиков',
    rutubeUrl: 'https://rutube.ru/shorts/90229e285e4a3ee5c7d829e8e28fad93/',
    thumbnail: 'https://pic.rutube.ru/video/90/22/90229e285e4a3ee5c7d829e8e28fad93.jpg',
    date: 'Август 2023',
    rating: 5,
  },
  {
    id: 7,
    name: 'Владимир Петров',
    rutubeUrl: 'https://rutube.ru/shorts/d039f3e54ae488dcaa4639e676f83135/',
    thumbnail: 'https://pic.rutube.ru/video/d0/39/d039f3e54ae488dcaa4639e676f83135.jpg',
    date: 'Июль 2023',
    rating: 5,
  },
  {
    id: 8,
    name: 'Александр Иванов',
    rutubeUrl: 'https://rutube.ru/shorts/5dea38a3f4da12e6104277ecd13befa2/',
    thumbnail: 'https://pic.rutube.ru/video/5d/ea/5dea38a3f4da12e6104277ecd13befa2.jpg',
    date: 'Июнь 2023',
    rating: 5,
  },
  {
    id: 9,
    name: 'Евгений Морозов',
    rutubeUrl: 'https://rutube.ru/shorts/88bcef636fa501885004f94d2270fa50/',
    thumbnail: 'https://pic.rutube.ru/video/88/bc/88bcef636fa501885004f94d2270fa50.jpg',
    date: 'Май 2023',
    rating: 5,
  },
  {
    id: 10,
    name: 'Николай Федоров',
    rutubeUrl: 'https://rutube.ru/shorts/1a44b9731e7f3a26f6292974deaed136/',
    thumbnail: 'https://pic.rutube.ru/video/1a/44/1a44b9731e7f3a26f6292974deaed136.jpg',
    date: 'Апрель 2023',
    rating: 5,
  },
  {
    id: 11,
    name: 'Олег Сидоров',
    rutubeUrl: 'https://rutube.ru/shorts/d581d517df387ffb83667dd2ecae0f3e/',
    thumbnail: 'https://pic.rutube.ru/video/d5/81/d581d517df387ffb83667dd2ecae0f3e.jpg',
    date: 'Март 2023',
    rating: 5,
  },
  {
    id: 12,
    name: 'Максим Кузнецов',
    rutubeUrl: 'https://rutube.ru/shorts/e3d94e12a3f8af12f4badf86dc8041f1/',
    thumbnail: 'https://pic.rutube.ru/video/e3/d9/e3d94e12a3f8af12f4badf86dc8041f1.jpg',
    date: 'Февраль 2023',
    rating: 5,
  },
  {
    id: 13,
    name: 'Виктор Лебедев',
    rutubeUrl: 'https://rutube.ru/shorts/7c6ea745580093668706b1985ac46501/',
    thumbnail: 'https://pic.rutube.ru/video/7c/6e/7c6ea745580093668706b1985ac46501.jpg',
    date: 'Январь 2023',
    rating: 5,
  },
  {
    id: 14,
    name: 'Артём Волков',
    rutubeUrl: 'https://rutube.ru/shorts/a2c1d3c46fd58410ced04dad8fff9495/',
    thumbnail: 'https://pic.rutube.ru/video/a2/c1/a2c1d3c46fd58410ced04dad8fff9495.jpg',
    date: 'Декабрь 2022',
    rating: 5,
  },
  {
    id: 15,
    name: 'Денис Павлов',
    rutubeUrl: 'https://rutube.ru/shorts/f4392c4a9c279e14f0927306d02fd8b9/',
    thumbnail: 'https://pic.rutube.ru/video/f4/39/f4392c4a9c279e14f0927306d02fd8b9.jpg',
    date: 'Ноябрь 2022',
    rating: 5,
  },
  {
    id: 16,
    name: 'Роман Егоров',
    rutubeUrl: 'https://rutube.ru/shorts/84ede9117482e7e5759373fb053ada71/',
    thumbnail: 'https://pic.rutube.ru/video/84/ed/84ede9117482e7e5759373fb053ada71.jpg',
    date: 'Октябрь 2022',
    rating: 5,
  },
  {
    id: 17,
    name: 'Константин Медведев',
    rutubeUrl: 'https://rutube.ru/shorts/281187469e76485cfb3ef070f8265d98/',
    thumbnail: 'https://pic.rutube.ru/video/28/11/281187469e76485cfb3ef070f8265d98.jpg',
    date: 'Сентябрь 2022',
    rating: 5,
  },
];

const photoReviews = [
  { id: 1, image: 'https://i.ibb.co/Ngv90yR0/photo-2026-02-09-13-25-34.jpg', name: 'Олег Морозов', text: 'Супер команда!' },
  { id: 2, image: 'https://i.ibb.co/b54qHyGQ/photo-2025-12-18-11-35-12-2.jpg', name: 'Кирилл Волков', text: 'Рекомендую!' },
  { id: 3, image: 'https://i.ibb.co/spFFLSPK/photo-2026-02-09-13-24-52.jpg', name: 'Дмитрий Козлов', text: 'Всё прошло отлично!' },
  { id: 4, image: 'https://i.ibb.co/TDXbhZv8/photo-2026-02-09-13-26-04.jpg', name: 'Роман Егоров', text: 'Очень доволен' },
  { id: 5, image: 'https://i.ibb.co/fd7mf7Wx/photo-2025-12-18-11-35-13.jpg', name: 'Виктор Орлов', text: 'Молодцы!' },
  { id: 6, image: 'https://i.ibb.co/vvwLtkLN/photo-2026-01-14-12-40-43.jpg', name: 'Алексей Смирнов', text: 'Профессионалы своего дела' },
  { id: 7, image: 'https://i.ibb.co/HLsywrZd/photo-2026-02-09-13-26-28.jpg', name: 'Павел Лебедев', text: 'Спасибо большое!' },
  { id: 8, image: 'https://i.ibb.co/1YjHYHNZ/photo-2026-02-09-13-25-39.jpg', name: 'Максим Белов', text: 'Всё на высшем уровне' },
  { id: 9, image: 'https://i.ibb.co/GvdbPzXd/photo-2025-12-18-11-35-12.jpg', name: 'Станислав Попов', text: 'Отлично!' },
  { id: 10, image: 'https://i.ibb.co/d4vcCd7g/photo-2026-02-09-13-25-30.jpg', name: 'Николай Федоров', text: 'Доволен результатом!' },
  { id: 11, image: 'https://i.ibb.co/CswKx51q/photo-2026-01-14-12-39-54.jpg', name: 'Иван Петров', text: 'Отличный сервис!' },
  { id: 12, image: 'https://i.ibb.co/RGmGcwf9/photo-2026-02-09-13-24-55.jpg', name: 'Михаил Васильев', text: 'Быстро и качественно' },
  { id: 13, image: 'https://i.ibb.co/Txbfw3pK/photo-2025-12-18-11-35-13-2.jpg', name: 'Евгений Соловьев', text: 'Всё супер!' },
  { id: 14, image: 'https://i.ibb.co/5hrf3PSP/photo-2026-02-09-13-25-15.jpg', name: 'Владимир Новиков', text: 'Лучшие в своём деле' },
  { id: 15, image: 'https://i.ibb.co/SDn5c072/photo-2026-01-14-12-40-23.jpg', name: 'Анна Светличная', text: 'Рекомендую всем!' },
  { id: 16, image: 'https://i.ibb.co/4wW9N8Qn/photo-2026-02-09-13-25-51.jpg', name: 'Артур Павлов', text: 'Отличная работа!' },
  { id: 17, image: 'https://i.ibb.co/zVLvLq0w/photo-2026-02-09-13-24-59.jpg', name: 'Андрей Соколов', text: 'Спасибо за помощь!' },
  { id: 18, image: 'https://i.ibb.co/HpGcxtjd/photo-2026-02-09-13-26-21.jpg', name: 'Денис Кузнецов', text: 'Профессионалы!' },
  { id: 19, image: 'https://i.ibb.co/CswKx51q/photo-2026-01-14-12-39-54.jpg', name: 'Антон Медведев', text: 'Благодарю!' },
  { id: 20, image: 'https://i.ibb.co/Ngv90yR0/photo-2026-02-09-13-25-34.jpg', name: 'Ярослав Королев', text: 'Рекомендую!' },
  { id: 21, image: 'https://i.ibb.co/b54qHyGQ/photo-2025-12-18-11-35-12-2.jpg', name: 'Борис Громов', text: 'Всё на уровне!' },
  { id: 22, image: 'https://i.ibb.co/TDXbhZv8/photo-2026-02-09-13-26-04.jpg', name: 'Матвей Комаров', text: 'Благодарю!' },
  { id: 23, image: 'https://i.ibb.co/fd7mf7Wx/photo-2025-12-18-11-35-13.jpg', name: 'Филипп Захаров', text: 'Спасибо!' },
  { id: 24, image: 'https://i.ibb.co/1YjHYHNZ/photo-2026-02-09-13-25-39.jpg', name: 'Константин Белов', text: 'Отлично!' },
  { id: 25, image: 'https://i.ibb.co/vvwLtkLN/photo-2026-01-14-12-40-43.jpg', name: 'Валерий Гусев', text: 'Отлично!' },
  { id: 26, image: 'https://i.ibb.co/HLsywrZd/photo-2026-02-09-13-26-28.jpg', name: 'Леонид Фролов', text: 'Молодцы!' },
  { id: 27, image: 'https://i.ibb.co/GvdbPzXd/photo-2025-12-18-11-35-12.jpg', name: 'Игорь Зайцев', text: 'Всё отлично!' },
  { id: 28, image: 'https://i.ibb.co/d4vcCd7g/photo-2026-02-09-13-25-30.jpg', name: 'Тимур Семенов', text: 'Супер сервис!' },
  { id: 29, image: 'https://i.ibb.co/Txbfw3pK/photo-2025-12-18-11-35-13-2.jpg', name: 'Глеб Крылов', text: 'Спасибо!' },
  { id: 30, image: 'https://i.ibb.co/SDn5c072/photo-2026-01-14-12-40-23.jpg', name: 'Егор Титов', text: 'Всё супер!' },
];

const stats = [
  {
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-500" />,
    label: 'Рейтинг 5.0',
    value: '5.0',
  },
  {
    icon: <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-500" />,
    label: 'Довольных клиентов',
    value: '1000+',
  },
  {
    icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-500" />,
    label: 'Видеоотзывов',
    value: videoReviews.length,
  },
];

export default function ReviewsPage() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoScrollPosition, setPhotoScrollPosition] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const videosPerPage = 12;

  // Обработка клавиши ESC для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo !== null) {
        setSelectedVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  // Блокировка прокрутки страницы когда открыто модальное окно
  useEffect(() => {
    if (selectedVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  // Клавиатурное управление для карусели фотоотзывов
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo !== null) return; // Не работаем если открыто модальное окно

      if (e.key === 'ArrowLeft') {
        if (isPhotoExpanded) {
          setIsPhotoExpanded(false);
          setTimeout(() => {
            setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
            setTimeout(() => setIsPhotoExpanded(true), 300);
          }, 500);
        } else {
          setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
          setIsPhotoExpanded(true);
        }
      } else if (e.key === 'ArrowRight') {
        if (isPhotoExpanded) {
          setIsPhotoExpanded(false);
          setTimeout(() => {
            setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
            setTimeout(() => setIsPhotoExpanded(true), 300);
          }, 500);
        } else {
          setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
          setIsPhotoExpanded(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPhotoIndex, isPhotoExpanded, selectedVideo]);

  const totalPages = Math.ceil(videoReviews.length / videosPerPage);

  const paginatedVideos = videoReviews.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        <div className="mb-4 md:mb-6 flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Отзывы клиентов</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 max-w-3xl">
              Реальные видеоотзывы наших клиентов о покупке автомобилей с пробегом.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white rounded-lg shadow px-3 sm:px-4 md:px-6 py-3 md:py-4 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] flex-1 sm:flex-none"
                >
                  <div className="flex-shrink-0">{stat.icon}</div>
                  <div className="ml-2 sm:ml-3 min-w-0">
                    <div className="text-base sm:text-lg md:text-xl font-semibold truncate">{stat.value}</div>
                    <div className="text-gray-500 text-xs sm:text-sm leading-tight">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Photo Reviews Stack Carousel (desktop only) */}
          <div className="hidden xl:block relative flex-shrink-0">
            <motion.div
              className="h-[300px] w-[500px] relative cursor-grab active:cursor-grabbing touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={(e, info) => {
                setDragStartX(info.point.x);
              }}
              onDragEnd={(e, info) => {
                const dragDistance = info.point.x - dragStartX;
                const swipeThreshold = 50;

                if (Math.abs(dragDistance) > swipeThreshold) {
                  if (dragDistance > 0) {
                    // Свайп вправо - предыдущая карточка
                    if (isPhotoExpanded) {
                      setIsPhotoExpanded(false);
                      setTimeout(() => {
                        setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
                        setTimeout(() => setIsPhotoExpanded(true), 300);
                      }, 500);
                    } else {
                      setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
                      setIsPhotoExpanded(true);
                    }
                  } else {
                    // Свайп влево - следующая карточка
                    if (isPhotoExpanded) {
                      setIsPhotoExpanded(false);
                      setTimeout(() => {
                        setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
                        setTimeout(() => setIsPhotoExpanded(true), 300);
                      }, 500);
                    } else {
                      setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
                      setIsPhotoExpanded(true);
                    }
                  }
                }
              }}
            >
              {/* Stack of cards */}
              <div className="relative h-full w-full flex items-center justify-center pointer-events-none">
                {photoReviews.map((photo, idx) => {
                  const offset = idx - currentPhotoIndex;
                  const isCenter = offset === 0;
                  const isLeft = offset < 0 && offset >= -2;
                  const isRight = offset > 0 && offset <= 2;
                  const isVisible = isCenter || isLeft || isRight;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={photo.id}
                      className="absolute w-56"
                      initial={false}
                      animate={{
                        x: isCenter ? 0 : offset * 80,
                        y: isCenter && isPhotoExpanded ? -20 : 0,
                        scale: isCenter && isPhotoExpanded ? 1.35 : isCenter ? 1 : 0.85,
                        zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                        opacity: isCenter ? 1 : 0.5,
                        rotateY: isCenter ? 0 : offset * -5,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1],
                        opacity: { duration: 0.3 }
                      }}
                      whileHover={isCenter ? { y: -25 } : {}}
                    >
                      <motion.div
                        className="bg-white rounded-xl overflow-hidden cursor-pointer pointer-events-auto"
                        onClick={() => {
                          if (isCenter) {
                            setIsPhotoExpanded(!isPhotoExpanded);
                          }
                        }}
                        animate={{
                          boxShadow: isCenter && isPhotoExpanded
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
                            : isCenter
                            ? '0 20px 40px -12px rgba(0, 0, 0, 0.25)'
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={photo.image}
                            alt={`Отзыв ${photo.name}`}
                            fill
                            sizes="(min-width: 1280px) 224px, 33vw"
                            className="object-cover"
                            loading={isVisible ? "eager" : "lazy"}
                            priority={isCenter}
                            quality={85}
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                            animate={{
                              opacity: isCenter ? 1 : 0.7
                            }}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 p-4 text-white"
                            animate={{
                              y: isCenter && isPhotoExpanded ? 0 : 10,
                              opacity: isCenter && isPhotoExpanded ? 1 : 0.9
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="font-bold text-base truncate">{photo.name}</div>
                            <div className="text-sm opacity-90 truncate">{photo.text}</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <div className="flex items-center justify-center gap-6 mt-12">
              <motion.button
                className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all z-10"
                aria-label="Прокрутить влево"
                whileHover={{ scale: 1.1, x: -2, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isPhotoExpanded) {
                    setIsPhotoExpanded(false);
                    setTimeout(() => {
                      setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
                      setTimeout(() => setIsPhotoExpanded(true), 300);
                    }, 500);
                  } else {
                    setCurrentPhotoIndex((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
                    setIsPhotoExpanded(true);
                  }
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all z-10"
                aria-label="Прокрутить вправо"
                whileHover={{ scale: 1.1, x: 2, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isPhotoExpanded) {
                    setIsPhotoExpanded(false);
                    setTimeout(() => {
                      setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
                      setTimeout(() => setIsPhotoExpanded(true), 300);
                    }, 500);
                  } else {
                    setCurrentPhotoIndex((prev) => (prev + 1) % photoReviews.length);
                    setIsPhotoExpanded(true);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 mt-8">Видеоотзывы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedVideos.map((video) => (
            <motion.div
              key={video.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer relative group"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={`Превью видео ${video.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading={video.id <= 4 ? "eager" : "lazy"}
                  priority={video.id <= 4}
                  quality={85}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base truncate">{video.name}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: video.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">{video.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Следующая страница"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative mx-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 sm:-right-12 p-3 rounded-full bg-white hover:bg-gray-100 shadow-lg z-50 transition-all hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVideo(null);
                  }}
                  aria-label="Закрыть"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
                <div className="aspect-video w-full relative rounded-t-lg overflow-hidden">
                  <iframe
                    src={
                      (() => {
                        const video = videoReviews.find((v) => v.id === selectedVideo);
                        if (!video) return '';
                        // Rutube embed url
                        const match = video.rutubeUrl.match(/\/([a-f0-9]{32,})\//);
                        const id = match ? match[1] : '';
                        return id
                          ? `https://rutube.ru/play/embed/${id}`
                          : video.rutubeUrl;
                      })()
                    }
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  {(() => {
                    const video = videoReviews.find((v) => v.id === selectedVideo);
                    if (!video) return null;
                    return (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base md:text-lg">{video.name}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: video.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 mb-3">{video.date}</div>
                        <Link
                          href={video.rutubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-sm sm:text-base text-blue-600 hover:underline"
                        >
                          Смотреть на Rutube
                        </Link>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Фотоотзывы (пример, если есть) */}
        {/* <h2 className="text-2xl font-semibold mt-12 mb-4">Фотоотзывы</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {photoReviews.map((photo, idx) => (
            <div key={idx} className="min-w-[200px]">
              <Image src={photo.url} alt={photo.name} width={200} height={120} className="rounded-lg" />
              <div className="text-sm mt-2">{photo.name}</div>
            </div>
          ))}
        </div> */}
      </main>
      <Footer />
    </div>
  );
}

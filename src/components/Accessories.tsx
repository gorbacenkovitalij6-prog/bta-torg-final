'use client';

const accessories = [
  {
    image: 'https://i.ibb.co/Ngv90yR0/photo-2026-02-09-13-25-34.jpg',
    name: 'Алексей Иванов',
    review: 'Получил свой автомобиль через БТА ТОРГ. Весь процесс занял 3 недели. Машина в идеальном состоянии, все документы в порядке. Рекомендую!'
  },
  {
    image: 'https://i.ibb.co/b54qHyGQ/photo-2025-12-18-11-35-12-2.jpg',
    name: 'Дмитрий Смирнов',
    review: 'Спасибо команде за отличный автомобиль! Полностью укомплектован, пробег как в объявлении. Цена ниже рынка на 15%.'
  },
  {
    image: 'https://i.ibb.co/spFFLSPK/photo-2026-02-09-13-24-52.jpg',
    name: 'Анна Светличная',
    review: 'Взял машину из Германии. Ребята помогли с растаможкой и доставкой. Всё прозрачно, без скрытых платежей. Супер!'
  },
  {
    image: 'https://i.ibb.co/TDXbhZv8/photo-2026-02-09-13-26-04.jpg',
    name: 'Михаил Козлов',
    review: 'Мой автомобиль приехал быстрее обещанного срока. Качество европейское, никаких проблем при постановке на учёт.'
  },
  {
    image: 'https://i.ibb.co/fd7mf7Wx/photo-2025-12-18-11-35-13.jpg',
    name: 'Андрей Новиков',
    review: 'Машина моей мечты! БТА ТОРГ нашли именно ту комплектацию, которую я хотел. Профессионалы своего дела!'
  },
  {
    image: 'https://i.ibb.co/vvwLtkLN/photo-2026-01-14-12-40-43.jpg',
    name: 'Лариса Горбаченко',
    review: 'Купил семейный внедорожник. Отличная цена, быстрая доставка, полное сопровождение. Очень доволен!'
  },
  {
    image: 'https://i.ibb.co/HLsywrZd/photo-2026-02-09-13-26-28.jpg',
    name: 'Игорь Федоров',
    review: 'Автомобиль 2020 года в идеале! Ребята провели полную диагностику перед отправкой. Можно доверять!'
  },
  {
    image: 'https://i.ibb.co/1YjHYHNZ/photo-2026-02-09-13-25-39.jpg',
    name: 'Павел Морозов',
    review: 'Заказывал пикап из Германии. Весь процесс отслеживался онлайн. Получил машину мечты по честной цене!'
  },
  {
    image: 'https://i.ibb.co/GvdbPzXd/photo-2025-12-18-11-35-12.jpg',
    name: 'Виктория Троман',
    review: 'Премиальный внедорожник из Германии - это реальность! Спасибо БТА ТОРГ за профессионализм и честность.'
  },
  {
    image: 'https://i.ibb.co/CswKx51q/photo-2026-01-14-12-39-54.jpg',
    name: 'Роман Григорьев',
    review: 'Мечта сбылась! Прозрачные условия, быстрая работа, европейское качество. Рекомендую всем!'
  },
  {
    image: 'https://i.ibb.co/RGmGcwf9/photo-2026-02-09-13-24-55.jpg',
    name: 'Артём Волков',
    review: 'Автомобиль 2022 года в топовой комплектации. Сэкономил около 300 тысяч по сравнению с местными дилерами!'
  },
  {
    image: 'https://i.ibb.co/Txbfw3pK/photo-2025-12-18-11-35-13-2.jpg',
    name: 'Евгений Кузнецов',
    review: 'Машина приехала быстро и в отличном состоянии. Полный пакет документов, никаких проблем. Спасибо!'
  },
  {
    image: 'https://i.ibb.co/5hrf3PSP/photo-2026-02-09-13-25-15.jpg',
    name: 'Николай Павлов',
    review: 'Кроссовер для путешествий - идеальный вариант! БТА ТОРГ помогли найти лучшее предложение на рынке.'
  },
  {
    image: 'https://i.ibb.co/SDn5c072/photo-2026-01-14-12-40-23.jpg',
    name: 'Виктор Семёнов',
    review: 'Купил большой внедорожник. Весь процесс под контролем, постоянная связь с менеджером. Очень доволен!'
  },
  {
    image: 'https://i.ibb.co/4wW9N8Qn/photo-2026-02-09-13-25-51.jpg',
    name: 'Денис Орлов',
    review: 'Автомобиль в максимальной комплектации. Цена честная, машина как новая. Буду рекомендовать друзьям!'
  },
  {
    image: 'https://i.ibb.co/zVLvLq0w/photo-2026-02-09-13-24-59.jpg',
    name: 'Максим Егоров',
    review: 'Большой внедорожник для семьи. Ребята нашли идеальный вариант за разумные деньги. Профессионалы!'
  },
  {
    image: 'https://i.ibb.co/HpGcxtjd/photo-2026-02-09-13-26-21.jpg',
    name: 'Станислав Белов',
    review: 'Легендарный внедорожник! Спасибо БТА ТОРГ за помощь в покупке автомобиля мечты из Европы!'
  },
];

export function Accessories() {
  const total = accessories.length;

  return (
    <section
      id="reviews-section"
      className="py-16 lg:py-24 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-light uppercase tracking-wider mb-2 text-gray-900">
          Отзывы наших клиентов
        </h2>
        <p className="text-sm lg:text-base text-gray-600">РЕАЛЬНЫЕ ИСТОРИИ УСПЕХА</p>
      </div>

      <div className="carousel-track" style={{ height: '580px' }}>
        {accessories.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={
              {
                '--i': index + 1,
                '--total': total,
                '--time': '60s',
              } as React.CSSProperties
            }
          >
            <div className="card-content">
              <img src={item.image} alt={item.name} />
              <div className="card-info">
                <h3 className="customer-name">{item.name}</h3>
                <p className="customer-review">{item.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .carousel-track {
          position: relative;
          min-width: calc(160px * var(--total, 18));
          margin: 0 auto;
        }

        .carousel-item {
          position: absolute;
          width: 420px;
          height: 580px;
          left: 100%;
          display: flex;
          justify-content: center;
          perspective: 1000px;
          transform-style: preserve-3d;
          animation: scroll-left var(--time, 60s) linear infinite;
          animation-delay: calc(
            var(--time, 60s) / var(--total, 18) * (var(--i, 1) - 1) - var(--time, 60s)
          );
          will-change: left;
          transition: 0.5s ease-in-out;
          cursor: pointer;
        }

        .card-content {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          transform: rotateY(-45deg);
          transition: 0.5s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .carousel-item:hover .card-content {
          transform: rotateY(0deg) translateY(-16px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        }

        .carousel-item img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .card-info {
          padding: 20px;
          background: linear-gradient(to bottom, white, #f9fafb);
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .customer-name {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          text-align: center;
        }

        .customer-review {
          font-size: 13px;
          line-height: 1.6;
          color: #6b7280;
          text-align: center;
        }

        @keyframes scroll-left {
          to {
            left: -4800px;
          }
        }

        @media (max-width: 768px) {
          .carousel-item {
            width: 320px;
            height: 480px;
          }

          .carousel-item img {
            height: 300px;
          }

          .carousel-track {
            height: 480px;
          }

          .card-info {
            padding: 16px;
          }

          .customer-name {
            font-size: 16px;
          }

          .customer-review {
            font-size: 12px;
          }

          @keyframes scroll-left {
            to {
              left: -3500px;
            }
          }
        }
      `}</style>
    </section>
  );
}

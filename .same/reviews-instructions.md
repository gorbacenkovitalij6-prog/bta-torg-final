# Инструкция по добавлению видео и фото отзывов

## 📹 Как добавить видео с Rutube

### Шаг 1: Получите embed-код видео
1. Откройте ваше видео на Rutube
2. Нажмите кнопку "Поделиться" → "Встроить"
3. Скопируйте iframe код

Пример кода:
```html
<iframe width="720" height="405" src="https://rutube.ru/play/embed/ваш_id" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
```

### Шаг 2: Добавьте ссылки в файл
Откройте файл: `src/app/reviews/page.tsx`

Найдите массив `videoReviews` (строка ~11) и измените ссылки:

```typescript
const videoReviews = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    car: 'Mercedes-Benz E-Class 2020',
    rutubeUrl: 'https://rutube.ru/play/embed/ВАШ_ID_ВИДЕО', // 👈 Замените на ваш ID
    thumbnail: '🎥',
    date: 'Январь 2024',
    rating: 5,
  },
  // ... остальные видео
];
```

### Шаг 3: Вставьте iframe в модальное окно
В том же файле найдите секцию `{/* Video Content */}` (строка ~360) и замените на:

```tsx
<div className="aspect-video bg-black">
  <iframe
    width="100%"
    height="100%"
    src={videoReviews.find(v => v.id === selectedVideo)?.rutubeUrl}
    frameBorder="0"
    allow="clipboard-write; autoplay"
    allowFullScreen
  />
</div>
```

## 📸 Как добавить фото-отзывы

### Способ 1: Загрузить файлы
1. Поместите ваши фотографии в папку `public/reviews/`
2. Назовите файлы: `review-1.jpg`, `review-2.jpg`, и т.д.

### Способ 2: Обновить код
Откройте файл: `src/app/reviews/page.tsx`

Найдите массив `photoReviews` (строка ~114) и измените:

```typescript
const photoReviews = [
  { id: 1, src: '/reviews/review-1.jpg', alt: 'Отзыв Алексея' },
  { id: 2, src: '/reviews/review-2.jpg', alt: 'Отзыв Дмитрия' },
  // ... и так далее
];
```

Затем в секции галереи (строка ~300) измените на:

```tsx
<div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
  <Image
    src={photo.src}
    alt={photo.alt}
    fill
    className="object-cover group-hover:scale-110 transition-transform"
  />
</div>
```

## 🎨 Настройка thumbnail (превью) для видео

Если хотите использовать свои изображения вместо эмодзи:

1. Добавьте поле `thumbnailImage` в `videoReviews`:
```typescript
{
  id: 1,
  name: 'Алексей Смирнов',
  thumbnailImage: '/reviews/thumbnails/video-1.jpg', // 👈 Добавьте
  // ...
}
```

2. Измените код thumbnail:
```tsx
<div className="relative h-48 overflow-hidden">
  <Image
    src={video.thumbnailImage || '/default-thumbnail.jpg'}
    alt={video.name}
    fill
    className="object-cover"
  />
</div>
```

## 💡 Полезные советы

- **Размер фото**: рекомендуем 800x1067px (соотношение 3:4)
- **Формат**: JPEG или WebP для лучшей производительности
- **Названия файлов**: используйте латиницу без пробелов
- **Оптимизация**: сжимайте фотографии перед загрузкой (до 500KB)

## 🔗 Пример готового кода

Полный пример с реальными данными:

```typescript
const videoReviews = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    car: 'Mercedes-Benz E-Class 2020',
    rutubeUrl: 'https://rutube.ru/play/embed/abc123def456',
    thumbnailImage: '/reviews/thumbnails/aleksey.jpg',
    date: 'Январь 2024',
    rating: 5,
  },
];

const photoReviews = [
  { id: 1, src: '/reviews/review-1.jpg', alt: 'Отзыв Алексея Смирнова' },
  { id: 2, src: '/reviews/review-2.jpg', alt: 'Отзыв Дмитрия Козлова' },
];
```

---

Готово! Теперь у вас полноценная страница отзывов с видео и фотографиями! 🎉

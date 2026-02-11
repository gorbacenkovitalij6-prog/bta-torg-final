import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'БТА ТОРГ - Автомобили из Германии',
  description: 'Премиум автомобили из Германии. Индивидуальный подход к каждому клиенту.',
  icons: {
    icon: '/favicon.svg',
    apple: '/images/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

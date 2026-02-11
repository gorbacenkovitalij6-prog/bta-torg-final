import Image from 'next/image';

export function Collection25() {
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-red-900/40" />
          <Image
            src="https://ext.same-assets.com/1719477383/3013901671.jpeg"
            alt="Collection 25"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0">
          <h2 className="text-4xl lg:text-5xl font-light uppercase tracking-wider mb-6 text-brabus-heading">
            Коллекция 2025
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-8 leading-relaxed">
            Эксклюзивная коллекция БТА ТОРГ - воплощение всего, над чем мы работаем. Узнайте все детали нашей Коллекции 2025!
          </p>
          <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors self-start">
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

export function BrabusIsland() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://ext.same-assets.com/1719477383/3013901671.jpeg"
          alt="BRABUS Island"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative h-full flex flex-col items-center justify-end pb-16 text-center text-white px-6">
        <h2 className="text-4xl lg:text-5xl font-light uppercase tracking-widest mb-4 text-brabus-heading">
          Дом мечты.
        </h2>
        <button className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors mt-6">
          Узнать больше
        </button>
      </div>
    </section>
  );
}

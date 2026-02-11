export function SimpleCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-400">
          © {currentYear} БТА ТОРГ. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export function NewHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/5 backdrop-saturate-150" />

      {/* Top edge highlight (iOS style light reflection) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-px border-b border-white/20" />

      {/* Subtle inner glow on edges */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />

      <div
        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(200,235,230,0.08) 50%, rgba(77,182,172,0.04) 100%)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 100%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 100%)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/biocube-logo.png"
            alt="BioCube логотип"
            className="h-[48px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/marketplace"
            className="text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200"
          >
            Маркетплейс
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200">
            Решения
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200">
            Наука
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200">
            Подписка
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200">
            Поддержка
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="#"
            className="hidden sm:block text-sm font-medium text-gray-700 hover:opacity-60 transition-opacity duration-200"
          >
            Войти
          </Link>
          <Link
            to="#lead-form"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] text-white text-sm font-medium shadow-lg shadow-[#4DB6AC]/25 hover:shadow-xl hover:shadow-[#4DB6AC]/35 transition-all hover:-translate-y-0.5"
          >
            Начать
          </Link>
        </div>
      </div>
    </header>
  );
}

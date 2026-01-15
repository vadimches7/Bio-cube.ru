import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/marketplace", label: "Маркетплейс" },
    { to: "#", label: "Решения" },
    { to: "#", label: "Наука" },
    { to: "#", label: "Подписка" },
    { to: "#", label: "Поддержка" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/70 backdrop-saturate-150" />

      {/* Top edge highlight (iOS style light reflection) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-px border-b border-gray-200/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/images/brand/biocube-logo.png"
            alt="BioCube логотип"
            className="h-[36px] sm:h-[44px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-gray-700 hover:text-[#4DB6AC] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Desktop only buttons */}
          <Link
            to="#"
            className="hidden md:block text-sm font-medium text-gray-700 hover:text-[#4DB6AC] transition-colors duration-200"
          >
            Войти
          </Link>
          <Link
            to="#lead-form"
            className="hidden md:flex px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] text-white text-sm font-medium shadow-lg shadow-[#4DB6AC]/25 hover:shadow-xl hover:shadow-[#4DB6AC]/35 transition-all hover:-translate-y-0.5"
          >
            Начать
          </Link>

          {/* Mobile Menu Button - always visible on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl bg-[#4DB6AC] text-white shadow-lg shadow-[#4DB6AC]/30"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-gray-200 shadow-2xl z-50">
          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:bg-[#4DB6AC]/10 hover:text-[#4DB6AC] transition-colors active:bg-[#4DB6AC]/20"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-3 border-t border-gray-200 space-y-3">
              <Link
                to="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Войти
              </Link>
              <Link
                to="#lead-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-center rounded-2xl bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] text-white text-base font-semibold shadow-lg shadow-[#4DB6AC]/30 mx-2"
              >
                Начать проектирование
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

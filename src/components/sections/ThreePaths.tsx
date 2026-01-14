import { useState } from "react";
import { Sparkles, Wand2, Wrench } from "lucide-react";

export function ThreePaths() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const paths = [
    {
      id: 1,
      icon: Sparkles,
      title: "Стать творцом",
      label: "Конструктор",
      description: "Спроектируйте аквариум с нуля с проверкой совместимости от ИИ",
    },
    {
      id: 2,
      icon: Wand2,
      title: "Примерить мгновенно",
      label: "AI-Студия",
      description: "Загрузите фото комнаты, и наша нейросеть впишет BioCube в ваш интерьер с учетом теней и бликов",
    },
    {
      id: 3,
      icon: Wrench,
      title: "Вернуть жизнь",
      label: "Сервис-центр",
      description: "Профессиональный апгрейд и спасение текущего аквариума под ключ",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-[#4DB6AC]/5 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">3 Пути к совершенству</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите оптимальный путь для достижения вашей персональной экосистемы
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path) => {
            const Icon = path.icon;
            const isHovered = hoveredCard === path.id;

            return (
              <div
                key={path.id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow effect behind card */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4DB6AC]/0 via-[#26A69A]/0 to-[#4DB6AC]/0 blur-2xl transition-all duration-500 ${
                    isHovered ? "from-[#4DB6AC]/40 via-[#26A69A]/30 to-[#4DB6AC]/40" : ""
                  }`}
                />

                {/* Glass card */}
                <div
                  className={`relative h-full bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-lg transition-all duration-500 ${
                    isHovered ? "scale-105 shadow-2xl shadow-[#4DB6AC]/20" : ""
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? "0 20px 60px -15px rgba(77, 182, 172, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)"
                      : "0 10px 30px -10px rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {/* Icon container with gradient */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center mb-6 transition-all duration-500 ${
                      isHovered ? "scale-110 shadow-lg shadow-[#4DB6AC]/50" : ""
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Label badge */}
                  <div className="inline-block px-3 py-1 bg-[#4DB6AC]/10 backdrop-blur-sm rounded-full mb-4">
                    <span className="text-xs font-medium text-[#4DB6AC]">{path.label}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl font-light mb-4 transition-colors duration-300 ${
                      isHovered ? "text-[#4DB6AC]" : "text-gray-900"
                    }`}
                  >
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">{path.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className={`mt-6 h-1 rounded-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] transition-all duration-500 ${
                      isHovered ? "w-full" : "w-12"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

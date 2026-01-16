import { useState } from "react";
import { Sparkles, Wand2, Heart } from "lucide-react";

export function ThreePaths() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const paths = [
    {
      id: 1,
      icon: Sparkles,
      title: "Создать новый аквариум Biodesign",
      label: "Конструктор",
      gradient: "from-[#4DB6AC] via-[#2DD4BF] to-[#06B6D4]",
      glowColor: "rgba(77, 182, 172, 0.6)",
    },
    {
      id: 2,
      icon: Wand2,
      title: "Вписать аквариум в ваш интерьер по фото",
      label: "3D-Примерка",
      gradient: "from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD]",
      glowColor: "rgba(139, 92, 246, 0.6)",
    },
    {
      id: 3,
      icon: Heart,
      title: "Калькулятор обслуживания и спасение аквариума",
      label: "Сервис и Здоровье",
      gradient: "from-[#EC4899] via-[#F472B6] to-[#F9A8D4]",
      glowColor: "rgba(236, 72, 153, 0.6)",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background gradient mesh - Light theme */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4DB6AC]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4DB6AC]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            3 Пути к{" "}
            <span className="bg-gradient-to-r from-[#4DB6AC] via-[#2DD4BF] to-[#06B6D4] bg-clip-text text-transparent">
              совершенству
            </span>
          </h2>
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
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated glow effect */}
                <div
                  className={`absolute -inset-1 rounded-3xl blur-xl transition-all duration-700 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${path.glowColor}, transparent, ${path.glowColor})`,
                  }}
                />

                {/* Gradient border */}
                <div
                  className={`absolute inset-0 rounded-3xl p-[1px] transition-all duration-500 ${
                    isHovered ? "opacity-100" : "opacity-30"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${path.glowColor}, transparent 50%, ${path.glowColor})`,
                  }}
                >
                  <div className="w-full h-full bg-white rounded-3xl" />
                </div>

                {/* Card content - Light theme */}
                <div
                  className={`relative h-full bg-white rounded-3xl p-8 border border-gray-200/50 transition-all duration-500 ${
                    isHovered ? "transform -translate-y-2" : ""
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 25px 60px -15px ${path.glowColor}, 0 10px 40px -10px rgba(0, 0, 0, 0.1)`
                      : "0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 20px -5px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {/* Icon with glow */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-6 transition-all duration-500`}
                    style={{
                      boxShadow: isHovered
                        ? `0 0 30px ${path.glowColor}, 0 0 60px ${path.glowColor}`
                        : `0 8px 20px ${path.glowColor.replace("0.6", "0.3")}`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    
                    {/* Icon pulse ring */}
                    {isHovered && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                        style={{ background: `linear-gradient(135deg, ${path.glowColor}, transparent)` }}
                      />
                    )}
                  </div>

                  {/* Label badge with glow - Light theme */}
                  <div
                    className={`inline-block px-4 py-1.5 rounded-full mb-4 transition-all duration-300 ${
                      isHovered ? "bg-gray-100" : "bg-gray-50"
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 0 20px ${path.glowColor.replace("0.6", "0.15")}` : "none",
                    }}
                  >
                    <span
                      className={`text-xs font-semibold bg-gradient-to-r ${path.gradient} bg-clip-text text-transparent`}
                    >
                      {path.label}
                    </span>
                  </div>

                  {/* Title - Light theme */}
                  <h3 className="text-xl font-medium text-gray-900 mb-4 leading-snug">
                    {path.title}
                  </h3>

                  {/* Bottom accent line with animation - Light theme */}
                  <div className="relative h-1 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${path.gradient} transition-all duration-700 ease-out`}
                      style={{
                        width: isHovered ? "100%" : "30%",
                        boxShadow: isHovered ? `0 0 15px ${path.glowColor}` : "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Powered by BioCube OS - Light theme */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Powered by{" "}
            <span className="bg-gradient-to-r from-[#4DB6AC] to-[#2DD4BF] bg-clip-text text-transparent font-semibold">
              BioCube OS
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

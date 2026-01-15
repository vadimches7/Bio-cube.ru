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
    <section className="py-24 px-4 bg-gradient-to-b from-[#0a0f0f] via-[#0d1212] to-[#0a0f0f] relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4DB6AC]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4DB6AC]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            3 Пути к{" "}
            <span className="bg-gradient-to-r from-[#4DB6AC] via-[#2DD4BF] to-[#06B6D4] bg-clip-text text-transparent">
              совершенству
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                    isHovered ? "opacity-100" : "opacity-40"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${path.glowColor}, transparent 50%, ${path.glowColor})`,
                  }}
                >
                  <div className="w-full h-full bg-[#0d1212] rounded-3xl" />
                </div>

                {/* Card content */}
                <div
                  className={`relative h-full bg-gradient-to-br from-[#0d1212] to-[#111818] rounded-3xl p-8 border border-white/5 transition-all duration-500 ${
                    isHovered ? "transform -translate-y-2" : ""
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 25px 60px -15px ${path.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
                      : "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
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

                  {/* Label badge with glow */}
                  <div
                    className={`inline-block px-4 py-1.5 rounded-full mb-4 transition-all duration-300 ${
                      isHovered ? "bg-white/10" : "bg-white/5"
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 0 20px ${path.glowColor.replace("0.6", "0.2")}` : "none",
                    }}
                  >
                    <span
                      className={`text-xs font-semibold bg-gradient-to-r ${path.gradient} bg-clip-text text-transparent`}
                    >
                      {path.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-white mb-4 leading-snug">
                    {path.title}
                  </h3>

                  {/* Bottom accent line with animation */}
                  <div className="relative h-1 rounded-full bg-white/10 overflow-hidden">
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

        {/* Powered by BioCube OS */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
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

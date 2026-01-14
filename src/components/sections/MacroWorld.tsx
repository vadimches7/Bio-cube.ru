import { useState } from "react";
import { Droplet, Eye, Mountain, Leaf, Sparkles } from "lucide-react";

interface MacroCard {
  id: number;
  title: string;
  fact: string;
  icon: React.ReactNode;
  gradient: string;
}

const macroCards: MacroCard[] = [
  {
    id: 1,
    title: "Пузырек кислорода",
    fact: "Насыщение воды кислородом 99%",
    icon: <Droplet className="w-8 h-8" />,
    gradient: "from-cyan-400 to-teal-500",
  },
  {
    id: 2,
    title: "Глаз рыбы",
    fact: "Мониторинг здоровья каждой особи в режиме реального времени",
    icon: <Eye className="w-8 h-8" />,
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    title: "Натуральный камень",
    fact: "Текстура Dragon Stone — естественная фильтрация и pH-буфер",
    icon: <Mountain className="w-8 h-8" />,
    gradient: "from-gray-400 to-slate-500",
  },
  {
    id: 4,
    title: "Лист растения",
    fact: "Фотосинтез под управлением циркадных ритмов освещения",
    icon: <Leaf className="w-8 h-8" />,
    gradient: "from-emerald-400 to-green-500",
  },
  {
    id: 5,
    title: "Микроэлементы",
    fact: "Автоматическое дозирование минералов с точностью до микрограмма",
    icon: <Sparkles className="w-8 h-8" />,
    gradient: "from-purple-400 to-pink-500",
  },
];

export function MacroWorld() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-4 text-balance">Природа в разрешении 8K</h2>
          <p className="text-xl text-gray-600 font-light">Каждая деталь под контролем</p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Scroll Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrollable Content */}
          <div className="flex gap-8 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory">
            {macroCards.map((card) => (
              <div
                key={card.id}
                className="flex-shrink-0 w-80 snap-center"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div
                  className={`
                    relative h-96 rounded-2xl overflow-hidden
                    transition-all duration-500 ease-out
                    ${hoveredCard === card.id ? "scale-105 shadow-2xl shadow-[#4DB6AC]/30" : "scale-100 shadow-lg"}
                  `}
                >
                  {/* Background with gradient overlay */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br ${card.gradient}
                    transition-opacity duration-500
                    ${hoveredCard === card.id ? "opacity-20" : "opacity-10"}
                  `}
                  />

                  {/* Border */}
                  <div className="absolute inset-0 border border-gray-200/50 rounded-2xl" />

                  {/* Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`
                      text-gray-400 transition-all duration-500
                      ${hoveredCard === card.id ? "scale-0 opacity-0" : "scale-100 opacity-100"}
                    `}
                    >
                      {card.icon}
                    </div>
                  </div>

                  {/* Content - appears on hover */}
                  <div
                    className={`
                    absolute inset-0 p-8 flex flex-col justify-end
                    transition-all duration-500 ease-out
                    ${hoveredCard === card.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  >
                    <div className="space-y-4">
                      {/* Icon with gradient */}
                      <div
                        className={`
                        w-16 h-16 rounded-xl bg-white/90 backdrop-blur-sm
                        flex items-center justify-center
                        shadow-lg
                      `}
                      >
                        <div className={`bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}>
                          {card.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-light text-gray-900">{card.title}</h3>

                      {/* Fact */}
                      <p className="text-gray-700 leading-relaxed font-light">{card.fact}</p>

                      {/* Accent line */}
                      <div className={`h-1 rounded-full bg-gradient-to-r ${card.gradient}`} />
                    </div>
                  </div>

                  {/* Subtle inner glow */}
                  <div
                    className={`
                    absolute inset-0 rounded-2xl
                    transition-opacity duration-500
                    ${hoveredCard === card.id ? "opacity-100" : "opacity-0"}
                  `}
                    style={{
                      boxShadow: `inset 0 0 60px rgba(77, 182, 172, 0.2)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 font-light">Прокрутите горизонтально для просмотра всех деталей</p>
        </div>
      </div>
    </section>
  );
}

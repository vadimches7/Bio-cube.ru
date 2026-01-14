import { useState } from "react";
import { Lightbulb, Filter, Activity, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TechSpec {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { top: string; left: string };
}

export function IntelligentCore() {
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  const techSpecs: TechSpec[] = [
    {
      id: "light",
      title: "Циркадное освещение",
      description:
        "Автоматическая адаптация спектра света под естественные ритмы. Имитация рассвета и заката для стабилизации биоритмов.",
      icon: <Lightbulb className="w-5 h-5" />,
      position: { top: "25%", left: "50%" },
    },
    {
      id: "filter",
      title: "Бесшумная фильтрация",
      description: "Уровень шума < 25 дБ. Многоступенчатая система очистки с биологическим балансом.",
      icon: <Filter className="w-5 h-5" />,
      position: { top: "60%", left: "30%" },
    },
    {
      id: "sensors",
      title: "Мониторинг 24/7",
      description:
        "Непрерывный контроль pH, температуры, жесткости воды. Предиктивная аналитика для предотвращения сбоев.",
      icon: <Activity className="w-5 h-5" />,
      position: { top: "60%", left: "70%" },
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-4 text-balance">Интеллектуальное ядро BioCube</h2>
          <p className="text-lg text-gray-600 text-pretty">Технология на службе живой природы</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: X-Ray Technical View */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              {/* X-Ray Aquarium Illustration */}
              <div className="absolute inset-0 p-8">
                {/* Main tank outline */}
                <div className="relative w-full h-full border-2 border-[#4DB6AC]/40 rounded-2xl backdrop-blur-sm bg-gradient-to-b from-[#4DB6AC]/5 to-blue-50/50">
                  {/* Water level indicator */}
                  <div className="absolute inset-x-4 top-8 h-1 bg-gradient-to-r from-transparent via-[#4DB6AC] to-transparent opacity-60" />

                  {/* Tech points with pulsing animation */}
                  {techSpecs.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setActiveSpec(activeSpec === spec.id ? null : spec.id)}
                      className="absolute group"
                      style={{ top: spec.position.top, left: spec.position.left, transform: "translate(-50%, -50%)" }}
                    >
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                        <div className="absolute inset-0 bg-[#4DB6AC] rounded-full opacity-20 animate-ping" />
                        <div className="absolute inset-0 bg-[#4DB6AC] rounded-full opacity-40 animate-pulse" />
                      </div>

                      {/* Icon dot */}
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center text-white shadow-lg shadow-[#4DB6AC]/50 transition-transform hover:scale-110">
                        {spec.icon}
                      </div>

                      {/* Popup card */}
                      {activeSpec === spec.id && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-2xl z-10 animate-fade-up">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center text-white flex-shrink-0">
                              {spec.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">{spec.title}</h3>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{spec.description}</p>
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Grid lines for technical feel */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(0deg, rgba(77,182,172,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,182,172,0.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: iPhone App Mockup */}
          <div className="relative">
            <div className="max-w-md mx-auto">
              {/* iPhone frame */}
              <div className="relative mx-auto w-[280px] h-[570px] bg-gray-900 rounded-[50px] p-3 shadow-2xl border-8 border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

                {/* Screen */}
                <div className="relative w-full h-full bg-gradient-to-b from-gray-50 to-white rounded-[40px] overflow-hidden">
                  <div className="p-6 pt-12">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-8 text-xs text-gray-500">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-[#4DB6AC]" />
                        <div className="w-4 h-4 rounded-full bg-[#4DB6AC]" />
                        <div className="w-4 h-4 rounded-full bg-[#4DB6AC]" />
                      </div>
                    </div>

                    {/* App Header */}
                    <h3 className="text-2xl font-light text-gray-900 mb-1">BioCube OS</h3>
                    <p className="text-sm text-gray-500 mb-8">Главная панель</p>

                    {/* Bio-Score Circle */}
                    <div className="mb-8">
                      <div className="relative w-40 h-40 mx-auto">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="80" cy="80" r="70" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="12"
                            strokeDasharray="440"
                            strokeDashoffset="22"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4DB6AC" />
                              <stop offset="100%" stopColor="#2DD4BF" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-light text-gray-900">98</div>
                          <div className="text-xs text-gray-500">Bio-Score</div>
                        </div>
                      </div>
                    </div>

                    {/* pH Chart */}
                    <div className="mb-6 p-4 bg-gradient-to-br from-[#4DB6AC]/10 to-blue-50 rounded-2xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium text-gray-700">Уровень pH</span>
                        <span className="text-xs text-[#4DB6AC] font-semibold">7.2</span>
                      </div>
                      {/* Wave chart */}
                      <svg className="w-full h-16" viewBox="0 0 200 50" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#4DB6AC" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,25 Q25,15 50,25 T100,25 T150,25 T200,25"
                          fill="none"
                          stroke="#4DB6AC"
                          strokeWidth="2"
                        />
                        <path
                          d="M0,25 Q25,15 50,25 T100,25 T150,25 T200,25 L200,50 L0,50 Z"
                          fill="url(#waveGradient)"
                        />
                      </svg>
                    </div>

                    {/* Call Engineer Button */}
                    <Button className="w-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:from-[#45a399] hover:to-[#1e8a82] text-white shadow-lg shadow-[#4DB6AC]/30 rounded-xl h-12">
                      <Phone className="w-4 h-4 mr-2" />
                      Вызвать инженера
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description text */}
              <div className="mt-8 text-center">
                <p className="text-gray-700 leading-relaxed text-pretty">
                  Мы оцифровали заботу о природе.{" "}
                  <span className="font-semibold text-[#4DB6AC]">Радикальная прозрачность</span> и контроль каждого
                  визита мастера через приложение.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

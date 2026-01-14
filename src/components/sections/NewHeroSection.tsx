import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Droplets, Brain, Sun } from "lucide-react";

// Функция для генерации случайных колебаний
const fluctuate = (base: number, range: number): number => {
  return base + (Math.random() - 0.5) * range * 2;
};

export function NewHeroSection() {
  // Динамические параметры морского аквариума
  const [params, setParams] = useState({
    ph: 8.2,
    temp: 25.5,
    salinity: 35.0,
    orp: 380,
    kh: 8.5,
    ca: 430,
    mg: 1320,
  });

  // Имитация живых данных с IoT-датчиков
  useEffect(() => {
    const interval = setInterval(() => {
      setParams({
        ph: fluctuate(8.2, 0.01),
        temp: fluctuate(25.5, 0.05),
        salinity: fluctuate(35.0, 0.1),
        orp: fluctuate(380, 2),
        kh: fluctuate(8.5, 0.05),
        ca: fluctuate(430, 2),
        mg: fluctuate(1320, 5),
      });
    }, 3500); // Обновление каждые 3.5 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4DB6AC]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="max-w-xl order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DB6AC]/10 border border-[#4DB6AC]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#4DB6AC]" />
              <span className="text-xs font-medium text-[#4DB6AC]">ИИ-управление экосистемой</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] text-balance">
              Ваша персональная{" "}
              <span className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] bg-clip-text text-transparent font-normal">
                экосистема
              </span>{" "}
              для здоровья
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Научно обоснованное снижение стресса и увлажнение воздуха под управлением ИИ. Превратите ваше жилое
              пространство в процветающий водный оазис.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:opacity-90 text-white rounded-full px-5 sm:px-6 shadow-xl shadow-[#4DB6AC]/25 hover:shadow-2xl hover:shadow-[#4DB6AC]/30 transition-all hover:-translate-y-0.5"
              >
                Начать проектирование
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-5 sm:px-6 border-border hover:bg-secondary/80 bg-transparent"
              >
                Узнать больше
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Влажность</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Оптимальный уровень</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Антистресс</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">98% эффективность</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Циркадный свет</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Синхронизация</div>
              </div>
            </div>
          </div>

          {/* Right - Aquarium Video with Live IoT Overlay */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-[#4DB6AC]/15">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto aspect-[4/3] object-cover"
                poster="/aquarium-hero.jpg"
              >
                <source src="/video-2.mp4?v=2" type="video/mp4" />
                <img
                  src="/aquarium-hero.jpg"
                  alt="Умный аквариум BioCube"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              </video>

              {/* pH Badge - Top Left */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 backdrop-blur-xl bg-white/20 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-white/10 shadow-lg transition-all duration-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#4DB6AC] animate-pulse" />
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/70 font-medium">pH воды</div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {params.ph.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Temperature Badge - Top Right */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 backdrop-blur-xl bg-white/20 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-white/10 shadow-lg transition-all duration-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-400 animate-pulse" />
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/70 font-medium">Температура</div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {params.temp.toFixed(1)}°C
                    </div>
                  </div>
                </div>
              </div>

              {/* Salinity Badge - Middle Left */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 backdrop-blur-xl bg-white/20 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-white/10 shadow-lg transition-all duration-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/70 font-medium">Соленость</div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {params.salinity.toFixed(1)} ppt
                    </div>
                  </div>
                </div>
              </div>

              {/* ORP Badge - Middle Right */}
              <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 backdrop-blur-xl bg-white/20 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-white/10 shadow-lg transition-all duration-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-400 animate-pulse" />
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/70 font-medium">ORP (Redox)</div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {Math.round(params.orp)} mV
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Bar with Reef Metrics */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 backdrop-blur-xl bg-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/10 shadow-lg">
                {/* Main Status Row */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/70 font-medium">Статус BioCube OS</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Все параметры в норме</div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#4DB6AC]/30 border border-[#4DB6AC]/30">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#4DB6AC] animate-[pulse_1.5s_ease-in-out_infinite]" 
                         style={{ boxShadow: '0 0 8px #4DB6AC, 0 0 16px #4DB6AC' }} />
                    <span className="text-[10px] sm:text-xs font-semibold text-[#4DB6AC]">Онлайн</span>
                  </div>
                </div>

                {/* Reef Chemistry Metrics */}
                <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-white/10">
                  <div className="text-center flex-1">
                    <div className="text-[8px] sm:text-[10px] text-white/60 font-medium uppercase tracking-wide">kH</div>
                    <div className="text-xs sm:text-sm font-bold text-white tabular-nums">{params.kh.toFixed(1)}</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-white/20" />
                  <div className="text-center flex-1">
                    <div className="text-[8px] sm:text-[10px] text-white/60 font-medium uppercase tracking-wide">Ca</div>
                    <div className="text-xs sm:text-sm font-bold text-white tabular-nums">{Math.round(params.ca)} <span className="text-[8px] sm:text-[10px] font-normal text-white/60">ppm</span></div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-white/20" />
                  <div className="text-center flex-1">
                    <div className="text-[8px] sm:text-[10px] text-white/60 font-medium uppercase tracking-wide">Mg</div>
                    <div className="text-xs sm:text-sm font-bold text-white tabular-nums">{Math.round(params.mg)} <span className="text-[8px] sm:text-[10px] font-normal text-white/60">ppm</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

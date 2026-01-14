import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Droplets, Brain, Sun } from "lucide-react";

export function NewHeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4DB6AC]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DB6AC]/10 border border-[#4DB6AC]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#4DB6AC]" />
              <span className="text-xs font-medium text-[#4DB6AC]">ИИ-управление экосистемой</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] text-balance">
              Ваша персональная{" "}
              <span className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] bg-clip-text text-transparent font-normal">
                экосистема
              </span>{" "}
              для здоровья
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Научно обоснованное снижение стресса и увлажнение воздуха под управлением ИИ. Превратите ваше жилое
              пространство в процветающий водный оазис.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:opacity-90 text-white rounded-full px-6 shadow-xl shadow-[#4DB6AC]/25 hover:shadow-2xl hover:shadow-[#4DB6AC]/30 transition-all hover:-translate-y-0.5"
              >
                Начать проектирование
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 border-border hover:bg-secondary/80 bg-transparent"
              >
                Узнать больше
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border/50">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-3">
                  <Droplets className="w-6 h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-sm font-medium text-foreground">Влажность</div>
                <div className="text-xs text-muted-foreground mt-1">Оптимальный уровень</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-sm font-medium text-foreground">Снижение стресса</div>
                <div className="text-xs text-muted-foreground mt-1">До 98% эффективность</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-3">
                  <Sun className="w-6 h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-sm font-medium text-foreground">Циркадный свет</div>
                <div className="text-xs text-muted-foreground mt-1">Синхронизация ритма</div>
              </div>
            </div>
          </div>

          {/* Right - Aquarium Image with Overlay */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#4DB6AC]/10">
              <img
                src="/aquarium-hero.jpg"
                alt="Умный аквариум BioCube в современном интерьере"
                className="w-full h-auto aspect-[4/3] object-cover"
              />

              <div className="absolute top-4 left-4 backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 border border-white/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4DB6AC] animate-pulse" />
                  <div>
                    <div className="text-xs text-muted-foreground">pH воды</div>
                    <div className="text-lg font-semibold text-foreground">7.0</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 border border-white/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#26A69A] animate-pulse" />
                  <div>
                    <div className="text-xs text-muted-foreground">Температура</div>
                    <div className="text-lg font-semibold text-foreground">24°C</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-white/70 rounded-2xl px-5 py-4 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Статус системы</div>
                    <div className="text-sm font-medium text-foreground">Все параметры в норме</div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DB6AC]/10">
                    <div className="w-2 h-2 rounded-full bg-[#4DB6AC]" />
                    <span className="text-xs font-medium text-[#4DB6AC]">Онлайн</span>
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

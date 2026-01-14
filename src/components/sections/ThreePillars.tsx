import { Card } from "@/components/ui/card";
import { Wifi, Palette, Cpu } from "lucide-react";

export function ThreePillars() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground text-balance">
            Три столпа{" "}
            <span className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] bg-clip-text text-transparent font-normal">
              идеальной экосистемы
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            От установки до ежедневного ухода — мы продумали каждый этап
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pillar 1 - Installation */}
          <Card className="group relative overflow-hidden backdrop-blur-xl bg-card/80 border-border/50 shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#4DB6AC]/10 transition-all hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4DB6AC]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center mb-6 shadow-lg shadow-[#4DB6AC]/25">
                <Wifi className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">Установка</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Готовность к IoT из коробки. Подключение к умному дому за 5 минут через Wi-Fi и Bluetooth.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#4DB6AC]/10 text-xs font-medium text-[#4DB6AC]">IoT Ready</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  Wi-Fi 6
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  Bluetooth 5.0
                </span>
              </div>
            </div>
          </Card>

          {/* Pillar 2 - Aquascaping */}
          <Card className="group relative overflow-hidden backdrop-blur-xl bg-card/80 border-border/50 shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#4DB6AC]/10 transition-all hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4DB6AC]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center mb-6 shadow-lg shadow-[#4DB6AC]/25">
                <Palette className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">Декорирование</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Профессиональный акваскейпинг от дизайнеров. Создаем уникальные подводные ландшафты под ваш интерьер.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#4DB6AC]/10 text-xs font-medium text-[#4DB6AC]">
                  Aquascaping
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  Дизайн
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  Растения
                </span>
              </div>
            </div>
          </Card>

          {/* Pillar 3 - BioCube OS */}
          <Card className="group relative overflow-hidden backdrop-blur-xl bg-card/80 border-border/50 shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#4DB6AC]/10 transition-all hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4DB6AC]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center mb-6 shadow-lg shadow-[#4DB6AC]/25">
                <Cpu className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">Обслуживание</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                BioCube OS — интеллектуальная система управления. Автоматизация кормления, освещения и фильтрации.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#4DB6AC]/10 text-xs font-medium text-[#4DB6AC]">
                  BioCube OS
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  ИИ
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  Авто
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

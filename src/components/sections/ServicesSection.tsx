import { Wrench, Feather, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "Абонемент",
    desc: "Регулярный уход и забота о системе",
    color: "text-blue-400",
    bgGlow: "bg-blue-500/10",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/10",
    iconGlow: "drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" // синее свечение
  },
  {
    icon: Feather,
    title: "Аквадизайн",
    desc: "Создание живых картин под ключ",
    color: "text-teal-400",
    bgGlow: "bg-teal-500/10",
    border: "border-teal-500/20",
    shadow: "shadow-teal-500/10",
    iconGlow: "drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]" // бирюзовое свечение
  },
  {
    icon: Zap,
    title: "Экстренный выезд",
    desc: "Спасём аквариум, если что-то пошло не так",
    color: "text-orange-400",
    bgGlow: "bg-orange-500/10",
    border: "border-orange-500/20",
    shadow: "shadow-orange-500/10",
    iconGlow: "drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]" // оранжевое свечение
  }
];

export function ServicesSection() {
  return (
    <section className="relative py-12 bg-[#020617] font-sans -mt-12 md:-mt-20 z-20"> {/* Сдвигаем вверх, чтобы наехать на Hero или быть сразу под ним */}
      <div className="container px-4">
        <h2 className="sr-only">Наши направления</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div 
              key={i}
              className={cn(
                "group relative overflow-hidden backdrop-blur-xl transition-all duration-300",
                "bg-[#0a192f]/40 hover:bg-[#0a192f]/60",
                "border rounded-[40px]",
                item.border,
                "shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]",
                // Цветное свечение при ховере
                `hover:${item.shadow}`
              )}
            >
              {/* Внутреннее свечение */}
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.bgGlow)} />
              
              <div className="relative p-8 flex flex-col items-start gap-4">
                {/* Иконка с цветным свечением */}
                <div className={cn(
                  "p-3 rounded-2xl bg-white/5 border border-white/5",
                  "group-hover:scale-110 transition-all duration-300",
                  item.color,
                  item.iconGlow // Цветное свечение иконки
                )}>
                  <item.icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  {/* Заголовок - Sans-Serif + Bold */}
                  <h3 className="!font-sans text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    {item.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />
                  </h3>
                  {/* Описание - Sans-Serif */}
                  <p className="!font-sans text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


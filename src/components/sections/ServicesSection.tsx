import { Wrench, Feather, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "Абонемент",
    desc: "Регулярный уход и забота о системе",
    gradient: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-400",
    iconGlow: "drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]",
    cardGlow: "shadow-[0_0_40px_rgba(34,211,238,0.15)]"
  },
  {
    icon: Feather,
    title: "Аквадизайн",
    desc: "Создание живых картин под ключ",
    gradient: "from-teal-500 to-cyan-500",
    iconColor: "text-teal-400",
    iconGlow: "drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]",
    cardGlow: "shadow-[0_0_40px_rgba(45,212,191,0.15)]"
  },
  {
    icon: Zap,
    title: "Экстренный выезд",
    desc: "Спасём аквариум, если что-то пошло не так",
    gradient: "from-orange-500 to-red-500",
    iconColor: "text-orange-400",
    iconGlow: "drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]",
    cardGlow: "shadow-[0_0_40px_rgba(251,146,60,0.15)]"
  }
];

export function ServicesSection() {
  return (
    <section className="relative py-20 bg-[#020617] font-sans overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Наши направления
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Комплексные решения для вашего аквариума
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((item, i) => (
            <button
              key={i}
              className={cn(
                "group relative overflow-hidden backdrop-blur-2xl transition-all duration-500 text-left",
                "bg-white/5 hover:bg-white/8",
                "border border-white/10 hover:border-white/20",
                "rounded-[32px]",
                "shadow-[0_0_50px_rgba(0,0,0,0.3)]",
                "hover:scale-[1.02] hover:-translate-y-1",
                "cursor-pointer"
              )}
            >
              {/* Градиентное свечение при hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br",
                item.gradient,
                "opacity-[0.03]"
              )} />

              {/* Верхний блик */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 flex flex-col items-start gap-5">
                {/* Иконка с градиентным фоном */}
                <div className={cn(
                  "relative p-4 rounded-[20px] transition-all duration-500",
                  "bg-white/5 border border-white/10",
                  "group-hover:scale-110 group-hover:border-white/20",
                  item.iconColor,
                  item.iconGlow
                )}>
                  {/* Градиентный фон иконки при hover */}
                  <div className={cn(
                    "absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                    "bg-gradient-to-br",
                    item.gradient
                  )} />
                  <item.icon className="w-7 h-7 relative z-10" />
                </div>

                <div className="space-y-3 flex-1">
                  {/* Заголовок */}
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    {item.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" />
                  </h3>
                  
                  {/* Описание */}
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Нижняя подсветка при hover */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500",
                  "bg-gradient-to-r",
                  item.gradient
                )} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


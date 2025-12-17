import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Award, Shield, Users, Star, Clock, Wrench, HeartHandshake, Beaker } from "lucide-react";

/**
 * TrustSection - Секция доверия и статистики
 * 
 * Адаптирована под режим:
 * - installation: акцент на опыт, масштаб проектов, гарантии
 * - service: акцент на скорость, количество спасённых аквариумов
 */

const statsData = {
  installation: [
    { icon: Award, value: "15+", label: "Лет на рынке" },
    { icon: Users, value: "500+", label: "Проектов под ключ" },
    { icon: Shield, value: "5 лет", label: "Гарантия на работы" },
    { icon: Star, value: "4.9", label: "Рейтинг на Profi.ru" },
  ],
  service: [
    { icon: Clock, value: "24ч", label: "Среднее время выезда" },
    { icon: HeartHandshake, value: "800+", label: "Спасённых аквариумов" },
    { icon: Beaker, value: "2000+", label: "Тестов воды" },
    { icon: Star, value: "4.9", label: "Рейтинг на Profi.ru" },
  ],
};

const logosData = {
  installation: [
    "Московский зоопарк",
    "ГУМ",
    "Four Seasons",
    "Рэдиссон",
    "Частные резиденции",
  ],
  service: [
    "Регулярные клиенты",
    "Рестораны Москвы",
    "Коттеджные посёлки",
    "Офисные центры",
    "Частные коллекционеры",
  ],
};

export function TrustSection() {
  const { mode } = useServiceMode();
  
  const stats = statsData[mode];
  const logos = logosData[mode];
  const whoWeWorkWithTitle = mode === "installation" ? "Нам доверяют" : "Работаем с";

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className={cn(
        "absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl",
        mode === "installation" ? "bg-bio/3" : "bg-amber/3"
      )} />
      
      <div className="container relative z-10 px-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="card-premium p-6 md:p-8 text-center group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className={cn(
                "w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors",
                mode === "installation" 
                  ? "bg-bio/10 group-hover:bg-bio/20" 
                  : "bg-amber/10 group-hover:bg-amber/20"
              )}>
                <stat.icon className={cn(
                  "w-6 h-6",
                  mode === "installation" ? "text-bio" : "text-amber"
                )} />
              </div>
              <div className={cn(
                "text-3xl md:text-4xl font-serif font-bold mb-2",
                mode === "installation" ? "text-gradient-bio" : "text-gradient-amber"
              )}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust logos */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
            {whoWeWorkWithTitle}
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="card-premium py-4 px-5 text-sm md:text-base font-medium text-muted-foreground/80 hover:text-foreground transition-colors"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

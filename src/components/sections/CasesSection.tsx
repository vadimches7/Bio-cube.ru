import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const installationCases = [
  {
    id: 1,
    title: "Морской риф в пентхаусе",
    location: "Москва, Патриаршие пруды",
    volume: "1200 литров",
    description: "Встроенный морской аквариум с живыми кораллами и редкими рыбами. Интеграция с системой умного дома.",
    image: "linear-gradient(135deg, hsl(200 60% 20%) 0%, hsl(180 50% 15%) 100%)",
  },
  {
    id: 2,
    title: "Пресноводный биотоп",
    location: "Подмосковье, частная резиденция",
    volume: "800 литров",
    description: "Аквариум-перегородка между гостиной и столовой. Южноамериканский биотоп с дискусами.",
    image: "linear-gradient(135deg, hsl(145 40% 18%) 0%, hsl(160 35% 12%) 100%)",
  },
  {
    id: 3,
    title: "Рифовая стена в ресторане",
    location: "Москва, ресторан «Посейдон»",
    volume: "3500 литров",
    description: "Панорамный морской аквариум длиной 6 метров. Автоматизированная система жизнеобеспечения.",
    image: "linear-gradient(135deg, hsl(220 50% 18%) 0%, hsl(200 45% 12%) 100%)",
  },
];

const serviceCases = [
  {
    id: 1,
    title: "Спасение морского аквариума",
    problem: "Массовая гибель кораллов, мутная вода",
    solution: "Диагностика, замена фильтрации, лечение",
    result: "Восстановлен за 3 недели",
    image: "linear-gradient(135deg, hsl(38 60% 20%) 0%, hsl(30 50% 15%) 100%)",
  },
  {
    id: 2,
    title: "Борьба с водорослями",
    problem: "Зелёная вода, налёт на стёклах",
    solution: "Балансировка света и CO2, специальные добавки",
    result: "Кристальная вода за 10 дней",
    image: "linear-gradient(135deg, hsl(145 50% 18%) 0%, hsl(140 40% 12%) 100%)",
  },
  {
    id: 3,
    title: "Реанимация запущенного аквариума",
    problem: "Не обслуживался 2 года, запах",
    solution: "Глубокая чистка, замена грунта, перезапуск",
    result: "Полное восстановление экосистемы",
    image: "linear-gradient(135deg, hsl(200 40% 18%) 0%, hsl(210 35% 12%) 100%)",
  },
];

export function CasesSection() {
  const { mode } = useServiceMode();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const cases = mode === "installation" ? installationCases : serviceCases;
  const title = mode === "installation" ? "Наши проекты" : "Кейсы спасения";
  const subtitle = mode === "installation" 
    ? "Каждый аквариум — уникальный проект под архитектуру и пожелания заказчика"
    : "Реальные истории спасения аквариумов наших клиентов";

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title.split(" ")[0]}{" "}
            <span className="text-gradient-bio">{title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        {/* Cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item) => (
            <div
              key={item.id}
              className="card-premium group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Image placeholder */}
              <div 
                className="h-48 md:h-56 rounded-t-2xl relative overflow-hidden"
                style={{ background: item.image }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-bio/90 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                {/* Caustic effect on hover */}
                <div className={`caustic-overlay transition-opacity duration-500 ${
                  hoveredId === item.id ? 'opacity-60' : 'opacity-20'
                }`} />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-bio transition-colors">
                  {item.title}
                </h3>
                
                {mode === "installation" ? (
                  <>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{(item as typeof installationCases[0]).location}</span>
                      <span>•</span>
                      <span>{(item as typeof installationCases[0]).volume}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(item as typeof installationCases[0]).description}
                    </p>
                  </>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-destructive">Проблема:</span>
                      <span className="text-muted-foreground">{(item as typeof serviceCases[0]).problem}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-amber">Решение:</span>
                      <span className="text-muted-foreground">{(item as typeof serviceCases[0]).solution}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-bio">Результат:</span>
                      <span className="text-muted-foreground">{(item as typeof serviceCases[0]).result}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline-bio" size="lg">
            Смотреть все проекты
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

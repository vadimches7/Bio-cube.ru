import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const beforeAfterCases = [
  {
    id: 1,
    title: "Морской аквариум после запуска",
    problem: "Мутная вода, погибающие кораллы",
    solution: "Полная диагностика, замена системы фильтрации, лечение рыб",
    timeframe: "3 недели",
    beforeGradient: "linear-gradient(135deg, hsl(40 30% 25%) 0%, hsl(35 25% 18%) 100%)",
    afterGradient: "linear-gradient(135deg, hsl(200 60% 35%) 0%, hsl(180 50% 28%) 100%)",
  },
  {
    id: 2,
    title: "Пресноводный аквариум",
    problem: "Зелёная вода, водоросли везде",
    solution: "Балансировка освещения, CO2, питательных веществ",
    timeframe: "10 дней",
    beforeGradient: "linear-gradient(135deg, hsl(100 40% 25%) 0%, hsl(95 35% 18%) 100%)",
    afterGradient: "linear-gradient(135deg, hsl(145 50% 35%) 0%, hsl(160 45% 28%) 100%)",
  },
  {
    id: 3,
    title: "Запущенный аквариум",
    problem: "Не обслуживался 2 года",
    solution: "Глубокая чистка, замена грунта, перезапуск биофильтрации",
    timeframe: "1 месяц",
    beforeGradient: "linear-gradient(135deg, hsl(30 25% 20%) 0%, hsl(25 20% 15%) 100%)",
    afterGradient: "linear-gradient(135deg, hsl(195 55% 35%) 0%, hsl(185 50% 28%) 100%)",
  },
];

export function BeforeAfterSection() {
  const { mode } = useServiceMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  // Only show in service mode
  if (mode !== "service") return null;

  const currentCase = beforeAfterCases[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? beforeAfterCases.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === beforeAfterCases.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Результаты</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            До и{" "}
            <span className="text-gradient-amber">после</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Двигайте слайдер, чтобы увидеть разницу
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Before/After Slider */}
          <div 
            className="card-premium overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
          >
            <div className="relative h-80 md:h-96">
              {/* After (full width, behind) */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: currentCase.afterGradient }}
              >
                <div className="caustic-overlay opacity-40" />
                <span className="text-2xl font-serif font-bold text-foreground/80">После</span>
              </div>
              
              {/* Before (clipped) */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  background: currentCase.beforeGradient,
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <span className="text-2xl font-serif font-bold text-foreground/60">До</span>
              </div>
              
              {/* Slider line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-foreground/80 cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-background" />
                  <ChevronRight className="w-4 h-4 text-background" />
                </div>
              </div>
              
              {/* Invisible slider input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
            
            {/* Info */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl md:text-2xl font-semibold">
                  {currentCase.title}
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-destructive font-medium block mb-1">Проблема</span>
                  <span className="text-muted-foreground">{currentCase.problem}</span>
                </div>
                <div>
                  <span className="text-amber font-medium block mb-1">Решение</span>
                  <span className="text-muted-foreground">{currentCase.solution}</span>
                </div>
                <div>
                  <span className="text-bio font-medium block mb-1">Срок</span>
                  <span className="text-muted-foreground">{currentCase.timeframe}</span>
                </div>
              </div>
              
              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {beforeAfterCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIndex(i);
                      setSliderPosition(50);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? 'w-6 bg-amber' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

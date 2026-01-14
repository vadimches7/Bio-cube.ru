import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { cn } from "@/lib/utils";
import { Droplets, ArrowRight } from "lucide-react";
import { LivingAquarium } from "@/components/LivingAquarium";

// SVG Логотип BioCube (с градиентом)
function BioCubeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M50 5 L93 30 V80 L50 105 L7 80 V30 L50 5Z" 
        stroke="url(#gradient-logo)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7 60 C30 60 30 50 50 50 C70 50 70 60 93 50" 
        stroke="url(#gradient-logo)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M50 35 Q60 25 65 35 Q60 45 50 35" 
        fill="url(#gradient-logo)"
      />
      <circle cx="70" cy="40" r="4" fill="#22d3ee" />
      <defs>
        <linearGradient id="gradient-logo" x1="7" y1="105" x2="93" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" /> {/* teal-400 */}
          <stop offset="1" stopColor="#22d3ee" /> {/* cyan-400 */}
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HeroSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  // Оставляем пока пустой, так как кнопка теперь скроллит, но может пригодиться для других действий

  const handleScrollToServices = () => {
    // Скролл к блоку выбора пути (ServicesSection)
    // Пытаемся найти по ID, если он есть, или просто скроллим на высоту экрана
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: скролл на 100vh
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#020617] font-sans">
      {/* 1. Фон: Глубокий, с каустикой и виньеткой */}
      <div className="absolute inset-0 z-0">
        {/* Основной фон (можно вернуть изображение если нужно, но пока градиент чище) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/10 via-[#020617] to-[#020617]" />
        
        {/* Каустика (Эффект воды сверху) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
           <div className="absolute -top-[20%] left-0 right-0 h-[70%] animate-caustics mix-blend-screen" />
        </div>
        
        {/* Частицы / Пыль в воде */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" /> 
        {/* (Если нет noise.png, будет просто прозрачно) */}
        
        {/* Виньетка */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
      </div>

      <div className="container relative z-10 px-4 md:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Левая часть: Текст и Смысл */}
          <div className="space-y-8 max-w-2xl order-2 lg:order-1 animate-fade-up">
            {/* Wellness-бейдж */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(20,184,166,0.1)]">
              <Droplets className="w-4 h-4 text-teal-400 fill-teal-400/20" />
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-teal-300 uppercase">
                BioCube Wellness Standard 2024
              </span>
            </div>

            {/* Заголовок */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                BioCube — Ваша <br className="hidden lg:block" />
                <span className="text-gradient-bio inline-block pb-2">персональная экосистема</span> <br className="hidden lg:block" />
                спокойствия.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                Премиальные аквариумы с цифровым интеллектом для здоровья и интерьера.
              </p>
            </div>

            {/* Кнопка */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleScrollToServices}
                className={cn(
                  "group relative px-8 py-5 rounded-full font-bold text-white transition-all duration-300",
                  "bg-gradient-to-r from-teal-500 to-emerald-500",
                  "shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)]",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "overflow-hidden"
                )}
              >
                {/* Блик на кнопке */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Найти свое решение
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
            
            {/* Дополнительный текст (доверие) */}
            <div className="pt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] text-slate-400">
                      {/* Placeholder аватарки */}
                      <span className="opacity-50">User</span>
                    </div>
                  ))}
               </div>
               <p>Выбор 500+ клиентов в Москве</p>
            </div>
          </div>

          {/* Правая часть: Компонент LivingAquarium */}
          <div className="relative order-1 lg:order-2 animate-fade-in delay-200 perspective-[2000px]">
             {/* Задний свет за аквариумом */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
             
             <LivingAquarium />
          </div>

        </div>
      </div>

      <ContactFormDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}

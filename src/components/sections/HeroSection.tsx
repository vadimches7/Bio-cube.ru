import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { cn } from "@/lib/utils";

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
  const [dialogCta, setDialogCta] = useState("");

  const content = {
    installation: {
      title: "Живая экосистема",
      title2: "у вас дома",
      subtitle: "Премиальные аквариумы под ключ. Проектирование, запуск и интеграция в интерьер.",
      primaryCta: "Рассчитать проект",
      secondaryCta: "Посмотреть портфолио",
      stats: [
        { value: "500+", label: "Проектов" },
        { value: "15", label: "Лет опыта" },
        { value: "5 лет", label: "Гарантия" },
      ]
    },
    service: {
      title: "Профессиональный",
      title2: "уход за аквариумом",
      subtitle: "Обслуживание, чистка и лечение рыб. Вернем прозрачность воды и здоровье обитателям.",
      primaryCta: "Вызвать специалиста",
      secondaryCta: "Узнать цены",
      stats: [
        { value: "24ч", label: "Выезд" },
        { value: "800+", label: "Клиентов" },
        { value: "100%", label: "Результат" },
      ]
    },
    decoration: {
      title: "Уникальный декор",
      title2: "и хардскейп",
      subtitle: "Создаем подводные ландшафты, которые становятся центром притяжения в интерьере.",
      primaryCta: "Заказать оформление",
      secondaryCta: "Примеры работ",
      stats: [
        { value: "50+", label: "Стилей" },
        { value: "1000+", label: "Декораций" },
        { value: "∞", label: "Идей" },
      ]
    }
  };

  const c = content[mode] || content.installation;

  const handlePrimaryCta = () => {
    setDialogCta(c.primaryCta);
    setDialogOpen(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617] font-sans">
      {/* 1. Фон: Ярче + Каустика + Виньетка */}
      <div className="absolute inset-0 z-0">
        {/* Основное изображение - черно-белое и приглушенное */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-30" style={{ filter: 'grayscale(100%)' }} />
        <div className="absolute inset-0 bg-black/75" />
        
        {/* Каустика - световые лучи сверху (как солнце через воду) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] left-0 right-0 h-[70%] bg-gradient-to-b from-cyan-400/10 via-teal-300/5 to-transparent animate-caustics" />
          <div 
            className="absolute top-0 left-0 right-0 h-[60%] opacity-20"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 40px,
                  rgba(34, 211, 238, 0.03) 40px,
                  rgba(34, 211, 238, 0.03) 80px
                )
              `,
              filter: 'blur(20px)',
              animation: 'caustics-rays 12s ease-in-out infinite alternate'
            }}
          />
        </div>
        
        {/* Световые лучи (Caustics) - падающие сверху */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Градиент снизу + Виньетка */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        
        {/* Мягкое свечение сверху */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-teal-400/15 blur-[120px] rounded-full opacity-50 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 px-4 pt-10 pb-12 flex justify-center">
        {/* 2. Центральная карта - эффект мутного стекла (Glass OS) */}
        <div className={cn(
          "relative w-full max-w-[500px]",
          // Эффект мутного стекла как в macOS/iOS
          "bg-white/5 backdrop-blur-2xl",
          "border border-white/10",
          "rounded-[40px]",
          "shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_60px_-10px_rgba(20,184,166,0.15)]",
          "animate-fade-up"
        )}>
          {/* Блик сверху */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-70" />

          <div className="p-8 md:p-12 space-y-10">
            {/* 3. Логотип и Бренд */}
            <div className="flex items-center gap-4 opacity-90">
               <BioCubeLogo className="w-12 h-12 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
               <div className="flex flex-col leading-tight">
                 <span className="text-sm font-bold font-sans tracking-wider text-white">
                   BIO-CUBE
                 </span>
                 <span className="text-[10px] font-medium font-sans tracking-[0.2em] text-teal-400 uppercase">
                   ECOSYSTEMS
                 </span>
               </div>
            </div>

            {/* Заголовок */}
            <div className="space-y-2">
              <h1 className="!font-sans text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] drop-shadow-lg">
                <span className="block text-white">
                  {c.title}
                </span>
                <span className="block text-[#22d3ee]">
                  {c.title2}
                </span>
              </h1>
              <p className="!font-sans text-base text-slate-300 font-light leading-relaxed pt-2">
                {c.subtitle}
              </p>
            </div>

            {/* 4. КНОПКИ (Вертикальный стек) */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Primary Button */}
              <button 
                onClick={handlePrimaryCta}
                className={cn(
                  "relative group w-full overflow-hidden px-6 py-6 rounded-full transition-all duration-300 font-sans",
                  "bg-gradient-to-r from-cyan-500 to-teal-400 text-white",
                  "shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]",
                  "hover:scale-[1.01] active:scale-[0.99]"
                )}
              >
                <span className="relative z-10 font-bold tracking-wide">{c.primaryCta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Secondary Button */}
              <button 
                className={cn(
                  "w-full px-6 py-4 rounded-full font-medium tracking-wide transition-all duration-300 font-sans",
                  "bg-transparent border border-slate-700/50 text-slate-300",
                  "hover:bg-white/5 hover:text-white hover:border-slate-500",
                  "active:scale-[0.99]"
                )}
              >
                {c.secondaryCta}
              </button>
            </div>
          </div>

          {/* 5. Футер карты (Статистика) */}
          <div className="relative border-t-0 p-8 md:px-12 md:py-8 bg-white/5 backdrop-blur-sm">
             {/* Градиентный разделитель */}
             <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
             
            <div className="grid grid-cols-3 gap-4 text-center md:text-left">
              {c.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-2xl md:text-3xl font-bold font-sans text-[#22d3ee] drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] font-sans">
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactFormDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        ctaText={dialogCta}
      />
    </section>
  );
}

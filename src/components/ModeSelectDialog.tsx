import { useEffect, useCallback } from "react";
import { useServiceMode, ServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Droplets, Wrench, Sparkles, Shield, Clock, Beaker, CheckCircle, Award } from "lucide-react";

/**
 * ModeSelectDialog - Модальное окно выбора режима услуг
 * 
 * Показывается ВСЕГДА при открытии сайта.
 * Закрыть можно ТОЛЬКО выбором одного из режимов.
 * Без крестика, без клика по фону, без Esc.
 * 
 * Если в URL есть ?mode=, соответствующая карточка подсвечивается как "рекомендуем".
 */
export function ModeSelectDialog() {
  const { setMode, setModeSelected, isModeSelected, suggestedMode } = useServiceMode();

  // Блокировка закрытия по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Блокируем Escape только пока модалка открыта
      if (!isModeSelected && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isModeSelected]);

  // Блокировка скролла body пока модалка открыта
  useEffect(() => {
    if (!isModeSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModeSelected]);

  // Обработчик выбора режима
  const handleSelect = useCallback((mode: ServiceMode) => {
    setMode(mode);
    setModeSelected();
  }, [setMode, setModeSelected]);

  // Если режим уже выбран, ничего не рендерим
  if (isModeSelected) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mode-select-title"
    >
      {/* Overlay - блокирует фон, нет клика для закрытия */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      
      {/* Декоративные свечения на фоне */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bio/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber/10 rounded-full blur-[100px] animate-float delay-2" />
      
      {/* Контент модалки */}
      <div 
        className={cn(
          "relative z-10 w-full max-w-2xl mx-4 p-8 md:p-12 rounded-3xl",
          "bg-gradient-to-br from-card/95 to-background/95",
          "border border-border/50 backdrop-blur-xl",
          "shadow-[0_0_100px_hsl(145_60%_45%/0.1)]",
          "animate-scale-in"
        )}
      >
        {/* Заголовок */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 text-bio mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">BIO-CUBE</span>
          </div>
          
          <h2 
            id="mode-select-title"
            className="font-serif text-3xl md:text-4xl font-bold mb-4"
          >
            Что вам нужно?
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Выберите направление, чтобы мы показали релевантную информацию
          </p>
        </div>
        
        {/* Карточки выбора */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Установка под ключ */}
          <ModeCard
            mode="installation"
            isRecommended={suggestedMode === "installation"}
            onSelect={handleSelect}
            icon={Droplets}
            title="Установка под ключ"
            description="Проектируем, изготавливаем и запускаем аквариум в вашем интерьере. Тихо. Чисто. С гарантией."
            badges={[
              { icon: Shield, text: "Гарантия 5 лет" },
              { icon: Award, text: "15+ лет опыта" },
            ]}
            color="bio"
          />
          
          {/* Обслуживание / спасение */}
          <ModeCard
            mode="service"
            isRecommended={suggestedMode === "service"}
            onSelect={handleSelect}
            icon={Wrench}
            title="Обслуживание / спасение"
            description="Диагностика, чистка, лечение рыб, борьба с водорослями. Снимем головную боль."
            badges={[
              { icon: Clock, text: "Выезд за 24ч" },
              { icon: Beaker, text: "Анализ воды" },
            ]}
            color="amber"
          />
        </div>
      </div>
    </div>
  );
}

// Карточка выбора режима
interface ModeCardProps {
  mode: ServiceMode;
  isRecommended: boolean;
  onSelect: (mode: ServiceMode) => void;
  icon: React.ElementType;
  title: string;
  description: string;
  badges: { icon: React.ElementType; text: string }[];
  color: "bio" | "amber";
}

function ModeCard({ 
  mode, 
  isRecommended, 
  onSelect, 
  icon: Icon, 
  title, 
  description, 
  badges, 
  color 
}: ModeCardProps) {
  const colorClasses = {
    bio: {
      border: "hover:border-bio/50",
      shadow: "hover:shadow-[0_0_60px_hsl(145_60%_45%/0.2)]",
      ring: "focus:ring-bio/50",
      icon: "bg-gradient-bio",
      text: "group-hover:text-bio",
      badge: "badge-bio",
      recommended: "border-bio/50 bg-bio/5",
      recommendedBadge: "bg-bio text-primary-foreground",
    },
    amber: {
      border: "hover:border-amber/50",
      shadow: "hover:shadow-[0_0_60px_hsl(38_90%_55%/0.2)]",
      ring: "focus:ring-amber/50",
      icon: "bg-gradient-amber",
      text: "group-hover:text-amber",
      badge: "badge-amber",
      recommended: "border-amber/50 bg-amber/5",
      recommendedBadge: "bg-amber text-primary-foreground",
    },
  };
  
  const c = colorClasses[color];

  return (
    <button
      onClick={() => onSelect(mode)}
      className={cn(
        "group relative p-6 md:p-8 rounded-2xl text-left",
        "bg-gradient-to-br from-muted/50 to-muted/20",
        "border transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        c.border,
        c.shadow,
        c.ring,
        isRecommended ? c.recommended : "border-border/50"
      )}
    >
      {/* Бейдж "Рекомендуем" */}
      {isRecommended && (
        <div className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium",
          "flex items-center gap-1.5",
          c.recommendedBadge
        )}>
          <CheckCircle className="w-3 h-3" />
          Рекомендуем
        </div>
      )}
      
      {/* Иконка */}
      <div className={cn(
        "w-14 h-14 rounded-xl mb-5 flex items-center justify-center",
        "text-primary-foreground",
        "group-hover:scale-110 transition-transform duration-300",
        c.icon
      )}>
        <Icon className="w-7 h-7" />
      </div>
      
      {/* Текст */}
      <h3 className={cn(
        "font-serif text-xl md:text-2xl font-bold mb-2 text-foreground transition-colors",
        c.text
      )}>
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
        {description}
      </p>
      
      {/* Бейджи */}
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, i) => (
          <span key={i} className={cn("text-xs", c.badge)}>
            <badge.icon className="w-3 h-3" />
            {badge.text}
          </span>
        ))}
      </div>
      
      {/* Стрелка при ховере */}
      <div className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2",
        "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2",
        "transition-all duration-300",
        color === "bio" ? "text-bio" : "text-amber"
      )}>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

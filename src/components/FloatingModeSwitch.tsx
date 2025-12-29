import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Droplets, Wrench, Palette } from "lucide-react";

/**
 * FloatingModeSwitch - Плавающий переключатель режима услуг
 * 
 * Фиксированная панель справа по центру экрана (desktop) или внизу (mobile).
 * Позволяет переключить режим в любой момент.
 * Синхронизирован с ServiceModeContext.
 * 
 * ВАЖНО: Скрывается когда модалка выбора режима открыта (isModeSelected === false)
 */
export function FloatingModeSwitch() {
  const { mode, setMode, isModeSelected } = useServiceMode();

  // Не показываем пока модалка открыта
  if (!isModeSelected) return null;

  return (
    <>
      {/* Desktop версия - справа по центру */}
      <div 
        className={cn(
          "hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50",
          // Узкая, но вытянутая по вертикали
          "flex-col gap-2 p-1 rounded-xl",
          "bg-card/80 backdrop-blur-xl border border-border/50",
          "shadow-[0_8px_32px_hsl(220_30%_3%/0.4)]",
          "animate-fade-in"
        )}
        role="group"
        aria-label="Переключатель режима услуг"
      >
        {/* Индикатор текущего режима */}
        <div className={cn(
          "absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full transition-all duration-300",
          mode === "installation" ? "bg-gradient-bio" : 
          mode === "service" ? "bg-gradient-amber" : "bg-gradient-bio"
        )} />
        
        {/* Кнопка "Установка" */}
        <button
          onClick={() => setMode("installation")}
          className={cn(
            "relative group flex flex-col items-center p-2.5 rounded-lg",
            "transition-all duration-300",
            mode === "installation"
              ? "bg-bio/15 text-bio"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
          title="Установка под ключ"
          aria-pressed={mode === "installation"}
        >
          <div className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300",
            mode === "installation" 
              ? "bg-gradient-bio text-primary-foreground shadow-[0_0_20px_hsl(145_60%_45%/0.3)]" 
              : "bg-muted/50 group-hover:bg-muted"
          )}>
            <Droplets className="w-5 h-5" />
          </div>
          <span className="sr-only">Установка</span>
          
          <div className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2",
            "px-3 py-2 rounded-lg bg-card border border-border/50 shadow-lg",
            "text-xs font-medium whitespace-nowrap",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
          )}>
            Установка под ключ
          </div>
        </button>
        
        {/* Разделитель */}
        <div className="w-8 h-px bg-border/50 mx-auto" />
        
        {/* Кнопка "Обслуживание" */}
        <button
          onClick={() => setMode("service")}
          className={cn(
            "relative group flex flex-col items-center p-2.5 rounded-lg",
            "transition-all duration-300",
            mode === "service"
              ? "bg-amber/15 text-amber"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
          title="Обслуживание / спасение"
          aria-pressed={mode === "service"}
        >
          <div className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300",
            mode === "service" 
              ? "bg-gradient-amber text-primary-foreground shadow-[0_0_20px_hsl(38_90%_55%/0.3)]" 
              : "bg-muted/50 group-hover:bg-muted"
          )}>
            <Wrench className="w-5 h-5" />
          </div>
          <span className="sr-only">Сервис</span>
          
          <div className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2",
            "px-3 py-2 rounded-lg bg-card border border-border/50 shadow-lg",
            "text-xs font-medium whitespace-nowrap",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
          )}>
            Обслуживание / спасение
          </div>
        </button>

        {/* Разделитель */}
        <div className="w-8 h-px bg-border/50 mx-auto" />

        {/* Кнопка "Декорирование" */}
        <button
          onClick={() => setMode("decoration")}
          className={cn(
            "relative group flex flex-col items-center p-2.5 rounded-lg",
            "transition-all duration-300",
            mode === "decoration"
              ? "bg-bio/15 text-bio"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
          title="Декорирование"
          aria-pressed={mode === "decoration"}
        >
          <div className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300",
            mode === "decoration" 
              ? "bg-gradient-bio text-primary-foreground shadow-[0_0_20px_hsl(145_60%_45%/0.3)]" 
              : "bg-muted/50 group-hover:bg-muted"
          )}>
            <Palette className="w-5 h-5" />
          </div>
          <span className="sr-only">Декор</span>
          
          <div className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2",
            "px-3 py-2 rounded-lg bg-card border border-border/50 shadow-lg",
            "text-xs font-medium whitespace-nowrap",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
          )}>
            Декорирование
          </div>
        </button>
      </div>
      
      {/* Mobile версия - внизу экрана */}
      <div 
        className={cn(
          "md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-1 p-1.5 rounded-full",
          "bg-card/90 backdrop-blur-xl border border-border/50",
          "shadow-[0_8px_32px_hsl(220_30%_3%/0.5)]",
          "animate-fade-in"
        )}
        role="group"
        aria-label="Переключатель режима услуг"
      >
        {/* Кнопка "Установка" */}
        <button
          onClick={() => setMode("installation")}
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium",
            mode === "installation"
              ? "bg-gradient-bio text-primary-foreground shadow-[0_0_20px_hsl(145_60%_45%/0.3)]"
              : "text-muted-foreground active:bg-muted/50"
          )}
          aria-pressed={mode === "installation"}
        >
          <Droplets className="w-4 h-4" />
          <span>Установка</span>
        </button>
        
        {/* Кнопка "Сервис" */}
        <button
          onClick={() => setMode("service")}
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium",
            mode === "service"
              ? "bg-gradient-amber text-primary-foreground shadow-[0_0_20px_hsl(38_90%_55%/0.3)]"
              : "text-muted-foreground active:bg-muted/50"
          )}
          aria-pressed={mode === "service"}
        >
          <Wrench className="w-4 h-4" />
          <span>Сервис</span>
        </button>

        {/* Кнопка "Декор" */}
        <button
          onClick={() => setMode("decoration")}
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium",
            mode === "decoration"
              ? "bg-gradient-bio text-primary-foreground shadow-[0_0_20px_hsl(145_60%_45%/0.3)]"
              : "text-muted-foreground active:bg-muted/50"
          )}
          aria-pressed={mode === "decoration"}
        >
          <Palette className="w-4 h-4" />
          <span>Декор</span>
        </button>
      </div>
    </>
  );
}

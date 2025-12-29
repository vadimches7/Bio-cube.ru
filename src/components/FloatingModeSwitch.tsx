import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Droplets, Wrench, Palette } from "lucide-react";

/**
 * FloatingModeSwitch - Плавающий переключатель режима услуг
 * Glass OS 26 стиль
 */
export function FloatingModeSwitch() {
  const { mode, setMode } = useServiceMode();

  return (
    <>
      {/* Desktop версия - справа по центру, Glass OS 26 стиль */}
      <div 
        className={cn(
          "hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50",
          "flex-col gap-2 p-2",
          // Glass OS эффект
          "bg-white/5 backdrop-blur-2xl",
          "border border-white/10",
          "rounded-[24px]",
          "shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.1)]",
          "animate-fade-in"
        )}
        role="group"
        aria-label="Переключатель режима услуг"
      >
        
        {/* Кнопка "Установка" */}
        <button
          onClick={() => setMode("installation")}
          className={cn(
            "relative group flex items-center justify-center p-3 rounded-[16px]",
            "transition-all duration-300",
            mode === "installation"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
          )}
          title="Установка под ключ"
          aria-pressed={mode === "installation"}
        >
          <Droplets className="w-5 h-5" />
          
          <div className={cn(
            "absolute right-full mr-4 top-1/2 -translate-y-1/2",
            "px-4 py-2 rounded-[12px]",
            "bg-white/5 backdrop-blur-2xl border border-white/10",
            "text-xs font-medium whitespace-nowrap text-white",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0",
            "shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          )}>
            Установка под ключ
          </div>
        </button>
        
        {/* Кнопка "Обслуживание" */}
        <button
          onClick={() => setMode("service")}
          className={cn(
            "relative group flex items-center justify-center p-3 rounded-[16px]",
            "transition-all duration-300",
            mode === "service"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
          )}
          title="Обслуживание / спасение"
          aria-pressed={mode === "service"}
        >
          <Wrench className="w-5 h-5" />
          
          <div className={cn(
            "absolute right-full mr-4 top-1/2 -translate-y-1/2",
            "px-4 py-2 rounded-[12px]",
            "bg-white/5 backdrop-blur-2xl border border-white/10",
            "text-xs font-medium whitespace-nowrap text-white",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0",
            "shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          )}>
            Обслуживание / спасение
          </div>
        </button>

        {/* Кнопка "Декорирование" */}
        <button
          onClick={() => setMode("decoration")}
          className={cn(
            "relative group flex items-center justify-center p-3 rounded-[16px]",
            "transition-all duration-300",
            mode === "decoration"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
          )}
          title="Декорирование"
          aria-pressed={mode === "decoration"}
        >
          <Palette className="w-5 h-5" />
          
          <div className={cn(
            "absolute right-full mr-4 top-1/2 -translate-y-1/2",
            "px-4 py-2 rounded-[12px]",
            "bg-white/5 backdrop-blur-2xl border border-white/10",
            "text-xs font-medium whitespace-nowrap text-white",
            "opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-all duration-200 -translate-x-2 group-hover:translate-x-0",
            "shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          )}>
            Декорирование
          </div>
        </button>
      </div>
      
      {/* Mobile версия - внизу экрана, Glass OS стиль */}
      <div 
        className={cn(
          "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-2 p-2",
          "bg-white/5 backdrop-blur-2xl",
          "border border-white/10",
          "rounded-full",
          "shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.1)]",
          "animate-fade-in"
        )}
        role="group"
        aria-label="Переключатель режима услуг"
      >
        {/* Кнопка "Установка" */}
        <button
          onClick={() => setMode("installation")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium font-sans",
            mode === "installation"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400"
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
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium font-sans",
            mode === "service"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400"
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
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "transition-all duration-300 text-sm font-medium font-sans",
            mode === "decoration"
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              : "bg-white/5 text-slate-400"
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

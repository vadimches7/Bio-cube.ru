import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Droplets, Wrench } from "lucide-react";

export function ServiceModeSwitch() {
  const { mode, setMode } = useServiceMode();
  
  return (
    <div className="inline-flex items-center p-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
      <button
        onClick={() => setMode("installation")}
        className={cn(
          "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
          mode === "installation"
            ? "bg-gradient-bio text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Droplets className="w-4 h-4" />
        <span className="hidden sm:inline">Установка под ключ</span>
        <span className="sm:hidden">Установка</span>
      </button>
      <button
        onClick={() => setMode("service")}
        className={cn(
          "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
          mode === "service"
            ? "bg-gradient-amber text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Wrench className="w-4 h-4" />
        <span className="hidden sm:inline">Обслуживание / спасение</span>
        <span className="sm:hidden">Обслуживание</span>
      </button>
    </div>
  );
}

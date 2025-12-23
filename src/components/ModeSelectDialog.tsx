import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { Droplets, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Модальное окно выбора режима услуг
 * Показывается ВСЕГДА при загрузке страницы
 * Блокирует фон, закрыть можно только выбором режима
 */
export function ModeSelectDialog() {
  const { mode, setMode } = useServiceMode();
  const [open, setOpen] = useState(true);

  // Всегда показываем модалку при загрузке
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleModeSelect = (selectedMode: "installation" | "service") => {
    setMode(selectedMode);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogPortal>
        {/* Overlay с блокировкой фона */}
        <DialogOverlay 
          className="bg-black/90 backdrop-blur-sm z-[100]"
          onClick={(e) => e.preventDefault()} // Блокируем клик по фону
        />
        
        {/* Кастомный DialogContent без кнопки закрытия и с блокировкой */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[101] grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-border/50 bg-gradient-card backdrop-blur-xl p-6 shadow-xl duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "sm:rounded-lg"
          )}
          onInteractOutside={(e) => e.preventDefault()} // Блокируем закрытие при клике вне
          onEscapeKeyDown={(e) => e.preventDefault()} // Блокируем закрытие по ESC
        >
          {/* Заголовок */}
          <div className="text-center space-y-2 mb-6 relative z-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Что вам нужно?
            </h2>
            <p className="text-sm text-muted-foreground">
              Выберите режим работы с нами
            </p>
          </div>

          {/* Кнопки выбора режима */}
          <div className="space-y-3 relative z-10">
            {/* Установка под ключ */}
            <Button
              onClick={() => handleModeSelect("installation")}
              variant="bio"
              size="lg"
              className={cn(
                "w-full h-auto py-6 px-6 flex flex-col items-center gap-3",
                "bg-gradient-bio hover:scale-105 transition-all duration-300",
                "hover:shadow-[0_0_40px_hsl(145_60%_45%/0.4)]",
                "border-2 border-transparent hover:border-bio/50"
              )}
            >
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6" />
                <span className="text-lg font-semibold">Установка под ключ</span>
              </div>
              <p className="text-sm opacity-90 text-left w-full">
                Проектируем, изготавливаем и запускаем экосистему под вашу архитектуру
              </p>
            </Button>

            {/* Обслуживание / спасение */}
            <Button
              onClick={() => handleModeSelect("service")}
              variant="amber"
              size="lg"
              className={cn(
                "w-full h-auto py-6 px-6 flex flex-col items-center gap-3",
                "bg-gradient-amber hover:scale-105 transition-all duration-300",
                "hover:shadow-[0_0_40px_hsl(38_90%_55%/0.4)]",
                "border-2 border-transparent hover:border-amber/50"
              )}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-6 h-6" />
                <span className="text-lg font-semibold">Обслуживание / спасение</span>
              </div>
              <p className="text-sm opacity-90 text-left w-full">
                Спасём аквариум и вернём прозрачную воду без грязи
              </p>
            </Button>
          </div>

          {/* Декоративные элементы */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-lg">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-bio/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber/5 rounded-full blur-3xl animate-float delay-2" />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}


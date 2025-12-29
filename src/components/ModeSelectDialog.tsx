import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { useServiceMode, ServiceMode } from "@/contexts/ServiceModeContext";
import { Droplets, Wrench, Palette, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * Модальное окно выбора режима услуг
 * Показывается ВСЕГДА при загрузке страницы
 * Блокирует фон, закрыть можно только выбором режима
 */
export function ModeSelectDialog() {
  const { setMode, setModeSelected } = useServiceMode();
  const [open, setOpen] = useState(true);

  // Всегда показываем модалку при загрузке
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleModeSelect = (selectedMode: ServiceMode) => {
    setMode(selectedMode);
    setModeSelected();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogPortal>
        {/* Overlay с блокировкой фона */}
        <DialogOverlay 
          className="bg-black/95 backdrop-blur-md z-[100]"
          onClick={(e) => e.preventDefault()} // Блокируем клик по фону
        />
        
        {/* Кастомный DialogContent без кнопки закрытия и с блокировкой */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[101] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] border border-border/20 bg-black/80 backdrop-blur-xl shadow-2xl duration-200 p-0 overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "sm:rounded-2xl"
          )}
          onInteractOutside={(e) => e.preventDefault()} // Блокируем закрытие при клике вне
          onEscapeKeyDown={(e) => e.preventDefault()} // Блокируем закрытие по ESC
        >
          {/* Шапка с фото команды */}
          <div className="relative h-48 w-full overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
             <img 
               src="/brand/team-modal.jpg" 
               alt="Команда BioCube" 
               className="w-full h-full object-cover object-center"
             />
             <div className="absolute bottom-6 left-0 right-0 text-center z-20">
               <h2 className="text-3xl font-serif font-bold text-white drop-shadow-lg">
                 Выберите направление
               </h2>
             </div>
          </div>

          {/* Грид с карточками */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            {/* Карточка: Установка */}
            <button
              onClick={() => handleModeSelect("installation")}
              className="group w-full text-left relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-bio/50 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-bio/10 text-bio group-hover:bg-bio group-hover:text-black transition-colors">
                  <Droplets className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-white">Установка аквариума под ключ</h3>
                  </div>
                  <p className="text-sm text-gray-400">Проект → производство → запуск</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="border-white/20 text-gray-300">Под интерьер</Badge>
                    <Badge variant="outline" className="border-white/20 text-gray-300">С гарантией</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Рассчитать проект</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-bio group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            {/* Карточка: Обслуживание (Рекомендуем) */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                 <Badge className="bg-amber-500 hover:bg-amber-600 text-black font-medium border-none px-3 py-0.5 shadow-lg shadow-amber-500/20">
                   Рекомендуем
                 </Badge>
              </div>
              <button
                onClick={() => handleModeSelect("service")}
                className="group w-full text-left relative overflow-hidden rounded-xl border border-amber/20 bg-gradient-to-b from-amber/5 to-transparent p-5 hover:bg-amber/10 hover:border-amber/50 transition-all duration-300 hover:scale-[1.01] shadow-[0_0_20px_-10px_rgba(251,191,36,0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-amber/10 text-amber group-hover:bg-amber group-hover:text-black transition-colors">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg text-white">Обслуживание аквариума</h3>
                    <p className="text-sm text-gray-400">Поддержка / спасение / регулярный сервис</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="border-white/20 text-gray-300">Выезд за 24ч</Badge>
                      <Badge variant="outline" className="border-white/20 text-gray-300">Анализ воды</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Вызвать специалиста</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </div>

            {/* Карточка: Декорирование */}
            <button
              onClick={() => handleModeSelect("decoration")}
              className="group w-full text-left relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-bio/50 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-bio/10 text-bio group-hover:bg-bio group-hover:text-black transition-colors">
                  <Palette className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg text-white">Декорирование аквариумов</h3>
                  <p className="text-sm text-gray-400">Декорирование и художественные композиции</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="border-white/20 text-gray-300">Стили</Badge>
                    <Badge variant="outline" className="border-white/20 text-gray-300">Кастомные решения</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Смотреть декоры</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-bio group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

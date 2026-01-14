import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VirtualTryOn() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#4DB6AC]/5 to-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and Upload */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 text-balance">
                Посмотрите, как BioCube изменит ваше пространство
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Загрузите фото своей комнаты и увидите, как интеллектуальный аквариум впишется в ваш интерьер
              </p>
            </div>

            <Button
              size="lg"
              className="group relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 text-gray-700 hover:bg-white/60 hover:border-[#4DB6AC]/40 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6 text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4DB6AC]/10 via-[#26A69A]/10 to-[#4DB6AC]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Upload className="mr-3 h-5 w-5 text-[#4DB6AC]" />
              Загрузить фото комнаты
            </Button>

            <div className="pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#4DB6AC] mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Наша нейросеть автоматически рассчитает освещение и тени для идеальной вписки в интерьер
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#26A69A] mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Примерка занимает 15 секунд, результат в фотореалистичном качестве
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Before/After Slider */}
          <div className="relative">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* After Image (BioCube installed) */}
              <div className="absolute inset-0">
                <img src="/room-after.jpg" alt="С BioCube" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#4DB6AC]/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg">
                  Стало
                </div>
              </div>

              {/* Before Image (Empty wall) - clipped by slider position */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img src="/room-before.jpg" alt="Без BioCube" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-4 py-2 bg-gray-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg">
                  Было
                </div>
              </div>

              {/* Slider Handle */}
              <div className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl" style={{ left: `${sliderPosition}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#4DB6AC]">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                    <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Caption below slider */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#4DB6AC]/10 to-[#26A69A]/10 rounded-xl border border-[#4DB6AC]/20">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                <span className="font-medium text-[#4DB6AC]">AI-расчёт освещения:</span> Нейросеть автоматически
                рассчитывает реалистичное распределение света, тени и блики для идеальной интеграции в ваш интерьер
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Скрины отзывов лежат в `public/reviews/` и доступны по URL `/reviews/<name>`.
 * Сейчас ожидаем нумерацию: 001.jpg ... 061.jpg
 */
const REVIEW_IMAGES_COUNT = 61;
const reviewImageUrls = Array.from({ length: REVIEW_IMAGES_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/reviews/${n}.jpg`;
});

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-20 bg-[#020617] font-sans overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4">
        {/* Заголовок */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Отзывы{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              клиентов
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Реальные отзывы с платформы Profi.ru
          </p>
          
          {/* Рейтинг */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-slate-400 text-sm">• {REVIEW_IMAGES_COUNT} отзывов</span>
          </div>
        </div>

        {/* Карусель отзывов */}
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Carousel opts={{ align: "start", loop: true }} className="relative">
            <CarouselContent className="-ml-4 py-2">
              {reviewImageUrls.map((src, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className={cn(
                    "group relative h-full overflow-hidden backdrop-blur-2xl transition-all duration-500",
                    "bg-white/5 hover:bg-white/8",
                    "border border-white/10 hover:border-white/20",
                    "rounded-[24px]",
                    "shadow-[0_0_30px_rgba(0,0,0,0.3)]",
                    "hover:scale-[1.02] hover:-translate-y-1",
                    "cursor-pointer"
                  )}>
                    {/* Верхний блик */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    <div className="p-4">
                      {/* Изображение отзыва */}
                      <div className="relative rounded-[16px] overflow-hidden bg-white border border-white/10 mb-3">
                        <div className="relative h-48 md:h-56">
                          <img
                            src={src}
                            alt={`Отзыв ${i + 1}`}
                            className="absolute inset-0 w-full h-full object-contain bg-white p-2"
                            loading={i < 6 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>
                      
                      {/* Метаданные */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">
                          Отзыв #{String(i + 1).padStart(3, "0")}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                          <span className="text-cyan-400 font-semibold">5.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Нижняя подсветка при hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-cyan-500 to-teal-500" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Кнопки навигации в Glass OS стиле */}
            <CarouselPrevious className={cn(
              "-left-4 md:-left-6 top-1/2 -translate-y-1/2",
              "w-12 h-12 rounded-full",
              "bg-white/10 backdrop-blur-2xl border border-white/20",
              "hover:bg-white/15 hover:border-cyan-400/50 hover:scale-110",
              "text-white hover:text-cyan-400",
              "shadow-[0_0_30px_rgba(0,0,0,0.5)]",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )} />
            <CarouselNext className={cn(
              "-right-4 md:-right-6 top-1/2 -translate-y-1/2",
              "w-12 h-12 rounded-full",
              "bg-white/10 backdrop-blur-2xl border border-white/20",
              "hover:bg-white/15 hover:border-cyan-400/50 hover:scale-110",
              "text-white hover:text-cyan-400",
              "shadow-[0_0_30px_rgba(0,0,0,0.5)]",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )} />
          </Carousel>
        </div>
      </div>
    </section>
  );
}



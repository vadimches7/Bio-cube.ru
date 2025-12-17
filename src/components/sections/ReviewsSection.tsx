import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * Скрины отзывов лежат в `public/reviews/` и доступны по URL `/reviews/<name>`.
 * Сейчас ожидаем нумерацию: 001.jpg ... 061.jpg
 *
 * Если добавите больше — увеличьте REVIEW_IMAGES_COUNT (или перейдём на явный массив/JSON).
 */
const REVIEW_IMAGES_COUNT = 61;
const reviewImageUrls = Array.from({ length: REVIEW_IMAGES_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/reviews/${n}.jpg`;
});

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Отзывы{" "}
            <span className="text-gradient-bio">клиентов</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Скриншоты реальных отзывов (листайте)
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} className="relative">
            <CarouselContent>
              {reviewImageUrls.map((src, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="card-premium p-4 h-full">
                    <div className="rounded-xl overflow-hidden bg-muted/20 border border-border/50">
                      <div className="relative h-44 md:h-52 lg:h-56">
                        <img
                          src={src}
                          alt={`Отзыв ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-contain"
                          loading={i < 3 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Отзыв #{String(i + 1).padStart(3, "0")}</span>
                      <span>Profi</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Важно: у вас дефолтные кнопки с absolute и смещениями - переопределяем на компактные */}
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}



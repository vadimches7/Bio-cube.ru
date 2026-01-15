import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4DB6AC] via-[#4DB6AC] to-[#26A69A] p-12 md:p-16 shadow-2xl shadow-[#4DB6AC]/25">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Бесплатная консультация</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight text-balance">
              Готовы начать биохакинг пространства?
            </h2>

            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Создайте персональную экосистему вместе с&nbsp;нашими экспертами. Первая консультация бесплатно.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="bg-white text-[#4DB6AC] hover:bg-white/90 rounded-full px-8 shadow-xl transition-all hover:-translate-y-0.5"
              >
                Получить Bio-паспорт проекта
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Droplets, Waves, ArrowRight, Camera, CheckCircle } from "lucide-react";

/**
 * ServiceFreshMarineSection — “Пресный / Морской сервис” + 3 мини-кейса (с фото-плейсхолдерами)
 * Только для service.
 *
 * Фото-плейсхолдеры: сейчас это премиальные градиенты + бейдж “Фото”.
 * Потом можно заменить на реальные картинки, подставив imageUrl.
 */

const types = [
  {
    icon: Droplets,
    title: "Пресный аквариум",
    points: [
      "часто проблема в балансе света/корма/фильтрации",
      "настраиваем режим и убираем водоросли без “магии”",
      "добиваемся стабильности и понятного ухода",
    ],
  },
  {
    icon: Waves,
    title: "Морской аквариум",
    points: [
      "важна стабильность и аккуратность действий",
      "работаем по плану и следим за динамикой",
      "бережно к кораллам и чувствительным обитателям",
    ],
  },
];

const miniCases = [
  {
    title: "Пресный: водоросли и зелёная вода",
    before: "Зелёная вода + налёт на стёклах",
    did: "Диагностика, настройка света/режима, чистка, план стабилизации",
    after: "Прозрачнее, налёт ушёл, режим понятен",
    imageGradient: "linear-gradient(135deg, hsl(145 45% 18%) 0%, hsl(160 40% 12%) 100%)",
  },
  {
    title: "Морской: муть и нестабильность",
    before: "Муть, стресс у рыб, “не тянет” фильтрация",
    did: "Обслуживание фильтра, корректировка режима, контроль",
    after: "Система работает ровнее, вода стабильнее",
    imageGradient: "linear-gradient(135deg, hsl(200 45% 18%) 0%, hsl(210 40% 12%) 100%)",
  },
  {
    title: "Запущенный: запах и ил",
    before: "Давно не обслуживали, запах, ил, рыбы “на грани”",
    did: "Глубокая чистка + подмена по ситуации, настройка фильтра, план",
    after: "Запах ушёл, вода чище, система в стабильном режиме",
    imageGradient: "linear-gradient(135deg, hsl(38 55% 18%) 0%, hsl(30 45% 12%) 100%)",
  },
];

export function ServiceFreshMarineSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Типы аквариумов</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Пресный или{" "}
            <span className="text-gradient-amber">морской</span> — поможем
          </h2>
          <p className="text-lg text-muted-foreground">
            Подход разный — мы это учитываем.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {types.map((t, i) => (
            <div key={i} className="card-premium p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <t.icon className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">Коротко по делу</p>
                </div>
              </div>

              <ul className="space-y-2">
                {t.points.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-center">
            Мини‑кейсы{" "}
            <span className="text-gradient-amber">до / после</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {miniCases.map((c, i) => (
              <div
                key={i}
                className="card-premium overflow-hidden"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                }}
              >
                {/* Photo placeholder */}
                <div className="h-48 relative" style={{ background: c.imageGradient }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/70 border border-border/50 backdrop-blur text-xs text-muted-foreground">
                    <Camera className="w-3 h-3 text-amber" />
                    Фото (плейсхолдер)
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-serif text-lg font-semibold mb-3">{c.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-destructive font-medium">Было:</span>
                      <span className="text-muted-foreground">{c.before}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-amber font-medium">Сделали:</span>
                      <span className="text-muted-foreground">{c.did}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-bio font-medium">Стало:</span>
                      <span className="text-muted-foreground">{c.after}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
              Описать проблему
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Описать проблему"
        formName="service_fresh_marine"
      />
    </section>
  );
}















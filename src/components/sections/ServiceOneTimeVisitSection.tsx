import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { ArrowRight, CheckCircle, Crown } from "lucide-react";

/**
 * ServiceOneTimeVisitSection — “Для чего нужен разовый выезд”
 * Только для service.
 */

const bullets = [
  "нужно срочно “привести в порядок”",
  "мутная вода/зелень/запах — не понимаете причину",
  "рыбы болеют/гибнут — нужна диагностика и лечение",
  "после отпуска/переезда всё поехало",
  "оборудование шумит/не работает/течёт",
  "хотите один раз настроить систему, дальше вести сами",
];

export function ServiceOneTimeVisitSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
          <div className="card-premium p-6 md:p-8">
            <span className="badge-amber mb-4 inline-flex">Разовый выезд</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Когда нужен{" "}
              <span className="text-gradient-amber">разовый выезд</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Это нормально — иногда достаточно “одного сильного визита”, чтобы всё стало стабильно.
            </p>

            <ul className="space-y-3 mb-6">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
              Нужен разовый выезд
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="card-premium p-6 md:p-8">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-1">Честная подсказка</h3>
                <p className="text-sm text-muted-foreground">
                  Если проблемы повторяются — лучше кураторство 2–4 визита в месяц.
                </p>
              </div>
            </div>

            <div className={cn("rounded-xl border border-border/50 bg-muted/20 p-4")}>
              <p className="text-sm text-muted-foreground">
                Так спокойнее: мы держим систему в стабильности и ловим проблемы на ранней стадии.
              </p>
            </div>

            <div className="mt-6">
              <Button
                variant="outline-light"
                size="lg"
                className="w-full"
                onClick={() => setDialogOpen(true)}
              >
                Подобрать формат
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Нужен разовый выезд"
        formName="service_one_time_visit"
        prefillComment="Нужен разовый сервисный визит. Опишите проблему и примерный объём аквариума."
      />
    </section>
  );
}















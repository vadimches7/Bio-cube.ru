import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { MessageSquare, Zap, Beaker, ClipboardList, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { useState } from "react";

/**
 * ServiceHowItWorksSection — “Как проходит сервис” (шаги)
 *
 * Разговорная, понятная секция. Только для service.
 */

const steps = [
  {
    icon: MessageSquare,
    title: "Заявка",
    text: "Вы описываете проблему (можно фото/видео).",
  },
  {
    icon: Zap,
    title: "Срочность",
    text: "Обычный выезд или экстренно — до 4 часов (если всё критично).",
  },
  {
    icon: Beaker,
    title: "Диагностика",
    text: "На месте смотрим воду, оборудование, рыб и режим.",
  },
  {
    icon: ClipboardList,
    title: "Причина + план",
    text: "Объясняем “почему так” и согласуем план: что делаем сейчас/потом.",
  },
  {
    icon: Wrench,
    title: "Работы",
    text: "Чистка, подмена, настройка, лечение — по ситуации и без лишнего.",
  },
  {
    icon: CheckCircle,
    title: "Рекомендации",
    text: "Фиксируем, что делать дальше, чтобы проблема не вернулась.",
  },
];

export function ServiceHowItWorksSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">По шагам</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Как проходит{" "}
            <span className="text-gradient-amber">сервис</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Без гаданий и “химии наугад”. Сначала причина — потом решение.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="card-premium p-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="max-w-2xl mx-auto mb-4 p-4 rounded-xl border border-border/50 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Если нужны замены/расходники —{" "}
              <span className="text-foreground font-medium">сначала согласуем</span>, потом делаем.
            </p>
          </div>

          <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
            Описать проблему
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Описать проблему"
        formName="service_how_it_works"
      />
    </section>
  );
}
















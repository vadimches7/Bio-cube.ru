import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { cn } from "@/lib/utils";
import { ArrowRight, ClipboardCheck, Lightbulb, CalendarClock, ShieldCheck, MessageCircle, Beaker } from "lucide-react";

/**
 * ServiceAfterDiagnosticsSection — “Что вы получаете после диагностики”
 * Только для service. Сильный “артефакт” вместо абстракций.
 */

const items = [
  {
    icon: Lightbulb,
    title: "Причина проблемы",
    text: "Понятно объясняем, что пошло не так и почему это произошло.",
  },
  {
    icon: ClipboardCheck,
    title: "План стабилизации",
    text: "Что сделать сегодня и что делать в течение недели.",
  },
  {
    icon: Beaker,
    title: "Рекомендации по режиму",
    text: "Свет, корм, подмены, фильтрация — без “советов из интернета”.",
  },
  {
    icon: ShieldCheck,
    title: "Приоритеты",
    text: "Что критично прямо сейчас, а что можно спокойно сделать позже.",
  },
  {
    icon: CalendarClock,
    title: "Прогноз по срокам",
    text: "Когда станет лучше и какие “точки контроля” важны.",
  },
  {
    icon: MessageCircle,
    title: "Поддержка",
    text: "Можно уточнить вопросы в мессенджере после визита.",
  },
];

export function ServiceAfterDiagnosticsSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Результат</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Что вы получите{" "}
            <span className="text-gradient-amber">после диагностики</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Мы не просто “проверяем воду”. Мы даём понятный план, чтобы проблема не вернулась.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <div key={i} className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center mb-4">
                <it.icon className="w-6 h-6 text-amber" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
            Нужна диагностика
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Нужна диагностика"
        formName="service_after_diagnostics"
        prefillComment="Хочу диагностику и план стабилизации. Опишите, что происходит с аквариумом."
      />
    </section>
  );
}
















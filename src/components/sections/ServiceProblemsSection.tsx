import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import {
  Droplets,
  Leaf,
  Bug,
  ShieldAlert,
  Volume2,
  RefreshCw,
  CalendarCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

/**
 * ServiceProblemsSection — “Если у вас… — мы поможем”
 *
 * Разговорный блок problem → solution → result.
 * Показ только в режиме service.
 */

const cards = [
  {
    icon: Droplets,
    title: "Мутная вода / “снежок”",
    text: "Найдём причину, стабилизируем параметры, вернём прозрачность.",
  },
  {
    icon: Leaf,
    title: "Водоросли, зелень, налёт",
    text: "Уберём вспышку и настроим систему так, чтобы не возвращалось.",
  },
  {
    icon: Bug,
    title: "Рыбы болеют / гибнут",
    text: "Диагностика + лечение. Минимизируем потери, объясним, что делать дальше.",
  },
  {
    icon: ShieldAlert,
    title: "Запах, грязь, ил",
    text: "Глубокая чистка + настройка фильтрации — станет заметно легче дышать.",
  },
  {
    icon: Volume2,
    title: "Шумит/течёт оборудование",
    text: "Проверим, починим/настроим — сделаем тихо и безопасно.",
  },
  {
    icon: RefreshCw,
    title: "Давно не обслуживали",
    text: "“Реанимация” без паники — шаг за шагом вернём стабильность.",
  },
  {
    icon: CalendarCheck,
    title: "Нужен регулярный уход",
    text: "Абонемент/кураторство 2–4 визита в месяц — вы живёте, мы обслуживаем.",
  },
];

export function ServiceProblemsSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber/6 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber/4 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Сервис</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Если с аквариумом{" "}
            <span className="text-gradient-amber">что‑то не так</span> — поможем
          </h2>
          <p className="text-lg text-muted-foreground">
            Москва и МО. В экстренных случаях — выезд{" "}
            <span className="text-amber font-medium">до 4 часов</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="card-premium p-6 group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  "bg-amber/10 group-hover:bg-amber/20"
                )}
              >
                <c.icon className="w-6 h-6 text-amber" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-amber transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
            Описать проблему
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => setDialogOpen(true)}
            className="group"
          >
            <Zap className="w-4 h-4 text-amber group-hover:text-foreground transition-colors" />
            Срочно (до 4 часов)
          </Button>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Вызвать специалиста"
        formName="service_problems"
        prefillComment="СРОЧНО: нужна помощь (выезд до 4 часов). Опишите, что происходит с аквариумом."
      />
    </section>
  );
}















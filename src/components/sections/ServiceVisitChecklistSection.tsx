import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import {
  CheckCircle,
  Beaker,
  Settings,
  Droplets,
  Fish,
  Lightbulb,
  Thermometer,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

/**
 * ServiceVisitChecklistSection — “Что делаем за визит” + “Диагностика”
 *
 * Показ только в режиме service.
 */

const visitIncludes = [
  "Проверяем воду и смотрим динамику параметров",
  "Осматриваем фильтрацию, циркуляцию, аэрацию",
  "Проверяем нагрев/температуру и стабильность",
  "Оцениваем свет и режим (частая причина водорослей)",
  "Чистим стёкла и проблемные зоны",
  "Делаем подмену воды (объём — по ситуации)",
  "Обслуживаем фильтры аккуратно, без “убить биологию”",
  "Если рыбы болеют — подбираем схему лечения",
  "Фиксируем план: что делаем сейчас и что позже",
];

const diagnostics = [
  { icon: Beaker, title: "Расширенный анализ воды", text: "Проверяем ключевые параметры и отклонения." },
  { icon: Settings, title: "Оборудование", text: "Фильтр, циркуляция, аэрация, СО2 (если есть)." },
  { icon: Lightbulb, title: "Свет и режим", text: "Подбираем режим под вашу систему и обитателей." },
  { icon: Thermometer, title: "Температура", text: "Ищем нестабильность и причины скачков." },
  { icon: Fish, title: "Состояние рыб", text: "Поведение, внешний вид, “тревожные” признаки." },
  { icon: ClipboardList, title: "Анамнез", text: "Что менялось последние 2–4 недели (корм, свет, подмены)." },
];

export function ServiceVisitChecklistSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section id="service-visit" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Прозрачность</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Что делаем <span className="text-gradient-amber">за визит</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Без “химии наугад”. Сначала понимаем причину, потом стабилизируем.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Что входит */}
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-amber" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Что обычно делаем</h3>
                <p className="text-sm text-muted-foreground">По ситуации — без лишних работ</p>
              </div>
            </div>

            <ul className="space-y-3">
              {visitIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 rounded-xl border border-border/50 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Если нужны дополнительные материалы/замены —{" "}
                <span className="text-foreground font-medium">сначала согласуем</span>, потом делаем.
              </p>
            </div>
          </div>

          {/* Диагностика */}
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                <Beaker className="w-6 h-6 text-amber" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Диагностика — без гаданий</h3>
                <p className="text-sm text-muted-foreground">Объясняем “почему так” простыми словами</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {diagnostics.map((d, i) => (
                <div key={i} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <d.icon className="w-4 h-4 text-amber" />
                    <span className="text-sm font-medium">{d.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{d.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="amber" className="w-full" onClick={() => setDialogOpen(true)}>
                Нужна диагностика
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Нужна диагностика"
        formName="service_visit_checklist"
      />
    </section>
  );
}


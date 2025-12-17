import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { MessageSquare, Ruler, Hammer, Droplets, Sparkles, HeartHandshake, ClipboardCheck, Zap } from "lucide-react";

/**
 * ProcessSection - Секция процесса работы
 * 
 * Полностью адаптирована под режим:
 * - installation: этапы создания аквариума под ключ
 * - service: этапы спасения/обслуживания
 */

const installationSteps = [
  {
    icon: MessageSquare,
    title: "Консультация",
    description: "Обсуждаем пожелания, бюджет и особенности помещения. Выезжаем на объект бесплатно.",
    duration: "1-2 дня",
  },
  {
    icon: Ruler,
    title: "Проектирование",
    description: "Создаём 3D-визуализацию, подбираем оборудование и составляем план заселения.",
    duration: "5-10 дней",
  },
  {
    icon: Hammer,
    title: "Изготовление",
    description: "Производим аквариум на собственном производстве по индивидуальным размерам.",
    duration: "2-4 недели",
  },
  {
    icon: Droplets,
    title: "Установка",
    description: "Монтируем, подключаем оборудование, заполняем водой и запускаем азотный цикл.",
    duration: "1-3 дня",
  },
  {
    icon: Sparkles,
    title: "Заселение",
    description: "После созревания воды заселяем рыб, кораллы и растения. Обучаем уходу.",
    duration: "2-4 недели",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка",
    description: "Обслуживаем по договору, консультируем, выезжаем в экстренных случаях.",
    duration: "Постоянно",
  },
];

const serviceSteps = [
  {
    icon: MessageSquare,
    title: "Заявка",
    description: "Опишите проблему (можно фото/видео) — уточним симптомы и срочность.",
    duration: "5 минут",
  },
  {
    icon: Ruler,
    title: "Диагностика",
    description: "На месте проверяем воду, оборудование и состояние рыб. Объясняем “почему так” простыми словами.",
    duration: "1-2 часа",
  },
  {
    icon: Hammer,
    title: "План стабилизации",
    description: "Согласуем план: что делаем сейчас, что позже, какие есть риски и сроки восстановления.",
    duration: "Сразу на месте",
  },
  {
    icon: Droplets,
    title: "Восстановление",
    description: "Делаем работы: чистка, подмена, настройка, лечение — по ситуации и без лишнего.",
    duration: "1-14 дней",
  },
  {
    icon: Sparkles,
    title: "Контроль",
    description: "Следим за динамикой, корректируем, добиваемся стабильности (разовый контроль или абонемент).",
    duration: "2-4 недели",
  },
  {
    icon: HeartHandshake,
    title: "Профилактика",
    description: "Предлагаем регулярное обслуживание, чтобы проблемы не повторялись (2–4 визита/мес).",
    duration: "По желанию",
  },
];

const headerData = {
  installation: {
    title: "Как мы",
    titleAccent: "работаем",
    subtitle: "Прозрачный процесс от первого звонка до запуска экосистемы",
  },
  service: {
    title: "Как спасаем",
    titleAccent: "аквариумы",
    subtitle: "Быстрая и эффективная помощь вашему аквариуму",
  },
};

export function ProcessSection() {
  const { mode } = useServiceMode();
  
  const steps = mode === "installation" ? installationSteps : serviceSteps;
  const header = headerData[mode];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className={cn(
        "absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl",
        mode === "installation" ? "bg-bio/5" : "bg-amber/5"
      )} />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {header.title}{" "}
            <span className={mode === "installation" ? "text-gradient-bio" : "text-gradient-amber"}>
              {header.titleAccent}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {header.subtitle}
          </p>
        </div>
        
        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="card-premium p-6 group relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-muted/30">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  mode === "installation"
                    ? "bg-bio/10 group-hover:bg-bio/20"
                    : "bg-amber/10 group-hover:bg-amber/20"
                )}>
                  <step.icon className={cn(
                    "w-6 h-6",
                    mode === "installation" ? "text-bio" : "text-amber"
                  )} />
                </div>
                
                {/* Content */}
                <h3 className={cn(
                  "font-serif text-xl font-semibold mb-2 transition-colors",
                  mode === "installation" ? "group-hover:text-bio" : "group-hover:text-amber"
                )}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {step.description}
                </p>
                
                {/* Duration badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>

          {/* На выходе (только service) */}
          {mode === "service" && (
            <div className="mt-8 card-premium p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-1">Что вы получите на выходе</h3>
                    <p className="text-sm text-muted-foreground">
                      Понятный план стабилизации + рекомендации, чтобы проблема не вернулась.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 text-amber text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Экстренный выезд до 4 часов
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

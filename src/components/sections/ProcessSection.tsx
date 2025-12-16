import { useServiceMode } from "@/contexts/ServiceModeContext";
import { MessageSquare, Ruler, Hammer, Droplets, Sparkles, HeartHandshake } from "lucide-react";

const installationSteps = [
  {
    icon: MessageSquare,
    title: "Консультация",
    description: "Обсуждаем пожелания, бюджет и особенности помещения. Выезжаем на объект.",
    duration: "1-2 дня",
  },
  {
    icon: Ruler,
    title: "Проектирование",
    description: "Создаём 3D-визуализацию, подбираем оборудование и обитателей.",
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
    description: "Монтируем, подключаем оборудование, заполняем водой и запускаем цикл.",
    duration: "1-3 дня",
  },
  {
    icon: Sparkles,
    title: "Заселение",
    description: "После созревания воды заселяем рыб, кораллы и растения.",
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
    description: "Опишите проблему по телефону или в форме — определим срочность.",
    duration: "5 минут",
  },
  {
    icon: Ruler,
    title: "Диагностика",
    description: "Выезжаем, тестируем воду, осматриваем оборудование и обитателей.",
    duration: "1-2 часа",
  },
  {
    icon: Hammer,
    title: "План лечения",
    description: "Составляем план восстановления с прозрачной стоимостью работ.",
    duration: "В тот же день",
  },
  {
    icon: Droplets,
    title: "Восстановление",
    description: "Проводим все процедуры: чистка, замена воды, лечение, настройка.",
    duration: "1-14 дней",
  },
  {
    icon: Sparkles,
    title: "Контроль",
    description: "Следим за параметрами, корректируем, добиваемся стабильности.",
    duration: "2-4 недели",
  },
  {
    icon: HeartHandshake,
    title: "Профилактика",
    description: "Предлагаем регулярное обслуживание, чтобы проблемы не повторялись.",
    duration: "По договору",
  },
];

export function ProcessSection() {
  const { mode } = useServiceMode();
  const steps = mode === "installation" ? installationSteps : serviceSteps;
  const title = mode === "installation" ? "Как мы работаем" : "Как спасаем аквариумы";

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient-bio">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {mode === "installation" 
              ? "Прозрачный процесс от первого звонка до запуска экосистемы"
              : "Быстрая и эффективная помощь вашему аквариуму"
            }
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
                <div className="w-12 h-12 rounded-xl bg-bio/10 flex items-center justify-center mb-4 group-hover:bg-bio/20 transition-colors">
                  <step.icon className="w-6 h-6 text-bio" />
                </div>
                
                {/* Content */}
                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-bio transition-colors">
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
        </div>
      </div>
    </section>
  );
}

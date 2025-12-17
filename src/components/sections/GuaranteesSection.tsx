import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Shield, Clock, Award, Wrench, Phone, FileCheck, HeartHandshake, Beaker, RefreshCw } from "lucide-react";

/**
 * GuaranteesSection - Секция гарантий
 * 
 * Адаптирована под режим:
 * - installation: акцент на гарантии по материалам, срокам, качеству
 * - service: акцент на результат, прозрачность, поддержку
 */

const guaranteesData = {
  installation: [
    {
      icon: Shield,
      title: "Гарантия 5 лет",
      description: "На аквариум, оборудование и работы. Бесплатный ремонт при заводском браке.",
    },
    {
      icon: FileCheck,
      title: "Договор",
      description: "Официальный договор с фиксированной стоимостью. Без скрытых платежей.",
    },
    {
      icon: Clock,
      title: "Сроки в договоре",
      description: "Фиксируем сроки письменно. Задержка по нашей вине — скидка 5% за неделю.",
    },
    {
      icon: Wrench,
      title: "Бесплатное ТО",
      description: "Первые 3 месяца после установки — бесплатное техническое обслуживание.",
    },
    {
      icon: Phone,
      title: "Экстренные выезды",
      description: "Выезжаем в течение 4 часов при критических ситуациях. 24/7.",
    },
    {
      icon: Award,
      title: "Качество обитателей",
      description: "Только здоровые рыбы и кораллы с карантина. Замена при гибели в первый месяц.",
    },
  ],
  service: [
    {
      icon: Beaker,
      title: "Точная диагностика",
      description: "Тестируем воду на 8+ параметров. Не гадаем — знаем причину проблемы.",
    },
    {
      icon: FileCheck,
      title: "Прозрачная смета",
      description: "Озвучиваем стоимость до начала работ. Никаких сюрпризов в счёте.",
    },
    {
      icon: RefreshCw,
      title: "Гарантия на работы",
      description: "Если проблема вернулась в течение месяца — исправим бесплатно.",
    },
    {
      icon: Clock,
      title: "Выезд за 24 часа",
      description: "В стандартных случаях. При гибели рыб — экстренный выезд за 4 часа.",
    },
    {
      icon: HeartHandshake,
      title: "Поддержка после",
      description: "Консультируем бесплатно. Отвечаем на вопросы в мессенджерах.",
    },
    {
      icon: Phone,
      title: "Связь 24/7",
      description: "Принимаем заявки круглосуточно. Дежурный специалист всегда на связи.",
    },
  ],
};

const headerData = {
  installation: {
    badge: "Уверенность",
    title: "Наши",
    titleAccent: "гарантии",
    subtitle: "Работаем прозрачно и отвечаем за качество на каждом этапе",
  },
  service: {
    badge: "Спокойствие",
    title: "Почему нам",
    titleAccent: "доверяют",
    subtitle: "Честная диагностика, прозрачные цены, гарантия результата",
  },
};

export function GuaranteesSection() {
  const { mode } = useServiceMode();
  
  const guarantees = guaranteesData[mode];
  const header = headerData[mode];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className={cn(
        "absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl",
        mode === "installation" ? "bg-bio/5" : "bg-amber/5"
      )} />
      <div className={cn(
        "absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl",
        mode === "installation" ? "bg-bio/3" : "bg-amber/3"
      )} />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className={mode === "installation" ? "badge-bio mb-4" : "badge-amber mb-4"}>
            {header.badge}
          </span>
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
        
        {/* Guarantees grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="card-premium p-6 group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all",
                mode === "installation"
                  ? "bg-bio/10 group-hover:bg-bio/20 group-hover:shadow-[0_0_20px_hsl(145_60%_45%/0.2)]"
                  : "bg-amber/10 group-hover:bg-amber/20 group-hover:shadow-[0_0_20px_hsl(38_90%_55%/0.2)]"
              )}>
                <item.icon className={cn(
                  "w-6 h-6",
                  mode === "installation" ? "text-bio" : "text-amber"
                )} />
              </div>
              <h3 className={cn(
                "font-serif text-xl font-semibold mb-2 transition-colors",
                mode === "installation" ? "group-hover:text-bio" : "group-hover:text-amber"
              )}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

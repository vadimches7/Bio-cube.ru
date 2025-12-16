import { Shield, Clock, Award, Wrench, Phone, FileCheck } from "lucide-react";

const guarantees = [
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
    description: "Фиксируем сроки письменно. Задержка по нашей вине — скидка 5% за каждую неделю.",
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
];

export function GuaranteesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-bio mb-4">Уверенность</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Наши{" "}
            <span className="text-gradient-bio">гарантии</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Работаем прозрачно и отвечаем за качество на каждом этапе
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
              <div className="w-12 h-12 rounded-xl bg-bio/10 flex items-center justify-center mb-4 group-hover:bg-bio/20 group-hover:glow-bio transition-all">
                <item.icon className="w-6 h-6 text-bio" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-bio transition-colors">
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

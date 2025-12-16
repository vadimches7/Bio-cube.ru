const team = [
  {
    name: "Алексей Морозов",
    role: "Основатель, главный аквариумист",
    experience: "18 лет опыта",
    description: "Специализация — морские рифовые системы. Обучался в Монако и Японии.",
    gradient: "linear-gradient(135deg, hsl(200 50% 25%) 0%, hsl(180 45% 20%) 100%)",
  },
  {
    name: "Мария Волкова",
    role: "Биолог, специалист по пресноводным системам",
    experience: "12 лет опыта",
    description: "Кандидат биологических наук. Эксперт по биотопным аквариумам и редким видам.",
    gradient: "linear-gradient(135deg, hsl(145 45% 25%) 0%, hsl(160 40% 20%) 100%)",
  },
  {
    name: "Дмитрий Соколов",
    role: "Инженер-конструктор",
    experience: "15 лет опыта",
    description: "Проектирование нестандартных конструкций. Интеграция с умным домом.",
    gradient: "linear-gradient(135deg, hsl(220 40% 25%) 0%, hsl(210 35% 20%) 100%)",
  },
  {
    name: "Елена Краснова",
    role: "Сервисный специалист",
    experience: "8 лет опыта",
    description: "Диагностика и лечение аквариумов. Более 500 успешных восстановлений.",
    gradient: "linear-gradient(135deg, hsl(38 50% 25%) 0%, hsl(30 45% 20%) 100%)",
  },
];

export function TeamSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Наша{" "}
            <span className="text-gradient-bio">команда</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Профессионалы с многолетним опытом и любовью к делу
          </p>
        </div>
        
        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="card-premium group overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Avatar placeholder */}
              <div 
                className="h-48 relative overflow-hidden"
                style={{ background: member.gradient }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center text-3xl font-serif font-bold text-foreground/40">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="caustic-overlay opacity-20" />
              </div>
              
              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-bio transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-bio mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {member.description}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                  {member.experience}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

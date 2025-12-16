import { Award, Shield, Users, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Лет на рынке" },
  { icon: Users, value: "500+", label: "Довольных клиентов" },
  { icon: Shield, value: "5 лет", label: "Гарантия на работы" },
  { icon: Star, value: "4.9", label: "Рейтинг на Яндексе" },
];

const logos = [
  "Московский зоопарк",
  "ГУМ",
  "Four Seasons",
  "Рэдиссон",
  "Частные резиденции",
];

export function TrustSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bio/3 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="card-premium p-6 md:p-8 text-center group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-bio/10 flex items-center justify-center group-hover:bg-bio/20 transition-colors">
                <stat.icon className="w-6 h-6 text-bio" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-bio mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust logos */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
            Нам доверяют
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, i) => (
              <div 
                key={i}
                className="text-muted-foreground/60 hover:text-foreground transition-colors text-sm md:text-base font-medium"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

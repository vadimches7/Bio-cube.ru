import { cn } from "@/lib/utils";
import { Award, Check, MapPin, Star, Users } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  location?: string;
  experienceLabel?: string;
  regalia: string[];
  profiReviewsCount: number | null;
  totalReviewsCount: number | null;
  profiRating?: number | null;
  gradient: string;
  tag?: string;
};

const formatCount = (n: number | null | undefined) => (typeof n === "number" ? String(n) : "—");
const formatRating = (n: number | null | undefined) => (typeof n === "number" ? n.toFixed(1) : null);

// Команда (можно оставлять 3 или 4 карточки — сетка подстроится автоматически).
const team: TeamMember[] = [
  {
    name: "Денис Нелюбов",
    role: "Основатель, аквариумист (пресные и морские системы)",
    location: "Москва и область • Красногорск",
    experienceLabel: "14+ лет практики",
    regalia: [
      "Гос. образование: декоративное рыбоводство (аквакультура)",
      "Призовые места: Deksi / «Мир за стеклом»",
      "Гос. повышение квалификации: водные биоресурсы и аквакультура",
      "Веду тематический блог (несколько тысяч подписчиков)",
      "ИП • гарантия • договор / безнал (р/с)",
    ],
    profiReviewsCount: null, // TODO: подставим число с Profi
    totalReviewsCount: null, // TODO: подставим общее число отзывов
    profiRating: null, // TODO: опционально (например 4.9)
    gradient: "linear-gradient(135deg, hsl(200 50% 25%) 0%, hsl(180 45% 20%) 100%)",
    tag: "Основатель",
  },
  {
    name: "Вадим Куликов",
    role: "Аквариумист",
    location: "Москва и область",
    experienceLabel: "В аквариумистике с 2010 года",
    regalia: [
      "Частная практика — с 2014 года",
      "На сервисе с марта 2018 (7 лет)",
      "Помогаю реализовать креативный проект или предлагаю готовые решения",
      "Ответственный уход: важна стабильность системы и здоровье обитателей",
      "Нацелен на долгосрочное сотрудничество и довольного заказчика",
      "Паспорт проверен (Profi.ru)",
    ],
    profiReviewsCount: 6122,
    totalReviewsCount: null,
    profiRating: 4.9,
    gradient: "linear-gradient(135deg, hsl(145 45% 25%) 0%, hsl(160 40% 20%) 100%)",
  },
  {
    name: "Андрей Зеленин",
    role: "Аквариумист (псевдоморе)",
    location: "Москва и область",
    experienceLabel: "На сервисе с февраля 2019 (6 лет)",
    regalia: [
      "Паспорт проверен (Profi.ru)",
      "Очень хвалят",
      "Полное сопровождение аквариума: оформление, чистка, постановка под ключ",
      "В профиле — фото готовых проектов и варианты исполнения",
      "Опыт в смежной сфере: общепит/кофе/кофемашины (до пандемии и во время)",
      "Специализация: псевдоморе",
    ],
    profiReviewsCount: 121,
    totalReviewsCount: null,
    profiRating: 4.9,
    gradient: "linear-gradient(135deg, hsl(190 45% 24%) 0%, hsl(205 35% 20%) 100%)",
  },
  {
    name: "Имя Фамилия",
    role: "Проект-менеджер",
    location: "Москва и область",
    experienceLabel: "—",
    regalia: ["Координация проекта и поставок", "Коммуникация с дизайнером/строителями", "Сроки и контроль качества"],
    profiReviewsCount: null,
    totalReviewsCount: null,
    profiRating: null,
    gradient: "linear-gradient(135deg, hsl(38 50% 25%) 0%, hsl(30 45% 20%) 100%)",
  },
];

export function TeamSection() {
  const gridColsClass =
    team.length === 3 ? "grid md:grid-cols-2 lg:grid-cols-3" : "grid md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Основатель и{" "}
            <span className="text-gradient-bio">команда</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Специалисты, которые ведут проект от идеи до стабильного аквариума
          </p>
        </div>
        
        {/* Team grid */}
        <div className={cn(gridColsClass, "gap-6")}>
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
                    {member.name
                      .split(" ")
                      .filter(Boolean)
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>
                {member.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 backdrop-blur text-xs text-foreground/90">
                      <Award className="w-4 h-4" />
                      {member.tag}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="caustic-overlay opacity-20" />
              </div>
              
              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-bio transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-bio mb-2">{member.role}</p>

                {(member.location || member.experienceLabel) && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                    {member.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {member.location}
                      </span>
                    )}
                    {member.experienceLabel && <span>{member.experienceLabel}</span>}
                  </div>
                )}

                <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                  {member.regalia.slice(0, 6).map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-bio mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="w-4 h-4 text-amber" />
                    <span>
                      Profi:{" "}
                      <span className="text-foreground">{formatCount(member.profiReviewsCount)}</span>
                      {formatRating(member.profiRating) ? (
                        <span className="text-muted-foreground"> • {formatRating(member.profiRating)}</span>
                      ) : null}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-4 h-4 text-bio" />
                    <span>
                      Всего: <span className="text-foreground">{formatCount(member.totalReviewsCount)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


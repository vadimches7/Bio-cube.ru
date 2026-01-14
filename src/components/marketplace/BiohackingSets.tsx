import { Check, Droplets, Brain, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const sets = [
  {
    id: "deep-sleep",
    icon: Heart,
    name: "Глубокий сон",
    tagline: "Засыпайте за 15 минут",
    description: "Полная экосистема для оптимизации циркадных ритмов и качества сна",
    badge: "Испарение +5л/сут",
    badgeColor: "bg-blue-500/10 text-blue-600",
    includes: [
      "Аквариум Biodesign Nano 40л",
      "Контроллер циркадного света (Amber Light)",
      "Автоувлажнитель с датчиком",
      'Набор "тихих" рыб (Расборы, Неоны)',
      "Система бесшумной фильтрации",
      "Мониторинг через BioCube OS",
    ],
    monthlyPrice: "4 990",
    fullPrice: "89 900",
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    id: "max-focus",
    icon: Brain,
    name: "Максимальный фокус",
    tagline: "Для рабочих кабинетов",
    description: 'Биотоп "Японский ручей" с элементами дзен и синим спектром для концентрации',
    badge: "Топ для IT",
    badgeColor: "bg-[#4DB6AC]/10 text-[#4DB6AC]",
    includes: [
      'Биотоп "Японский ручей" 60л',
      "Коллекция мхов и камней",
      "Синий спектр для утренней бодрости",
      "Креветки Амано (чистильщики)",
      "Минималистичный дизайн",
      "Еженедельные отчеты продуктивности",
    ],
    monthlyPrice: "6 990",
    fullPrice: "124 900",
    gradient: "from-[#4DB6AC]/20 to-teal-500/20",
    popular: true,
  },
  {
    id: "family-zen",
    icon: Droplets,
    name: "Семейный дзен",
    tagline: "Неубиваемая экосистема",
    description: 'Гарантия "Живой плавник" и образовательный паспорт для детей',
    badge: "100% Гарантия",
    badgeColor: "bg-green-500/10 text-green-600",
    includes: [
      "Неприхотливая экосистема 80л",
      "Выносливые виды рыб (Гуппи, Данио)",
      "Автокормушка с расписанием",
      "Образовательный паспорт для детей",
      'Гарантия "Живой плавник" 12 мес',
      "Приоритетная поддержка 24/7",
    ],
    monthlyPrice: "3 990",
    fullPrice: "69 900",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
];

export function BiohackingSets() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-light text-foreground mb-3">Биохакинг-сеты</h1>
        <p className="text-lg text-muted-foreground">Научно обоснованные экосистемы для улучшения качества жизни</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sets.map((set) => {
          const Icon = set.icon;
          return (
            <div
              key={set.id}
              className={`
                relative rounded-2xl overflow-hidden
                bg-gradient-to-br ${set.gradient}
                backdrop-blur-xl border border-white/20
                transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                ${set.popular ? "ring-2 ring-[#4DB6AC] shadow-xl shadow-[#4DB6AC]/20" : ""}
              `}
            >
              {/* Popular Badge */}
              {set.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-[#4DB6AC] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Самый популярный
                  </div>
                </div>
              )}

              <div className="p-8 bg-white/60 backdrop-blur-sm">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${set.badgeColor}`}>{set.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-foreground mb-2">{set.name}</h3>
                <p className="text-sm text-[#4DB6AC] font-medium mb-3">{set.tagline}</p>
                <p className="text-sm text-muted-foreground mb-6">{set.description}</p>

                {/* Includes */}
                <div className="mb-6 space-y-3">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Что входит:</p>
                  {set.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#4DB6AC] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-6 pt-6 border-t border-border">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-foreground">{set.monthlyPrice} ₽</span>
                    <span className="text-sm text-muted-foreground">/мес</span>
                  </div>
                  <p className="text-xs text-muted-foreground">или {set.fullPrice} ₽ полная стоимость</p>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    set.popular
                      ? "bg-[#4DB6AC] hover:bg-[#45a399] text-white shadow-lg shadow-[#4DB6AC]/30"
                      : "bg-foreground hover:bg-foreground/90 text-background"
                  }`}
                >
                  Выбрать сет
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-[#4DB6AC]" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Все сеты включают гарантию BioCube</h4>
            <p className="text-sm text-muted-foreground">
              Бесплатная замена рыб и растений в течение гарантийного периода. Страховка квартиры от протечек на 1 млн
              ₽. Удаленный мониторинг через приложение BioCube OS с AI-рекомендациями.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ParticipationLevels() {
  const plans = [
    {
      name: "Эксперт",
      subtitle: "Support",
      description: "Только база",
      details: "Поставка редких рыб, расходников и ежеквартальный чекап",
      price: "1 990",
      features: [
        "Поставка редких видов рыб",
        "Расходные материалы",
        "Ежеквартальный чекап",
        "Доступ к BioCube OS",
        "Консультации специалиста",
      ],
      popular: false,
    },
    {
      name: "Хоббист",
      subtitle: "Guided",
      description: "Для тех, кто любит процесс",
      details: "Мы делаем сложное, вы — кормите и ухаживаете под контролем BioCube OS",
      price: "4 990",
      features: [
        'Всё из тарифа "Эксперт"',
        "Ежемесячное обслуживание",
        "Управляемый уход через приложение",
        "Видео-инструкции по кормлению",
        "Страховка оборудования",
        "SLA 24 часа",
      ],
      popular: true,
      badge: "Самый популярный",
    },
    {
      name: "Наблюдатель",
      subtitle: "Full Service",
      description: "Мы делаем всё. Вы только любуетесь",
      details: "Полное обслуживание без вашего участия",
      price: "12 990",
      features: [
        'Всё из тарифа "Хоббист"',
        "Еженедельное обслуживание",
        "Полная автоматизация ухода",
        "Замена декораций по сезону",
        "Премиум виды рыб и растений",
        "SLA 4 часа",
      ],
      popular: false,
      badge: "100% Гарантия жизни",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#4DB6AC]/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Уровни участия</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите степень вовлечённости — от полного контроля до полного релакса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#4DB6AC]/10 via-white to-[#26A69A]/10 shadow-xl shadow-[#4DB6AC]/20 border-2 border-[#4DB6AC]/30"
                  : "bg-white shadow-lg border border-gray-100"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4 ${
                    plan.popular ? "bg-[#4DB6AC] text-white" : "bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <div className="text-sm text-[#4DB6AC] font-medium mb-3">{plan.subtitle}</div>
                <p className="text-base text-gray-700 font-medium mb-2">{plan.description}</p>
                <p className="text-sm text-gray-500">{plan.details}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">от</span>
                  <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">₽/мес</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#4DB6AC]" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? "bg-[#4DB6AC] hover:bg-[#45a399] text-white shadow-lg shadow-[#4DB6AC]/30"
                    : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-[#4DB6AC]/30"
                }`}
              >
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Все цены указаны для стандартного аквариума 100 литров. Индивидуальный расчёт по запросу.
          </p>
        </div>
      </div>
    </section>
  );
}

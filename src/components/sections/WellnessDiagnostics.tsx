import { useState } from "react";
import { Brain, Moon, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WellnessOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  prescription: {
    title: string;
    aquariumType: string;
    parameters: string[];
  };
}

const wellnessOptions: WellnessOption[] = [
  {
    id: "anti-stress",
    icon: <Sparkles className="w-12 h-12" />,
    title: "Anti-Stress",
    description: "Снижение уровня кортизола и тревожности",
    prescription: {
      title: "Синий рецепт: Умиротворение",
      aquariumType: "Biotop Japanese Zen Garden",
      parameters: [
        "Температура: 24-26°C (стабильная)",
        "pH: 6.8-7.2 (нейтральный)",
        "Освещение: 50 lux, тёплый спектр 3000K",
        "Звук: белый шум водопада 40 дБ",
        "Биота: растения Anubias, креветки Amano",
      ],
    },
  },
  {
    id: "deep-sleep",
    icon: <Moon className="w-12 h-12" />,
    title: "Deep Sleep",
    description: "Борьба с бессонницей через управление влажностью и светом",
    prescription: {
      title: "Синий рецепт: Глубокий сон",
      aquariumType: "Paludarium Night Mist",
      parameters: [
        "Влажность: 65-70% (автоматический туман)",
        "Освещение: циркадная кривая, закат с 21:00",
        "Температура: 22-23°C (прохладная зона сна)",
        "Аромат: эфирные масла лаванды (опционально)",
        "Биота: мхи, папоротники, улитки Nerite",
      ],
    },
  },
  {
    id: "focus",
    icon: <Brain className="w-12 h-12" />,
    title: "Focus",
    description: "Развитие концентрации для IT-команд и детей",
    prescription: {
      title: "Синий рецепт: Концентрация",
      aquariumType: "Dutch Aquascape High-Tech",
      parameters: [
        "CO2: 25-30 ppm (стимуляция роста)",
        "Освещение: 100 lux, холодный спектр 6500K",
        "Движение: умеренное течение (фокус внимания)",
        "Цвет: насыщенные зелёные и красные растения",
        "Биота: стайка Rasbora, креветки Cherry",
      ],
    },
  },
];

export function WellnessDiagnostics() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 text-foreground">
          Как вы хотите себя чувствовать?
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Выберите свою цель для персонализированной экосистемы
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {wellnessOptions.map((option) => (
            <Card
              key={option.id}
              className={`p-8 cursor-pointer transition-all duration-500 border-2 ${
                selectedOption === option.id
                  ? "border-[#4DB6AC] shadow-[0_0_30px_rgba(77,182,172,0.4)] bg-[#4DB6AC]/5 scale-105"
                  : "border-border hover:border-[#4DB6AC]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              }`}
              style={{
                boxShadow:
                  selectedOption === option.id
                    ? "0 8px 32px rgba(77, 182, 172, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
                    : "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
              }}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
            >
              <div
                className={`mb-6 transition-colors duration-300 ${
                  selectedOption === option.id ? "text-[#4DB6AC]" : "text-muted-foreground"
                }`}
              >
                {option.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{option.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{option.description}</p>
            </Card>
          ))}
        </div>

        {/* Blue Prescription Panel */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            selectedOption ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {selectedOption && (
            <div className="bg-gradient-to-br from-[#4DB6AC]/10 via-[#26A69A]/5 to-background border-2 border-[#4DB6AC]/30 rounded-2xl p-10 backdrop-blur-sm shadow-[0_0_40px_rgba(77,182,172,0.2)]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4DB6AC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-light text-[#4DB6AC] mb-2">
                    {wellnessOptions.find((o) => o.id === selectedOption)?.prescription.title}
                  </h3>
                  <p className="text-xl text-foreground font-medium">
                    {wellnessOptions.find((o) => o.id === selectedOption)?.prescription.aquariumType}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-wider text-[#4DB6AC] font-semibold mb-4">
                  Параметры BioCube OS
                </h4>
                {wellnessOptions
                  .find((o) => o.id === selectedOption)
                  ?.prescription.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-border/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#4DB6AC] mt-2 flex-shrink-0" />
                      <p className="text-foreground leading-relaxed">{param}</p>
                    </div>
                  ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic">
                  Все параметры автоматически поддерживаются BioCube OS. Система адаптируется под ваш режим дня и
                  погодные условия.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

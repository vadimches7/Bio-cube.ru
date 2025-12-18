import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  Home, 
  Building, 
  Droplets, 
  ArrowRight,
  AlertTriangle,
  Leaf,
  Bug,
  Thermometer
} from "lucide-react";

/**
 * QuizSection - Быстрый квиз для расчёта
 * 
 * Адаптирован под режим:
 * - installation: вопросы о типе аквариума, месте, размере
 * - service: вопросы о проблеме, срочности, размере
 */

// Вопросы для режима installation
const installationQuestions = [
  {
    id: "type",
    question: "Какой тип аквариума вас интересует?",
    options: [
      { value: "freshwater", label: "Пресноводный", icon: Droplets, description: "Тропические рыбы, растения" },
      { value: "marine", label: "Морской", icon: Droplets, description: "Кораллы, морские рыбы" },
      { value: "not-sure", label: "Нужна консультация", icon: Droplets, description: "Помогу определиться" },
    ],
  },
  {
    id: "location",
    question: "Где планируется установка?",
    options: [
      { value: "home", label: "Частный дом / квартира", icon: Home, description: "Жилое помещение" },
      { value: "office", label: "Офис / ресторан", icon: Building, description: "Коммерческое помещение" },
      { value: "other", label: "Другое", icon: Building, description: "Уточним при звонке" },
    ],
  },
  {
    id: "size",
    question: "Примерный объём аквариума?",
    options: [
      { value: "small", label: "До 200 литров", icon: Droplets, description: "Компактный" },
      { value: "medium", label: "200-500 литров", icon: Droplets, description: "Средний" },
      { value: "large", label: "Более 500 литров", icon: Droplets, description: "Большой проект" },
    ],
  },
];

// Вопросы для режима service
const serviceQuestions = [
  {
    id: "problem",
    question: "Какая проблема с аквариумом?",
    options: [
      { value: "turbidity", label: "Мутная вода", icon: Droplets, description: "Зелень, белёсость, взвесь" },
      { value: "algae", label: "Водоросли", icon: Leaf, description: "Налёт на стёклах, декоре" },
      { value: "fish", label: "Болеют рыбы", icon: Bug, description: "Пятна, вялость, гибель" },
      { value: "equipment", label: "Проблемы с оборудованием", icon: Thermometer, description: "Фильтр, нагрев, свет" },
    ],
  },
  {
    id: "urgency",
    question: "Насколько срочно?",
    options: [
      { value: "urgent", label: "Срочно (рыбы гибнут)", icon: AlertTriangle, description: "Выезд сегодня" },
      { value: "soon", label: "В ближайшие дни", icon: Droplets, description: "2-3 дня" },
      { value: "planned", label: "Плановое обслуживание", icon: Droplets, description: "Удобное время" },
    ],
  },
  {
    id: "size",
    question: "Объём вашего аквариума?",
    options: [
      { value: "small", label: "До 100 литров", icon: Droplets, description: "Небольшой" },
      { value: "medium", label: "100-300 литров", icon: Droplets, description: "Средний" },
      { value: "large", label: "Более 300 литров", icon: Droplets, description: "Большой" },
    ],
  },
];

export function QuizSection() {
  const { mode } = useServiceMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  // Выбираем вопросы в зависимости от режима
  const questions = mode === "installation" ? installationQuestions : serviceQuestions;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const currentQuestion = questions[currentStep];

  // Итог квиза → в комментарий формы (уйдёт в CRM как message/comment)
  const getAnswerLabel = (questionId: string): string => {
    const q = questions.find((x) => x.id === questionId);
    const raw = answers[questionId];
    const opt = q?.options.find((o) => o.value === raw);
    return (opt?.label ?? raw ?? "").toString();
  };

  const fieldLabelByMode: Record<"installation" | "service", Record<string, string>> = {
    installation: {
      type: "Тип аквариума",
      location: "Где установка",
      size: "Объём",
    },
    service: {
      problem: "Проблема",
      urgency: "Срочность",
      size: "Объём",
    },
  };

  const promptByMode: Record<"installation" | "service", string> = {
    installation: "Опишите пожелания к проекту (размеры, место установки, стиль, бюджет — если есть).",
    service: "Опишите, что происходит с аквариумом (когда началось, что меняли, есть ли фото/видео).",
  };

  const quizPrefillComment =
    isComplete
      ? [
          promptByMode[mode],
          "",
          "Вы выбрали:",
          ...questions.map((q) => {
            const label = fieldLabelByMode[mode][q.id] ?? q.question;
            const value = getAnswerLabel(q.id);
            return `- ${label}: ${value}`;
          }),
        ].join("\n")
      : undefined;

  // Контент в зависимости от режима
  const content = {
    installation: {
      badge: "Быстрый расчёт",
      title: "Узнайте стоимость за",
      titleAccent: "2 минуты",
      subtitle: "Ответьте на 3 вопроса и получите персональный расчёт",
      cta: "Получить расчёт",
    },
    service: {
      badge: "Диагностика",
      title: "Опишите проблему за",
      titleAccent: "1 минуту",
      subtitle: "Ответьте на 3 вопроса — мы подберём оптимальное решение",
      cta: "Вызвать специалиста",
    },
  };

  const c = content[mode];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className={cn(
        "absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl",
        mode === "installation" ? "bg-bio/5" : "bg-amber/5"
      )} />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className={mode === "installation" ? "badge-bio mb-4" : "badge-amber mb-4"}>
            {c.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {c.title}{" "}
            <span className={mode === "installation" ? "text-gradient-bio" : "text-gradient-amber"}>
              {c.titleAccent}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {c.subtitle}
          </p>
        </div>
        
        {/* Quiz card */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="card-premium p-8 md:p-10"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    i <= currentStep 
                      ? mode === "installation" ? "bg-bio" : "bg-amber"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
            
            {/* Question */}
            <div className="mb-8">
              <span className="text-sm text-muted-foreground mb-2 block">
                Вопрос {currentStep + 1} из {questions.length}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold">
                {currentQuestion.question}
              </h3>
            </div>
            
            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 group",
                    answers[currentQuestion.id] === option.value
                      ? mode === "installation" 
                        ? "border-bio bg-bio/10" 
                        : "border-amber bg-amber/10"
                      : "border-border/50 hover:border-bio/50 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    answers[currentQuestion.id] === option.value
                      ? mode === "installation"
                        ? "bg-bio text-primary-foreground"
                        : "bg-amber text-primary-foreground"
                      : mode === "installation"
                        ? "bg-muted group-hover:bg-bio/20"
                        : "bg-muted group-hover:bg-amber/20"
                  )}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium block">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-transform",
                    answers[currentQuestion.id] === option.value 
                      ? mode === "installation"
                        ? "translate-x-1 text-bio"
                        : "translate-x-1 text-amber"
                      : "text-muted-foreground"
                  )} />
                </button>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => currentStep === 0 ? handleReset() : setCurrentStep(prev => prev - 1)}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  currentStep === 0 && Object.keys(answers).length === 0 && "opacity-0 pointer-events-none"
                )}
              >
                ← {currentStep === 0 ? "Сбросить" : "Назад"}
              </button>
              
              {isComplete && (
                <Button 
                  variant={mode === "installation" ? "bio" : "amber"}
                  size="lg"
                  onClick={() => setDialogOpen(true)}
                >
                  {c.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ContactFormDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        ctaText={c.cta}
        formName="quiz"
        prefillComment={quizPrefillComment}
      />
    </section>
  );
}

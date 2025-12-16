import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { ChevronRight, Home, Building, Droplets, ArrowRight } from "lucide-react";

const questions = [
  {
    id: "type",
    question: "Какой тип аквариума вас интересует?",
    options: [
      { value: "freshwater", label: "Пресноводный", icon: Droplets },
      { value: "marine", label: "Морской", icon: Droplets },
      { value: "not-sure", label: "Нужна консультация", icon: Droplets },
    ],
  },
  {
    id: "location",
    question: "Где планируется установка?",
    options: [
      { value: "home", label: "Частный дом / квартира", icon: Home },
      { value: "office", label: "Офис / ресторан", icon: Building },
      { value: "other", label: "Другое", icon: Building },
    ],
  },
  {
    id: "size",
    question: "Примерный объём аквариума?",
    options: [
      { value: "small", label: "До 200 литров", icon: Droplets },
      { value: "medium", label: "200-500 литров", icon: Droplets },
      { value: "large", label: "Более 500 литров", icon: Droplets },
    ],
  },
];

export function QuizSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const currentQuestion = questions[currentStep];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-bio mb-4">Быстрый расчёт</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Узнайте стоимость за{" "}
            <span className="text-gradient-bio">2 минуты</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответьте на 3 вопроса и получите персональный расчёт
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
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= currentStep ? 'bg-bio' : 'bg-muted'
                  }`}
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
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 group ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-bio bg-bio/10'
                      : 'border-border/50 hover:border-bio/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    answers[currentQuestion.id] === option.value
                      ? 'bg-bio text-primary-foreground'
                      : 'bg-muted group-hover:bg-bio/20'
                  }`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{option.label}</span>
                  <ChevronRight className={`w-5 h-5 ml-auto transition-transform ${
                    answers[currentQuestion.id] === option.value ? 'translate-x-1 text-bio' : 'text-muted-foreground'
                  }`} />
                </button>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${
                  currentStep === 0 ? 'opacity-0 pointer-events-none' : ''
                }`}
              >
                ← Назад
              </button>
              
              {isComplete && (
                <Button 
                  variant="bio" 
                  size="lg"
                  onClick={() => setDialogOpen(true)}
                >
                  Получить расчёт
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
        ctaText="Получить расчёт"
      />
    </section>
  );
}

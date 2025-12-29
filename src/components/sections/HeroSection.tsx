import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Shield, Clock, Droplets, ChevronDown, Award, Beaker } from "lucide-react";

const trustBadges = [
  { icon: Award, text: "15+ лет опыта" },
  { icon: Shield, text: "Договор + гарантия 5 лет" },
  { icon: Beaker, text: "Тесты воды + экстренные выезды" },
];

export function HeroSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogCta, setDialogCta] = useState("");

  const content = {
    installation: {
      tagline: "BIO-CUBE",
      title: "Аквариум, который становится",
      titleAccent: "частью интерьера",
      subtitle: "Проектируем, изготавливаем и запускаем экосистему под вашу архитектуру. Тихо. Чисто. С гарантией.",
      primaryCta: "Рассчитать проект",
      secondaryCta: "Посмотреть проекты",
    },
    service: {
      tagline: "СПАСЕНИЕ АКВАРИУМОВ",
      title: "Спасём аквариум и вернём",
      titleAccent: "прозрачную воду",
      subtitle: "Муть, водоросли, запах, гибнет рыба — выезжаем, делаем диагностику и приводим в порядок без грязи.",
      primaryCta: "Вызвать специалиста",
      secondaryCta: "Что делаем за визит",
    },
    decoration: {
      tagline: "ДИЗАЙН И СТИЛЬ",
      title: "Декорирование и",
      titleAccent: "художественные композиции",
      subtitle: "Создаем уникальные подводные ландшафты. Стили, хардскейп, подбор декораций под ваш интерьер.",
      primaryCta: "Смотреть декоры",
      secondaryCta: "Наши работы",
    },
  };

  const c = content[mode] || content.installation;

  const handlePrimaryCta = () => {
    setDialogCta(c.primaryCta);
    setDialogOpen(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Caustic overlay */}
      <div className="caustic-overlay" />
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bio/3 rounded-full blur-3xl animate-float delay-2" />
      {mode === "service" && (
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-amber/5 rounded-full blur-3xl animate-float delay-4" />
      )}
      
      <div className="container relative z-10 px-4 pt-20 pb-12">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Tagline */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-xs md:text-sm tracking-[0.3em] text-muted-foreground uppercase">
              {c.tagline}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {c.title}
            </span>
            <span 
              className="block text-gradient-bio animate-fade-in" 
              style={{ animationDelay: "0.4s" }}
            >
              {c.titleAccent}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {c.subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button 
              variant={mode === "installation" ? "bio" : "amber"} 
              size="xl"
              onClick={handlePrimaryCta}
            >
              {c.primaryCta}
            </Button>
            <Button variant="outline-light" size="xl">
              {c.secondaryCta}
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            {trustBadges.map((badge, i) => (
              <div 
                key={i} 
                className="badge-bio"
              >
                <badge.icon className="w-4 h-4" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Листайте</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-bio rounded-full animate-hero-scroll" />
          </div>
        </div>
      </div>
      
      <ContactFormDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        ctaText={dialogCta}
      />
    </section>
  );
}

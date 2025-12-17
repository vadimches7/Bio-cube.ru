import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Phone, MessageCircle, ArrowRight, Zap } from "lucide-react";
import {
  CONTACT_PHONE_E164,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
} from "@/lib/contact";

export function FinalCTASection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prefillComment, setPrefillComment] = useState<string | undefined>(undefined);

  const content = {
    installation: {
      title: "Готовы обсудить ваш проект?",
      subtitle: "Оставьте заявку — менеджер свяжется с вами в течение часа для бесплатной консультации",
      cta: "Рассчитать проект",
    },
    service: {
      title: "Нужна помощь с аквариумом?",
      subtitle: "Опишите проблему — мы перезвоним и договоримся о выезде специалиста",
      cta: "Вызвать специалиста",
    },
  };

  const c = content[mode];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with stronger glow */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bio/10 rounded-full blur-3xl" />
      {mode === "service" && (
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
      )}
      
      <div className="container relative z-10 px-4">
        <div 
          className="max-w-4xl mx-auto card-premium p-8 md:p-12 lg:p-16 text-center"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }}
        >
          {/* Decorative elements */}
          <div className="caustic-overlay opacity-30" />
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative">
            {c.title.split("?")[0]}
            <span className={mode === "installation" ? "text-gradient-bio" : "text-gradient-amber"}>?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative">
            {c.subtitle}
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Button 
              variant={mode === "installation" ? "bio" : "amber"} 
              size="xl"
              onClick={() => {
                setPrefillComment(undefined);
                setDialogOpen(true);
              }}
            >
              {c.cta}
              <ArrowRight className="w-5 h-5" />
            </Button>
            {mode === "service" && (
              <Button
                variant="outline-light"
                size="xl"
                onClick={() => {
                  setPrefillComment("СРОЧНО: нужна помощь (выезд до 4 часов). Опишите, что происходит с аквариумом.");
                  setDialogOpen(true);
                }}
              >
                <Zap className="w-5 h-5 text-amber" />
                Срочно (до 4 часов)
              </Button>
            )}
            <Button asChild variant="outline-light" size="xl">
              <a href={`tel:${CONTACT_PHONE_E164}`}>
                <Phone className="w-5 h-5" />
                Позвонить
              </a>
            </Button>
          </div>
          
          {/* Alternative contact */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground relative">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-bio transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-bio transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>
      </div>
      
      <ContactFormDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        ctaText={c.cta}
        formName="final_cta"
        prefillComment={prefillComment}
      />
    </section>
  );
}

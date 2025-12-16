import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { CheckCircle2, Send } from "lucide-react";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ctaText?: string;
}

export function ContactFormDialog({ open, onOpenChange, ctaText }: ContactFormDialogProps) {
  const { mode } = useServiceMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", phone: "" });
      onOpenChange(false);
    }, 2500);
  };

  const title = mode === "installation" 
    ? "Рассчитать проект" 
    : "Вызвать специалиста";
    
  const description = mode === "installation"
    ? "Оставьте контакты — менеджер свяжется с вами для консультации и расчёта стоимости."
    : "Опишите проблему — мы перезвоним и договоримся о выезде.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-bio/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-bio" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Заявка отправлена!</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{ctaText || title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {description}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-muted/50 border-border/50 focus:border-bio"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="bg-muted/50 border-border/50 focus:border-bio"
                />
              </div>
              {/* Hidden fields */}
              <input type="hidden" name="service_mode" value={mode} />
              <input type="hidden" name="page_url" value={typeof window !== 'undefined' ? window.location.href : ''} />
              
              <Button 
                type="submit" 
                variant={mode === "installation" ? "bio" : "amber"}
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Отправить заявку
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

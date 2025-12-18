import { forwardRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { submitLead, FormStatus, getRateLimitRemaining } from "@/lib/submitLead";
import { formatRuPhoneMask } from "@/lib/phone";
import { CheckCircle2, Send, AlertCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ctaText?: string;
  formName?: string;
  prefillComment?: string;
}

export const ContactFormDialog = forwardRef<HTMLDivElement, ContactFormDialogProps>(({ 
  open, 
  onOpenChange, 
  ctaText,
  formName = "contact_form",
  prefillComment
}, ref) => {
  const { mode } = useServiceMode();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    messenger: "phone" as "whatsapp" | "telegram" | "phone",
    honeypot: "", // Скрытое поле для защиты от ботов
  });

  // Предзаполняем комментарий при открытии (например, для кнопки “Срочно (4 часа)”)
  // Важно: не перезатираем, если пользователь уже что-то начал писать.
  useEffect(() => {
    if (!open) return;
    if (!prefillComment) return;
    setFormData((prev) => {
      if (prev.comment.trim().length > 0) return prev;
      return { ...prev, comment: prefillComment };
    });
  }, [open, prefillComment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка rate limit перед отправкой
    const remaining = getRateLimitRemaining();
    if (remaining > 0) {
      setStatus("error");
      setErrorMessage(`Подождите ${remaining} сек. перед повторной отправкой`);
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");
    
    const result = await submitLead(
      {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        messenger: formData.messenger,
        honeypot: formData.honeypot,
      },
      {
        mode,
        formName,
      }
    );
    
    if (result.success) {
      setStatus("success");
      
      // Закрываем через 2.5 сек после успеха
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", phone: "", comment: "", messenger: "phone", honeypot: "" });
        onOpenChange(false);
      }, 2500);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Произошла ошибка");
    }
  };

  const title = mode === "installation" 
    ? "Рассчитать проект" 
    : "Вызвать специалиста";
    
  const description = mode === "installation"
    ? "Оставьте контакты — менеджер свяжется с вами для консультации и расчёта стоимости."
    : "Опишите проблему — мы перезвоним и договоримся о выезде специалиста.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              mode === "installation" ? "bg-bio/20" : "bg-amber/20"
            )}>
              <CheckCircle2 className={cn(
                "w-8 h-8",
                mode === "installation" ? "text-bio" : "text-amber"
              )} />
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
              {/* Honeypot - скрытое поле для ботов */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={status === "loading"}
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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: formatRuPhoneMask(e.target.value) }))
                  }
                  required
                  disabled={status === "loading"}
                  className="bg-muted/50 border-border/50 focus:border-bio"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={18}
                />
              </div>
              
              {/* Комментарий - для режима service особенно важен */}
              <div className="space-y-2">
                <Label htmlFor="comment">
                  {mode === "service" ? "Опишите проблему" : "Комментарий (необязательно)"}
                </Label>
                <Textarea
                  id="comment"
                  placeholder={mode === "service" 
                    ? "Что случилось с аквариумом? Муть, водоросли, рыбы болеют..." 
                    : "Пожелания к проекту, размер аквариума..."
                  }
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  disabled={status === "loading"}
                  className="bg-muted/50 border-border/50 focus:border-bio min-h-[80px]"
                />
              </div>
              
              {/* Выбор мессенджера */}
              <div className="space-y-2">
                <Label>Удобный способ связи</Label>
                <div className="flex gap-2">
                  {[
                    { value: "phone", label: "Звонок", icon: null },
                    { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                    { value: "telegram", label: "Telegram", icon: MessageCircle },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        messenger: option.value as typeof formData.messenger 
                      }))}
                      disabled={status === "loading"}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                        formData.messenger === option.value
                          ? mode === "installation"
                            ? "border-bio bg-bio/10 text-bio"
                            : "border-amber bg-amber/10 text-amber"
                          : "border-border/50 text-muted-foreground hover:border-border"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Сообщение об ошибке */}
              {status === "error" && errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}
              
              <Button 
                type="submit" 
                variant={mode === "installation" ? "bio" : "amber"}
                size="lg"
                className="w-full"
                disabled={status === "loading"}
              >
                <span className="flex items-center gap-2">
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Отправить заявку
                    </>
                  )}
                </span>
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link to="/privacy" className="underline hover:text-foreground">политикой конфиденциальности</Link>
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});

ContactFormDialog.displayName = "ContactFormDialog";

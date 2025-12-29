import { forwardRef, useEffect, useState } from "react";
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
      <DialogContent className={cn(
        "sm:max-w-md",
        // Glass OS стиль как в HeroSection
        "bg-white/5 backdrop-blur-2xl border-white/10",
        "rounded-[40px]",
        "shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_60px_-10px_rgba(20,184,166,0.15)]",
        "font-sans",
        // Кастомная кнопка закрытия в стиле Glass OS
        "[&>button]:text-slate-400 [&>button]:hover:text-white [&>button]:hover:bg-white/10 [&>button]:rounded-full [&>button]:w-8 [&>button]:h-8 [&>button]:transition-all"
      )}>
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-teal-500/20">
              <CheckCircle2 className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-xl font-sans font-bold mb-2 text-white">Заявка отправлена!</h3>
            <p className="text-slate-300 text-sm">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="!font-sans text-2xl font-bold text-white">{ctaText || title}</DialogTitle>
              <DialogDescription className="text-slate-300 text-sm mt-2">
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
                <Label htmlFor="name" className="text-slate-200 text-sm font-medium">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={status === "loading"}
                  className={cn(
                    "!font-sans bg-white/5 border-white/10 text-white placeholder:text-slate-400",
                    "focus-visible:border-cyan-400 focus-visible:ring-cyan-400/50 focus-visible:ring-2",
                    "transition-all duration-200"
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200 text-sm font-medium">Телефон</Label>
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
                  className={cn(
                    "!font-sans bg-white/5 border-white/10 text-white placeholder:text-slate-400",
                    "focus-visible:border-cyan-400 focus-visible:ring-cyan-400/50 focus-visible:ring-2",
                    "transition-all duration-200"
                  )}
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={18}
                />
              </div>
              
              {/* Комментарий - для режима service особенно важен */}
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-slate-200 text-sm font-medium">
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
                  className={cn(
                    "!font-sans bg-white/5 border-white/10 text-white placeholder:text-slate-400 min-h-[80px]",
                    "focus-visible:border-cyan-400 focus-visible:ring-cyan-400/50 focus-visible:ring-2",
                    "transition-all duration-200"
                  )}
                />
              </div>
              
              {/* Выбор мессенджера */}
              <div className="space-y-2">
                <Label className="text-slate-200 text-sm font-medium">Удобный способ связи</Label>
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
                        "flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                        "!font-sans",
                        formData.messenger === option.value
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                          : "bg-white/5 border border-white/20 text-slate-300 hover:border-white/40 hover:text-white"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Сообщение об ошибке */}
              {status === "error" && errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm !font-sans">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={status === "loading"}
                className={cn(
                  "relative group w-full overflow-hidden px-6 py-4 rounded-full font-bold tracking-wide transition-all duration-300",
                  "!font-sans bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
                  "shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)]",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
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
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <p className="text-xs text-slate-400 text-center !font-sans">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link to="/privacy" className="underline hover:text-cyan-400 text-slate-300">политикой конфиденциальности</Link>
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});

ContactFormDialog.displayName = "ContactFormDialog";

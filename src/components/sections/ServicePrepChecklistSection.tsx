import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { ArrowRight, CheckCircle, PlugZap, Camera, Package, Droplets, AlertTriangle } from "lucide-react";

/**
 * ServicePrepChecklistSection — “Чек‑лист подготовки к визиту”
 * Только для service.
 */

const checklist = [
  { icon: PlugZap, text: "обеспечьте доступ к тумбе/фильтру и розеткам" },
  { icon: Droplets, text: "по возможности не делайте крупную подмену за день до визита (если не экстренно)" },
  { icon: Camera, text: "если есть фото/видео проблемы — подготовьте (особенно при мутной воде/болезнях)" },
  { icon: Package, text: "если есть упаковки кормов/препаратов — положите рядом" },
  { icon: AlertTriangle, text: "если рыбы гибнут — пишите сразу, не ждите" },
];

export function ServicePrepChecklistSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mode !== "service") return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-amber mb-4">Полезно</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Как подготовиться{" "}
            <span className="text-gradient-amber">к визиту</span> (2 минуты)
          </h2>
          <p className="text-lg text-muted-foreground">
            Это ускорит работу и поможет точнее разобраться с проблемой.
          </p>
        </div>

        <div className="max-w-3xl mx-auto card-premium p-6 md:p-8">
          <ul className="space-y-3">
            {checklist.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-4 h-4 text-amber" />
                </div>
                <div className="pt-1">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{c.text}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={cn("mt-6 p-4 rounded-xl border border-border/50 bg-muted/20")}>
            <p className="text-sm text-muted-foreground">
              Если сомневаетесь — просто оставьте заявку. Менеджер подскажет, что лучше сделать до визита.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Button variant="amber" size="lg" onClick={() => setDialogOpen(true)}>
              Описать проблему
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Описать проблему"
        formName="service_prep_checklist"
      />
    </section>
  );
}











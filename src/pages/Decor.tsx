import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Palette, ArrowRight } from "lucide-react";

export default function Decor() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bio/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber/8 rounded-full blur-3xl animate-float delay-2" />

        <div className="container relative z-10 px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 text-bio mb-6">
              <Palette className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">ДЕКОРИРОВАНИЕ</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Декорирование и художественные композиции
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              Страница‑заглушка: скоро здесь появятся портфолио, стили, подбор материалов и кастомные решения под интерьер.
              Если хотите обсудить декор уже сейчас — оставьте заявку.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="bio" size="xl" onClick={() => setDialogOpen(true)}>
                Обсудить декор
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link to={{ pathname: "/", search: "?mode=installation" }}>На главную</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText="Обсудить декор"
        formName="decor"
        prefillComment={"Интересует декорирование аквариума.\n\nОпишите, пожалуйста:\n- Объём/размер\n- Стиль/референсы\n- Где находится аквариум (город)\n- Сроки"}
      />
    </main>
  );
}



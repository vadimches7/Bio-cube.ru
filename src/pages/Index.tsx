import { ServiceModeProvider, useServiceMode } from "@/contexts/ServiceModeContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { ServiceProblemsSection } from "@/components/sections/ServiceProblemsSection";
import { ServiceVisitChecklistSection } from "@/components/sections/ServiceVisitChecklistSection";
import { ServiceFormatsSection } from "@/components/sections/ServiceFormatsSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GuaranteesSection } from "@/components/sections/GuaranteesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModeSelectDialog } from "@/components/ModeSelectDialog";
import { FloatingModeSwitch } from "@/components/FloatingModeSwitch";

function IndexContent() {
  const { mode } = useServiceMode();

  return (
    <main className="min-h-screen bg-background">
      {/* Модальное окно выбора режима - показывается всегда при загрузке */}
      <ModeSelectDialog />

      {/* Плавающий переключатель режима справа */}
      <FloatingModeSwitch />

      {/* Шапка */}
      <Header />

      {/* Общие секции */}
      <HeroSection />
      <TrustSection />
      <QuizSection />

      {/* Service: коротко и без дублей */}
      {mode === "service" && (
        <>
          <ServiceProblemsSection />
          <ServiceVisitChecklistSection />
          <ServiceFormatsSection />
          <CasesSection />
          <BeforeAfterSection />
        </>
      )}

      {/* Installation: стройная "под ключ" структура */}
      {mode === "installation" && (
        <>
          <CasesSection />
          <ProcessSection />
        </>
      )}

      {/* Общие "закрывающие" секции */}
      {mode === "installation" && <GuaranteesSection />}
      <TeamSection />
      <ReviewsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}

const Index = () => (
  <ServiceModeProvider>
    <IndexContent />
  </ServiceModeProvider>
);

export default Index;

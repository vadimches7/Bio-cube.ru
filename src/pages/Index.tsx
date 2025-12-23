import { ServiceModeProvider } from "@/contexts/ServiceModeContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GuaranteesSection } from "@/components/sections/GuaranteesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/Footer";
import { ModeSelectDialog } from "@/components/ModeSelectDialog";
import { FloatingModeSwitch } from "@/components/FloatingModeSwitch";

const Index = () => {
  return (
    <ServiceModeProvider>
      <main className="min-h-screen bg-background">
        {/* Модальное окно выбора режима - показывается всегда при загрузке */}
        <ModeSelectDialog />
        
        {/* Плавающий переключатель режима справа */}
        <FloatingModeSwitch />
        
        <HeroSection />
        <TrustSection />
        <QuizSection />
        <CasesSection />
        <BeforeAfterSection />
        <ProcessSection />
        <GuaranteesSection />
        <TeamSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </main>
    </ServiceModeProvider>
  );
};

export default Index;

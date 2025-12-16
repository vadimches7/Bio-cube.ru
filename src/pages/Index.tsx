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

const Index = () => {
  return (
    <ServiceModeProvider>
      <main className="min-h-screen bg-background">
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

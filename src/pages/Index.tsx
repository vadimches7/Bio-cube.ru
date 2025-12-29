import { useState } from "react";
import { ServiceModeProvider } from "@/contexts/ServiceModeContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
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
import { VideoIntro } from "@/components/VideoIntro";
import { FloatingModeSwitch } from "@/components/FloatingModeSwitch";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <ServiceModeProvider>
      <main className="min-h-screen bg-background">
        {/* Видео-заставка с петушком и логотипом */}
        <VideoIntro onComplete={() => setShowContent(true)} />
        
        {/* Основной контент - скрыт пока показывается видео */}
        {showContent && (
          <div className="transition-opacity duration-500 opacity-100">
            {/* Плавающий переключатель режима справа */}
            <FloatingModeSwitch />
            
            <HeroSection />
            <ServicesSection />
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
          </div>
        )}
      </main>
    </ServiceModeProvider>
  );
};

export default Index;

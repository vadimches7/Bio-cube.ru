import { useState } from "react";
import { ServiceModeProvider } from "@/contexts/ServiceModeContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Footer } from "@/components/Footer";
import { VideoIntro } from "@/components/VideoIntro";
import { FloatingModeSwitch } from "@/components/FloatingModeSwitch";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <ServiceModeProvider>
      <main className="min-h-screen bg-[#020617]">
        {/* Видео-заставка */}
        <VideoIntro onComplete={() => setShowContent(true)} />
        
        {/* Основной контент - Glass OS дизайн */}
        {showContent && (
          <div className="transition-opacity duration-500 opacity-100">
            <FloatingModeSwitch />
            
            <HeroSection />
            <ServicesSection />
            <ReviewsSection />
            <Footer />
          </div>
        )}
      </main>
    </ServiceModeProvider>
  );
};

export default Index;

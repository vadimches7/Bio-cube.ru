import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, Wind, ShieldCheck, Box, Layers, Monitor, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  id: string;
  title: string;
  desc: string;
  icon: typeof Zap;
  layerHeight: string;
  width: string;
  zIndex: number;
  layerClassName?: string;
  layerStyle?: CSSProperties;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
};

// --- DATA ---
const steps: Step[] = [
  {
    id: "base",
    title: "ТУМБА-ОСНОВАНИЕ",
    desc: "Прочная основа для всей экосистемы с местом для оборудования.",
    layerClassName: "rounded-2xl bg-slate-900 shadow-[0_24px_40px_-20px_rgba(15,23,42,0.6)]",
    icon: Box,
    layerHeight: "h-24",
    width: "w-[300px] md:w-[400px]",
    zIndex: 10,
    layerStyle: { bottom: "0px" },
  },
  {
    id: "power",
    title: "УМНЫЙ КОНТРОЛЛЕР И ПИТАНИЕ",
    desc: "Встроенное управление розетками и мозговой центр аквариума.",
    layerClassName: "rounded-2xl bg-slate-700/80 shadow-[0_20px_30px_-20px_rgba(15,23,42,0.45)]",
    icon: Monitor,
    layerHeight: "h-14",
    width: "w-[280px] md:w-[370px]",
    zIndex: 20,
    layerStyle: { bottom: "20px" },
  },
  {
    id: "life-support",
    title: "СИСТЕМА ЖИЗНЕОБЕСПЕЧЕНИЯ",
    desc: "Внешний канистровый фильтр, система CO2, термостат и УФ-стерилизатор.",
    layerClassName: "rounded-2xl bg-slate-600/70 shadow-[0_18px_28px_-18px_rgba(15,23,42,0.4)]",
    icon: ShieldCheck,
    layerHeight: "h-20",
    width: "w-[280px] md:w-[370px]",
    zIndex: 30,
    layerStyle: { bottom: "62px" },
  },
  {
    id: "tank",
    title: "БЕСКАРКАСНЫЙ АКВАРИУМ",
    desc: "Эстетичная емкость из ультрапрозрачного стекла.",
    layerClassName: "rounded-[26px] bg-transparent overflow-visible flex items-end justify-center",
    icon: Layers,
    layerHeight: "h-[280px] md:h-[320px]",
    width: "w-[300px] md:w-[400px]",
    zIndex: 40,
    imageSrc: "/images/solutions/a1.jpg",
    imageAlt: "Пустой аквариум BioCube",
    imageClassName: "h-full w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_18px_35px_rgba(15,23,42,0.25)]",
    imageStyle: {},
    layerStyle: { bottom: "110px" },
  },
  {
    id: "hardscape",
    title: "АКВАСКЕЙП И ГРУНТ",
    desc: "Питательная подложка, камни и живые растения.",
    layerClassName: "rounded-[24px] bg-transparent overflow-visible flex items-end justify-center",
    icon: Wind,
    layerHeight: "h-[280px] md:h-[320px]",
    width: "w-[300px] md:w-[400px]",
    zIndex: 45,
    imageSrc: "/images/solutions/a2.jpg",
    imageAlt: "Аквариум с декором BioCube",
    imageClassName: "h-full w-auto object-contain object-bottom pointer-events-none select-none",
    imageStyle: {},
    layerStyle: { bottom: "110px" },
  },
  {
    id: "light",
    title: "УМНОЕ LED ОСВЕЩЕНИЕ",
    desc: "Спектр, имитирующий природный цикл солнца.",
    layerClassName: "bg-transparent overflow-visible flex items-center justify-center",
    icon: Zap,
    layerHeight: "h-[140px] md:h-[160px]",
    width: "w-[300px] md:w-[400px]",
    zIndex: 60,
    imageSrc: "/images/solutions/svet.jpg",
    imageAlt: "Светильник BioCube",
    imageClassName: "h-full w-auto object-contain object-center pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(15,23,42,0.35)]",
    imageStyle: {},
    layerStyle: { top: "40px" },
  },
];

export function EngineeringCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", // 5 screens long
          scrub: 1,
          pin: true,
          // markers: true, // Uncomment for debugging
        },
      });

      steps.forEach((_, index) => {
        const step = steps[index];
        const isHardscape = step.id === "hardscape";
        
        // Animation for Layer
        if (isHardscape) {
          // Акваскейп плавно появляется поверх пустого аквариума (fade in)
          tl.fromTo(
            layersRef.current[index],
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" },
            index * 1.5
          );
        } else {
          // Обычная анимация для остальных элементов
          tl.fromTo(
            layersRef.current[index],
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            index * 1.5
          );
        }

        // Animation for Text
        tl.fromTo(
          textsRef.current[index],
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 },
          index * 1.5
        );
        
        // Fade out previous text (optional, keeps focus on current step)
        if (index > 0) {
           tl.to(
             textsRef.current[index - 1],
             { opacity: 0.3, duration: 0.5 },
             index * 1.5
           );
        }
      });
      
      // Final state hold
      tl.to({}, { duration: 1 }); 
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-screen bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center relative">
        
        {/* --- LEFT: VISUAL ASSEMBLY --- */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
          <div className="relative w-[400px] h-[600px] flex flex-col items-center justify-end pb-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (layersRef.current[index] = el)}
                className={cn(
                  "absolute flex items-center justify-center transition-shadow duration-500",
                  step.layerHeight,
                  step.width,
                  step.layerClassName ?? "rounded-lg bg-slate-800 shadow-lg"
                )}
                style={{ zIndex: step.zIndex, ...step.layerStyle }}
              >
                {step.imageSrc ? (
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt ?? step.title}
                    className={step.imageClassName ?? "absolute inset-0 h-full w-full object-cover pointer-events-none select-none"}
                    style={step.imageStyle}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/50">
                    <step.icon className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {step.title.split(" ")[0]}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: TEXT NARRATIVE --- */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-20 relative z-50 pointer-events-none">
          <div className="space-y-6"> {/* Container for text blocks */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (textsRef.current[index] = el)}
                className="opacity-0 translate-x-4" // Initial state for GSAP
              >
                <div className="flex items-center gap-3 mb-1">
                   <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-[#4DB6AC]">
                      <step.icon className="w-3.5 h-3.5" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    {step.title}
                   </h3>
                </div>
                <p className="text-gray-600 text-base leading-normal pl-10 border-l-2 border-teal-100/50">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll to Assemble</span>
            <ArrowDown className="w-4 h-4 text-gray-400" />
         </div>

      </div>
    </section>
  );
}

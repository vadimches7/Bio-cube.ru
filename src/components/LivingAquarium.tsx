import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function LivingAquarium() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Параллакс эффект при движении мыши
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // Наклон аквариума
      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        scale(1.02)
      `;
    };

    const handleMouseLeave = () => {
      container.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        scale(1)
      `;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center p-4 sm:p-8">
      {/* 3D Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-[40px] overflow-hidden transition-transform duration-200 ease-out shadow-2xl shadow-cyan-900/20"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Слой 1: Глубина (Фон) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#083344] to-[#020617] z-0">
          {/* Световые пятна на фоне */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-50" />
        </div>

        {/* Слой 2: Декор (Статичные элементы + легкое движение) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Растения (SVG) */}
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[80%] opacity-80 animate-float-slow transform-gpu">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-teal-900/40">
              <path d="M40 200 Q 60 150 50 100 Q 40 50 80 20 L 90 25 Q 60 60 70 110 Q 80 160 60 200 Z" />
              <path d="M80 200 Q 100 150 90 100 Q 80 50 120 10 L 130 15 Q 100 60 110 110 Q 120 160 100 200 Z" className="fill-cyan-900/30" />
            </svg>
          </div>
          <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[70%] opacity-70 animate-float transform-gpu" style={{ animationDelay: "-2s" }}>
            <svg viewBox="0 0 200 200" className="w-full h-full fill-teal-800/30">
              <path d="M120 200 Q 140 150 130 100 Q 120 50 160 20 L 170 25 Q 140 60 150 110 Q 160 160 140 200 Z" />
            </svg>
          </div>
          
          {/* Пузырьки (Particles) */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 blur-[1px] animate-float"
              style={{
                width: Math.random() * 8 + 4 + "px",
                height: Math.random() * 8 + 4 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDuration: Math.random() * 5 + 5 + "s",
                animationDelay: Math.random() * -5 + "s",
              }}
            />
          ))}
        </div>

        {/* Слой 3: Живые рыбы (Анимация) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {/* Рыбка 1 */}
          <div className="absolute top-[30%] left-[-10%] w-16 h-12 animate-swim opacity-90 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]" style={{ animationDuration: "15s" }}>
            <FishSVG color="#2dd4bf" />
          </div>
          
          {/* Рыбка 2 (маленькая, быстрая) */}
          <div className="absolute top-[60%] left-[-20%] w-10 h-8 animate-swim opacity-80 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" style={{ animationDuration: "10s", animationDelay: "-3s", top: "50%" }}>
            <FishSVG color="#22d3ee" />
          </div>
          
          {/* Рыбка 3 (большая, медленная) */}
          <div className="absolute top-[40%] right-[-15%] w-24 h-16 animate-swim opacity-90 drop-shadow-[0_0_20px_rgba(251,146,60,0.3)]" style={{ animationDuration: "20s", animationDelay: "-7s", transform: "scaleX(-1)", animationDirection: "reverse" }}>
             <FishSVG color="#fb923c" />
          </div>
        </div>

        {/* Слой 4: Эффекты стекла и воды (Передний план) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Caustics (Блики воды) */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-transparent opacity-40 animate-caustics mix-blend-overlay" />
          <div className="absolute inset-0 animate-caustics-shimmer opacity-30 mix-blend-soft-light" />
          
          {/* Glass Reflection (Градиентный блик стекла) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/0 to-white/10 opacity-50 rounded-[40px] border border-white/10 shadow-[inset_0_0_100px_rgba(255,255,255,0.05)]" />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(2,6,23,0.4)_100%)]" />
        </div>
      </div>
    </div>
  );
}

// Простая SVG рыбка
function FishSVG({ color = "currentColor" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" style={{ color }}>
      {/* Тело */}
      <path
        d="M85 30 Q 70 5 40 10 Q 10 20 5 30 Q 10 40 40 50 Q 70 55 85 30 Z"
        fill="currentColor"
        className="drop-shadow-lg"
      />
      {/* Хвост */}
      <path
        d="M85 30 L 95 15 L 95 45 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Плавник */}
      <path
        d="M50 15 Q 60 5 70 15 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Глаз */}
      <circle cx="20" cy="28" r="3" fill="#000" fillOpacity="0.5" />
      <circle cx="19" cy="27" r="1" fill="#fff" />
    </svg>
  );
}

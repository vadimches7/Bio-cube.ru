import { motion, useScroll, useTransform } from "framer-motion";

export function SwimmingFish() {
  const { scrollYProgress } = useScroll();
  
  // Движение по X: от левого края до правого
  const x = useTransform(scrollYProgress, [0, 1], ["-15vw", "110vw"]);
  
  // Движение по Y: плавное покачивание вверх-вниз
  const y = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["20vh", "40vh", "25vh", "45vh", "30vh", "35vh"]
  );
  
  // Лёгкий наклон при "плавании"
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-5, 5, -3, 4, 0]
  );

  // Масштаб: рыбка "приближается" и "удаляется"
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.8, 1.1, 0.9, 1]
  );

  return (
    <motion.div
      className="fixed pointer-events-none z-40 hidden md:block"
      style={{ x, y, rotate, scale }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-48 lg:w-64 xl:w-80"
        style={{
          filter: "drop-shadow(0 20px 50px rgba(59, 130, 246, 0.5))",
        }}
      >
        <source src="/images/effects/betta-fish.webm" type="video/webm" />
      </video>
    </motion.div>
  );
}

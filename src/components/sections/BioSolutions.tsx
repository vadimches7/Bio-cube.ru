import { motion } from "framer-motion";
import { Check, Sparkles, FlaskConical, Award, Users } from "lucide-react";

interface Solution {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
  specs: string;
  themeColor: "mint" | "blue" | "purple";
  reversed: boolean;
  imageAspect?: "landscape" | "portrait"; // Для разных пропорций фото
}

const themeColors = {
  mint: {
    primary: "#4DB6AC",
    secondary: "#2DD4BF",
    glow: "from-[#4DB6AC]/40 via-[#4DB6AC]/10 to-transparent",
    border: "border-[#4DB6AC]/40",
    text: "text-[#4DB6AC]",
    bg: "bg-[#4DB6AC]",
    bgLight: "bg-[#4DB6AC]/10",
    shadow: "shadow-[#4DB6AC]/20",
  },
  blue: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    glow: "from-[#3B82F6]/40 via-[#3B82F6]/10 to-transparent",
    border: "border-[#3B82F6]/40",
    text: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]",
    bgLight: "bg-[#3B82F6]/10",
    shadow: "shadow-[#3B82F6]/20",
  },
  purple: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    glow: "from-[#8B5CF6]/40 via-[#8B5CF6]/10 to-transparent",
    border: "border-[#8B5CF6]/40",
    text: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]",
    bgLight: "bg-[#8B5CF6]/10",
    shadow: "shadow-[#8B5CF6]/20",
  },
};

const solutions: Solution[] = [
  {
    id: 1,
    badge: "АНТИСТРЕСС И ФОКУС",
    title: "Визуальная тишина",
    subtitle: "Японский дзен-сад",
    description:
      "Снижение уровня кортизола на&nbsp;23% за&nbsp;15&nbsp;минут созерцания. Ваш личный остров спокойствия, который поддерживает наша команда биологов.",
    benefits: [
      "Снижение кортизола на 23%",
      "Нормализация сердечного ритма",
      "Улучшение фокуса внимания",
      "Сервис под ключ",
    ],
    image: "/images/hero/aquarium-hero.jpg",
    specs: "24-26°C • pH 6.8-7.2 • Iwagumi Style",
    themeColor: "mint",
    reversed: false,
    imageAspect: "landscape",
  },
  {
    id: 2,
    badge: "МЕЛАТОНИН И БИОРИТМЫ",
    title: "Глубокий сон по расписанию",
    subtitle: "Программируемое освещение",
    description:
      "Программируемые циклы рассветов и&nbsp;закатов синхронизируют ваши биологические часы. Настройку выполняют наши специалисты.",
    benefits: [
      "Мелатонин +34%",
      "Синхронизация биоритмов",
      "Программируемые циклы света",
      "Качество сна с 1-й недели",
    ],
    image: "/images/solutions/room-after.jpg",
    specs: "2700K-6500K • Circadian Control • Сервис",
    themeColor: "blue",
    reversed: true,
    imageAspect: "landscape",
  },
  {
    id: 3,
    badge: "МИКРОКЛИМАТ И ИММУНИТЕТ",
    title: "Лёгкие вашего дома",
    subtitle: "Тропический палюдариум",
    description:
      "Живой тропический лес, который фильтрует воздух и&nbsp;поддерживает идеальную влажность 60%. Уход за&nbsp;растениями — на&nbsp;нас.",
    benefits: [
      "Влажность 55-65%",
      "Очистка воздуха растениями",
      "Профессиональный уход",
      "Укрепление иммунитета",
    ],
    image: "/images/solutions/paludarium.jpg",
    specs: "22-25°C • Система туманообразования • Сервис",
    themeColor: "purple",
    reversed: false,
    imageAspect: "portrait",
  },
];

// Пульсирующая точка
const PingDot = ({ color }: { color: string }) => (
  <span className="relative flex h-3 w-3">
    <span
      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
    />
    <span
      className="relative inline-flex rounded-full h-3 w-3"
      style={{ backgroundColor: color }}
    />
  </span>
);

export function BioSolutions() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Технологический паттерн на фоне */}
      <div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-fixed opacity-[0.03]"
        style={{ backgroundSize: "60px 60px" }}
      />

      {/* Градиентные акценты на фоне */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#4DB6AC]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#3B82F6]/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#4DB6AC]/30 bg-white/50 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#4DB6AC]" />
            <span className="text-sm font-medium text-[#4DB6AC] tracking-wide">
              НАУЧНЫЙ ПОДХОД
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            BioCube — рецепт здоровья
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Каждая экосистема решает конкретную проблему. Выберите свой путь к
            гармонии.
          </p>
        </motion.div>

        {/* Zigzag блоки с наслоением */}
        <div className="space-y-16 md:space-y-8">
          {solutions.map((solution, index) => {
            const theme = themeColors[solution.themeColor];
            const isPortrait = solution.imageAspect === "portrait";

            return (
              <motion.div
                key={solution.id}
                className={`relative py-8 md:py-16`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* ═══════════════════════════════════════════════════════
                    МОБИЛЬНАЯ ВЕРСИЯ: Карточка поверх изображения
                ═══════════════════════════════════════════════════════ */}
                <div className="lg:hidden relative">
                  {/* Контейнер изображения */}
                  <div className="relative">
                    {/* Фоновое свечение */}
                    <div
                      className="absolute -inset-4 rounded-3xl blur-2xl -z-10"
                      style={{
                        background: `radial-gradient(ellipse at center, ${theme.primary}25 0%, transparent 70%)`,
                      }}
                    />
                    
                    {/* Изображение */}
                    <div 
                      className={`relative rounded-2xl overflow-hidden shadow-xl ${
                        isPortrait ? "aspect-[3/4] max-w-[280px] mx-auto" : "aspect-[4/3]"
                      }`}
                    >
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Градиент для текста */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Контент поверх изображения */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        {/* Бейдж */}
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-3"
                          style={{
                            borderColor: `${theme.primary}60`,
                            backgroundColor: `${theme.primary}20`,
                          }}
                        >
                          <span
                            className="text-[9px] font-semibold tracking-wider text-white"
                          >
                            {solution.badge}
                          </span>
                        </div>
                        
                        {/* Заголовок */}
                        <div className="flex items-center gap-2 mb-2">
                          <PingDot color={theme.primary} />
                          <h3 className="text-xl font-semibold text-white">
                            {solution.title}
                          </h3>
                        </div>
                        
                        {/* Подзаголовок */}
                        <p style={{ color: theme.primary }} className="text-sm font-medium mb-3">
                          {solution.subtitle}
                        </p>
                        
                        {/* Specs */}
                        <div
                          className="inline-flex items-center px-3 py-1.5 rounded-full backdrop-blur-xl border text-[10px] font-medium"
                          style={{
                            background: "rgba(255,255,255,0.15)",
                            borderColor: `${theme.primary}40`,
                            color: "white",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ backgroundColor: theme.primary }}
                          />
                          {solution.specs}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Описание и преимущества под картинкой */}
                  <div className="mt-6 px-2">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    
                    <ul className="grid grid-cols-2 gap-2">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div
                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${theme.primary}15` }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: theme.primary }} />
                          </div>
                          <span className="text-xs text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    ДЕСКТОПНАЯ ВЕРСИЯ: Zigzag с наслоением
                ═══════════════════════════════════════════════════════ */}
                <div 
                  className={`hidden lg:flex items-center ${
                    solution.reversed ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* ИЗОБРАЖЕНИЕ */}
                  <motion.div
                    className={`relative z-10 ${isPortrait ? "w-[40%]" : "w-[58%]"}`}
                    initial={{ opacity: 0, x: solution.reversed ? 80 : -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Фоновое свечение (Glow) */}
                    <div
                      className={`absolute -inset-16 bg-gradient-radial ${theme.glow} rounded-full blur-3xl -z-10`}
                    />

                    {/* Второй слой свечения */}
                    <div
                      className="absolute -inset-8 rounded-3xl -z-10"
                      style={{
                        background: `radial-gradient(ellipse at center, ${theme.primary}15 0%, transparent 70%)`,
                      }}
                    />

                    {/* Изображение */}
                    <div 
                      className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                        isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    >
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Легкий оверлей */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                      {/* Specs бейдж */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div
                          className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-xl border text-xs font-medium tracking-wide"
                          style={{
                            background: "rgba(255,255,255,0.85)",
                            borderColor: `${theme.primary}30`,
                            color: theme.primary,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: theme.primary }}
                          />
                          {solution.specs}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ТЕКСТОВАЯ КАРТОЧКА */}
                  <motion.div
                    className={`relative z-20 ${isPortrait ? "w-[65%]" : "w-[48%]"} ${
                      solution.reversed ? "-mr-20 xl:-mr-28" : "-ml-20 xl:-ml-28"
                    }`}
                    initial={{ opacity: 0, x: solution.reversed ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div
                      className={`relative p-10 rounded-3xl backdrop-blur-2xl border ${theme.border} ${theme.shadow} shadow-2xl`}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.8) 100%)",
                        boxShadow: `0 25px 50px -12px ${theme.primary}15, inset 0 1px 0 rgba(255,255,255,0.8)`,
                      }}
                    >
                      {/* Внутреннее свечение */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at top right, ${theme.primary}20 0%, transparent 50%)`,
                        }}
                      />

                      <div className="relative space-y-6">
                        {/* Бейдж-капсула */}
                        <div
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                          style={{
                            borderColor: `${theme.primary}40`,
                            backgroundColor: `${theme.primary}08`,
                          }}
                        >
                          <span
                            className="text-xs font-semibold tracking-widest"
                            style={{ color: theme.primary }}
                          >
                            {solution.badge}
                          </span>
                        </div>

                        {/* Заголовок */}
                        <div className="flex items-center gap-3">
                          <PingDot color={theme.primary} />
                          <h3 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
                            {solution.title}
                          </h3>
                        </div>

                        {/* Подзаголовок */}
                        <p
                          className="text-lg font-medium"
                          style={{ color: theme.primary }}
                        >
                          {solution.subtitle}
                        </p>

                        {/* Описание */}
                        <p className="text-slate-600 leading-relaxed">
                          {solution.description}
                        </p>

                        {/* Разделитель */}
                        <div
                          className="h-px w-full"
                          style={{
                            background: `linear-gradient(to right, ${theme.primary}30, transparent)`,
                          }}
                        />

                        {/* Список преимуществ */}
                        <ul className="grid grid-cols-2 gap-3">
                          {solution.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                            >
                              <div
                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${theme.primary}15` }}
                              >
                                <Check
                                  className="w-3 h-3"
                                  style={{ color: theme.primary }}
                                />
                              </div>
                              <span className="text-sm text-slate-700 font-medium">
                                {benefit}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            🔬 НАУЧНОЕ ПОДТВЕРЖДЕНИЕ (Trust Badge)
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Фоновое свечение */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4DB6AC]/5 via-[#4DB6AC]/10 to-[#4DB6AC]/5 rounded-3xl blur-xl" />
            
            <div
              className="relative p-6 md:p-8 rounded-3xl border border-[#4DB6AC]/20 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,250,252,0.9) 100%)',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                {/* Иконка-бейдж */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Пульсирующий круг */}
                    <div className="absolute inset-0 bg-[#4DB6AC]/20 rounded-full animate-ping opacity-30" />
                    <div 
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #4DB6AC 0%, #26A69A 100%)',
                        boxShadow: '0 10px 40px rgba(77, 182, 172, 0.3)',
                      }}
                    >
                      <FlaskConical className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Текст */}
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Исследования проведены в сотрудничестве с </span>
                    <span className="font-semibold text-[#4DB6AC]">Институтом биологии моря РАН</span>
                    <span className="text-slate-600">. Все показатели подтверждены клиническими испытаниями на выборке </span>
                    <span className="font-semibold text-slate-900">500+ участников</span>.
                  </p>
                </div>

                {/* Статистика справа */}
                <div className="flex gap-6 lg:gap-8 flex-shrink-0">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[#4DB6AC] mb-1">
                      <Award className="w-4 h-4" />
                      <span className="text-2xl md:text-3xl font-bold">РАН</span>
                    </div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Партнёр</span>
                  </div>
                  
                  <div className="w-px bg-slate-200" />
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[#4DB6AC] mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-2xl md:text-3xl font-bold">500+</span>
                    </div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Участников</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

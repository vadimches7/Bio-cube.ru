import { motion } from "framer-motion";

interface Partner {
  name: string;
  logo?: string; // Для будущих SVG логотипов
}

const partners: Partner[] = [
  { name: "OASE Germany" },
  { name: "EHEIM Engineering" },
  { name: "SICCE Italy" },
  { name: "GHL Advanced Technology" },
  { name: "Zigbee Alliance" },
];

export function PartnersTrustBar() {
  return (
    <section className="py-10 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.p
          className="text-xs font-bold tracking-widest text-slate-400 uppercase text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Немецкая инженерия. Итальянская тишина. Японская эстетика.
        </motion.p>

        {/* Логотипы партнёров */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              {partner.logo ? (
                // Когда будут SVG логотипы
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 md:h-10 opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                // Текстовые плейсхолдеры
                <span 
                  className="text-sm md:text-base font-semibold text-slate-400 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:text-slate-700 whitespace-nowrap"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {partner.name}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Разделительная линия с акцентом */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#4DB6AC]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

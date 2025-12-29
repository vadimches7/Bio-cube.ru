import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  COPYRIGHT,
  LEGAL_INN,
  LEGAL_NAME,
  LEGAL_OGRNIP,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
} from "@/lib/contact";

// SVG Логотип BioCube (с градиентом Teal/Cyan)
function BioCubeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M50 5 L93 30 V80 L50 105 L7 80 V30 L50 5Z" 
        stroke="url(#gradient-logo-footer)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7 60 C30 60 30 50 50 50 C70 50 70 60 93 50" 
        stroke="url(#gradient-logo-footer)" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <path 
        d="M50 35 Q60 25 65 35 Q60 45 50 35" 
        fill="url(#gradient-logo-footer)"
      />
      <circle cx="70" cy="40" r="4" fill="#22d3ee" />
      <defs>
        <linearGradient id="gradient-logo-footer" x1="7" y1="105" x2="93" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden bg-[#020617] font-sans">
      {/* Фон с эффектом */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10" style={{ filter: 'grayscale(100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-[#020617]/80" />
      </div>
      
      <div className="container relative z-10 px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <BioCubeLogo className="h-12 w-12 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]" />
              <span className="font-sans text-2xl font-bold text-white tracking-tight">Bio-Cube</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Премиальные аквариумы под ключ и профессиональное обслуживание. 
              Создаём живые экосистемы, которые становятся частью вашего интерьера.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-sans font-bold text-white mb-6 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <a href={`tel:${CONTACT_PHONE_E164}`} className="text-slate-400 hover:text-white transition-colors">
                  Позвонить
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Send className="w-4 h-4 text-cyan-400" />
                </div>
                <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-400 hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-slate-400">{CONTACT_ADDRESS}</span>
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-sans font-bold text-white mb-6 text-sm uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/?mode=installation" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Аквариумы под ключ
                </Link>
              </li>
              <li>
                <Link to="/?mode=service" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Обслуживание
                </Link>
              </li>
              <li>
                <Link to="/?mode=service" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Спасение аквариумов
                </Link>
              </li>
              <li>
                <Link to="/?mode=decoration" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Консультации
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom - Glass разделитель */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="text-center md:text-left space-y-2">
            <p className="text-slate-300">{COPYRIGHT}</p>
            <p className="text-xs text-slate-500">
              {LEGAL_NAME} • ИНН: {LEGAL_INN} • ОГРНИП: {LEGAL_OGRNIP}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link 
              to="/offer" 
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Договор оферты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

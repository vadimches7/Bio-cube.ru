import { Link } from "react-router-dom";
import { Droplets, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { BioCubeLogo } from "@/components/BioCubeLogo";
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

export function Footer() {
  return (
    <footer id="contacts" className="py-12 relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BioCubeLogo className="h-10 w-10" />
              <span className="font-serif text-xl font-bold">Bio-Cube</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Премиальные аквариумы под ключ и профессиональное обслуживание. 
              Создаём живые экосистемы, которые становятся частью вашего интерьера.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bio" />
                <a href={`tel:${CONTACT_PHONE_E164}`} className="hover:text-foreground transition-colors">
                  Позвонить
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="w-4 h-4 text-bio" />
                <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Telegram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-bio" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bio" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bio" />
                {CONTACT_ADDRESS}
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/?mode=installation" className="hover:text-bio transition-colors">Аквариумы под ключ</Link></li>
              <li><Link to="/?mode=service" className="hover:text-bio transition-colors">Обслуживание</Link></li>
              <li><Link to="/?mode=service" className="hover:text-bio transition-colors">Спасение аквариумов</Link></li>
              <li><Link to="/?mode=installation" className="hover:text-bio transition-colors">Консультации</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left space-y-1">
            <p>{COPYRIGHT}</p>
            <p className="text-xs text-muted-foreground/80">
              {LEGAL_NAME} • ИНН: {LEGAL_INN} • ОГРНИП: {LEGAL_OGRNIP}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-bio transition-colors">Политика конфиденциальности</Link>
            <Link to="/offer" className="hover:text-bio transition-colors">Договор оферты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

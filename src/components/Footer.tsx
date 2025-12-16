import { Droplets, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-bio/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-bio" />
              </div>
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
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bio" />
                info@bio-cube.ru
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bio" />
                Москва, ул. Примерная, 1
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-bio transition-colors">Аквариумы под ключ</a></li>
              <li><a href="#" className="hover:text-bio transition-colors">Обслуживание</a></li>
              <li><a href="#" className="hover:text-bio transition-colors">Спасение аквариумов</a></li>
              <li><a href="#" className="hover:text-bio transition-colors">Консультации</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Bio-Cube. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-bio transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-bio transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

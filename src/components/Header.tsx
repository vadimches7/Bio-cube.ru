import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { BioCubeLogo } from "@/components/BioCubeLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Phone, Send, MessageCircle } from "lucide-react";
import {
  CONTACT_PHONE_E164,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
} from "@/lib/contact";

type HeaderNavItem = { label: string; id: string };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const { mode } = useServiceMode();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems: HeaderNavItem[] = useMemo(() => {
    if (mode === "service") {
      return [
        { label: "Что делаем", id: "service-visit" },
        { label: "Форматы", id: "service-formats" },
        { label: "Кейсы", id: "cases" },
        { label: "FAQ", id: "faq" },
        { label: "Контакты", id: "contacts" },
      ];
    }
    return [
      { label: "Проекты", id: "cases" },
      { label: "Как работаем", id: "process" },
      { label: "FAQ", id: "faq" },
      { label: "Контакты", id: "contacts" },
    ];
  }, [mode]);

  const brandSubtitle =
    mode === "service"
      ? "Сервис и спасение аквариумов"
      : "Аквариумы под ключ и сопровождение";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "bg-background/60 backdrop-blur-xl border-b border-border/30",
      )}
    >
      <div className="container px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link to={{ pathname: "/", search: location.search }} className="flex items-center gap-3 min-w-0">
            <BioCubeLogo className="shrink-0" />
            <div className="min-w-0">
              <div className="font-serif font-bold leading-tight truncate">
                Студия аквадизайна <span className="text-gradient-bio">Bio‑Cube</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">{brandSubtitle}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollToId(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors text-sm"
              title="Открыть Telegram"
            >
              <Send className="w-4 h-4 text-bio" />
              <span className="hidden xl:inline">Telegram</span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors text-sm"
              title="Открыть WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-bio" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Button asChild variant="outline-light" size="sm" className="hidden sm:inline-flex">
              <a href={`tel:${CONTACT_PHONE_E164}`} className="gap-2">
                <Phone className="w-4 h-4" />
                <span>Позвонить</span>
              </a>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline-light" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border/50">
                <SheetHeader>
                  <SheetTitle className="font-serif">Меню</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <button
                        className="text-left px-3 py-3 rounded-xl hover:bg-muted/30 transition-colors"
                        onClick={() => {
                          setOpen(false);
                          // небольшой таймаут, чтобы закрытие успело примениться
                          setTimeout(() => scrollToId(item.id), 50);
                        }}
                        type="button"
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}

                  <div className="h-px bg-border/40 my-2" />

                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <Send className="w-4 h-4 text-bio" />
                    Telegram
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-bio" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT_PHONE_E164}`}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-bio" />
                    Позвонить
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}



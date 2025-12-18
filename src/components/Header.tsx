import { useEffect, useMemo, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD_PX = 12;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        "sticky top-0 z-40",
        "transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-sm"
          : "bg-transparent border-b border-transparent",
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
            {/* Sticky CTA: shown only after scroll (fade + slide) */}
            <div
              className={cn(
                "flex items-center gap-2",
                "transition-all duration-300",
                isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none",
              )}
              aria-hidden={!isScrolled}
            >
              {/* Mobile: icons only */}
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl border border-border/40",
                  "bg-muted/10 hover:bg-muted/20 transition-colors",
                  "h-9 w-9 md:h-10 md:w-auto md:px-3 md:gap-2",
                )}
                title="Открыть Telegram"
              >
                <Send className="w-4 h-4 text-bio" />
                <span className="hidden md:inline text-sm">Telegram</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl border border-border/40",
                  "bg-muted/10 hover:bg-muted/20 transition-colors",
                  "h-9 w-9 md:h-10 md:w-auto md:px-3 md:gap-2",
                )}
                title="Открыть WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-bio" />
                <span className="hidden md:inline text-sm">WhatsApp</span>
              </a>
              <Button asChild variant="outline-light" size="sm" className="h-9 px-3 md:h-10">
                <a href={`tel:${CONTACT_PHONE_E164}`} className="gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Позвонить</span>
                </a>
              </Button>
            </div>

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



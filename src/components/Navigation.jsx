import { useEffect, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { NAV, TG_TAILOR } from "../data/content.js";
import { useActiveSection } from "./ui.jsx";

// Все секции страницы по порядку сверху вниз. Подсвечиваются только те,
// что есть в NAV; остальные (о мастерской, визитки, заявка) просто не мешают.
const SECTION_IDS = [
  "#about",
  "#identity",
  "#catalog",
  "#featured",
  "#measurements",
  "#delivery",
  "#faq",
  "#order",
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ${
        scrolled || open
          ? "border-white/10 bg-ink/75 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="u-container flex h-16 items-center justify-between gap-6 sm:h-20">
        <a href="#top" aria-label="XANAMI — наверх" className="shrink-0" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`u-nav ${active === item.href ? "text-bone" : ""}`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 right-0 h-px bg-blood transition-transform duration-500 ${
                  active === item.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#order" className="u-btn u-btn-ghost hidden py-2.5 lg:inline-flex">
            Заявка
          </a>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-solid hidden px-4 py-2.5 lg:inline-flex"
          >
            <Send size={14} strokeWidth={1.5} />
            Telegram
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.02] text-bone backdrop-blur-md transition-colors hover:border-white/40 lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 bg-ink/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="u-container flex h-full flex-col justify-between overflow-y-auto py-10">
          <nav aria-label="Мобильная навигация" className="flex flex-col gap-6">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                style={{ transitionDelay: open ? `${i * 80}ms` : "0ms" }}
                className={`font-serif text-3xl font-light text-bone transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-3">
            <div className="u-rule mb-2" />
            <a href="#order" onClick={close} className="u-btn u-btn-solid w-full">
              Оставить заявку
            </a>
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="u-btn u-btn-ghost w-full"
            >
              <Send size={14} strokeWidth={1.5} />
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

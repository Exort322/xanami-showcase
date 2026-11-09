import { useEffect, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { NAV, TG_TAILOR } from "../data/content.js";
import { useActiveSection } from "./ui.jsx";

const NAV_IDS = NAV.map((n) => n.href);

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // блокируем скролл страницы, пока открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // закрываем меню по Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-700 ${
          scrolled || open
            ? "border-white/10 bg-ink/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="u-container flex h-16 items-center justify-between gap-6 sm:h-20">
          <a
            href="#top"
            aria-label="XANAMI — наверх"
            className="shrink-0"
            onClick={close}
          >
            <Logo />
          </a>

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-10 md:flex"
          >
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
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost hidden py-2.5 md:inline-flex"
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
              className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.02] text-bone transition-colors hover:border-white/40 md:hidden"
            >
              {open ? (
                <X size={18} strokeWidth={1.5} />
              ) : (
                <Menu size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/*
        Мобильное меню вынесено ИЗ <header>: backdrop-blur на родителе
        создаёт containing block и схлопывает position: fixed у потомка.
      */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-ink/95 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="u-container flex h-full flex-col justify-between overflow-y-auto py-10">
          <nav
            aria-label="Мобильная навигация"
            className="flex flex-col gap-7"
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${i * 90}ms` : "0ms" }}
                className={`font-serif text-4xl font-light text-bone transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-4">
            <div className="u-rule" />
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="u-btn u-btn-solid w-full"
            >
              <Send size={14} strokeWidth={1.5} />
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

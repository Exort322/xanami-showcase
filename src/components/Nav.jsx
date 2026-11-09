import { useEffect, useRef, useState } from "react";
import { Menu, X, Send, ArrowUpRight } from "lucide-react";
import { NAV, TG_CHANNEL, TG_TAILOR } from "../data/content";
import { useActiveSection } from "./ui";

function Wordmark({ className = "" }) {
  return (
    <a
      href="#top"
      aria-label="XANAMI — на главную"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative flex items-center">
        <img
          src="/assets/logo.png"
          alt="XANAMI"
          width="461"
          height="280"
          className="h-7 w-auto opacity-95 transition-opacity duration-500 group-hover:opacity-100 sm:h-8"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <span className="hidden font-serif text-xl tracking-[0.34em] text-bone sm:text-2xl">
          XANAMI
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(["#couture", "#streetwear", "#ritual"]);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  /* фон шапки при скролле */
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

  /* фокус внутрь меню и обратно на кнопку */
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="u-container flex h-16 items-center justify-between gap-4 sm:h-20">
          <Wordmark />

          {/* Центр: ссылки */}
          <nav
            aria-label="Основная навигация"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`u-nav ${
                  active === item.href ? "text-bone" : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-blood transition-all duration-500 ${
                    active === item.href ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-white/15 bg-white/[0.02] px-5 py-3 font-cond text-[11px] uppercase tracking-[0.24em] text-bone backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/[0.06] sm:inline-flex"
            >
              <Send size={13} strokeWidth={1.5} aria-hidden="true" />
              Telegram
            </a>

            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram-канал XANAMI"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.02] text-bone backdrop-blur-md transition hover:border-white/40 sm:hidden"
            >
              <Send size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.02] text-bone backdrop-blur-md transition hover:border-white/40 lg:hidden"
            >
              <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: "" } : {})}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-ink/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <span className="font-serif text-lg tracking-[0.34em] text-bone">
              XANAMI
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-bone transition hover:border-white/40"
            >
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Мобильная навигация">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                className={`group flex items-baseline justify-between border-b border-white/[0.07] py-5 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <span className="font-serif text-3xl font-light text-bone transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <span className="font-cond text-[10px] tracking-[0.3em] text-ash">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-white/10 p-6">
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost w-full"
            >
              <Send size={14} strokeWidth={1.5} aria-hidden="true" />
              Канал @xana_mi
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-solid w-full"
            >
              Написать дизайнеру
            </a>
            <p className="pt-1 text-center font-cond text-[10px] uppercase tracking-[0.28em] text-ash">
              Ателье · Минск
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

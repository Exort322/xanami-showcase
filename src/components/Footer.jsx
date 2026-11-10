import { Send } from "lucide-react";
import Logo from "./Logo.jsx";
import { LINKS, TG_CHANNEL, TG_TAILOR } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-coal/60 py-12 backdrop-blur-md">
      <div className="u-container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <a href="#top" aria-label="XANAMI — наверх">
            <Logo />
          </a>

          <nav
            aria-label="Разделы"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {[
              ["Каталог", "#catalog"],
              ["Мерки", "#measurements"],
              ["Доставка", "#delivery"],
              ["Вопросы", "#faq"],
              ["Заявка", "#order"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-cond text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-bone"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-cond text-[11px] uppercase tracking-[0.26em] text-silver">
              © 2026 XANAMI
            </p>
            <p className="text-[11px] text-ash">
              Авторские эскизы · пошив под заказ · доставка СДЭК
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost py-3"
            >
              <Send size={13} strokeWidth={1.5} />
              Канал
            </a>
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost py-3"
            >
              <Send size={13} strokeWidth={1.5} />
              @{LINKS.tailor}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

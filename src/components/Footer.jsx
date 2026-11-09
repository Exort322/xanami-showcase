import { Send } from "lucide-react";
import Logo from "./Logo.jsx";
import { TG_CHANNEL, TG_TAILOR } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-coal/60 py-12 backdrop-blur-md">
      <div className="u-container flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <a href="#top" aria-label="XANAMI — наверх">
          <Logo />
        </a>

        <p className="font-cond text-[11px] uppercase tracking-[0.28em] text-ash">
          © 2026 XANAMI
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={TG_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-ghost py-3"
          >
            <Send size={13} strokeWidth={1.5} />
            Telegram-канал
          </a>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-ghost py-3"
          >
            <Send size={13} strokeWidth={1.5} />
            Личные сообщения
          </a>
        </div>
      </div>
    </footer>
  );
}

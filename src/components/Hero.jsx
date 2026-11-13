import { ArrowDown, Send } from "lucide-react";
import { MARQUEE, TG_TAILOR } from "../data/content.js";
import { Reveal } from "./ui.jsx";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/assets/hero_veil.jpg"
          alt="Платье Veil of Ash — бордовый корсет с кружевом и фатой"
          className="h-full w-full object-cover object-[center_20%] opacity-55 md:object-[center_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/55" />
        <div className="absolute inset-0 animate-breathe bg-[radial-gradient(ellipse_at_72%_32%,rgba(155,20,32,0.30),transparent_58%)]" />
        <div className="u-noise absolute inset-0" />
      </div>

      <div className="u-container relative z-10 flex flex-1 flex-col justify-center pb-16 pt-28 sm:pt-32">
        <Reveal className="mb-7 flex items-center gap-4">
          <span className="h-px w-10 bg-blood" />
          <span className="u-eyebrow">Авторские эскизы · Ручная работа</span>
        </Reveal>

        <h1 className="font-serif font-light leading-[0.92] text-bone u-text-balance">
          <Reveal
            as="span"
            delay={120}
            className="block text-[clamp(3.2rem,12vw,10.5rem)] tracking-[0.05em]"
          >
            XANAMI
          </Reveal>
          <Reveal
            as="span"
            delay={260}
            className="mt-5 block text-[clamp(1.25rem,3.6vw,2.9rem)] italic text-silver"
          >
            Gothic Couture <span className="not-italic text-blood">&amp;</span> Dark
            Streetwear
          </Reveal>
        </h1>

        <Reveal delay={420} className="mt-8 max-w-xl">
          <p className="text-sm font-light leading-relaxed text-silver/90 sm:text-base">
            Авторские вечерние платья и повседневная одежда.
            Повседневные коллекции отшиваются по размерной сетке, а вечерние наряды создаются на заказ с учётом индивидуальных мерок.
          </p>
        </Reveal>

        <Reveal delay={560} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#catalog" className="u-btn u-btn-solid">
            Смотреть каталог
            <ArrowDown size={14} strokeWidth={1.5} />
          </a>
          <a href="#order" className="u-btn u-btn-ghost">
            <Send size={14} strokeWidth={1.5} />
            Оставить заявку
          </a>
        </Reveal>

        <Reveal delay={700} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-cond text-[10px] uppercase tracking-[0.24em] text-ash">
            Доставка СДЭК
          </span>
          <span className="h-1 w-1 bg-white/20" />
          <span className="font-cond text-[10px] uppercase tracking-[0.24em] text-ash">
            РФ · Беларусь · за рубеж
          </span>
          <span className="h-1 w-1 bg-white/20" />
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cond text-[10px] uppercase tracking-[0.24em] text-silver underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone"
          >
            Telegram
          </a>
        </Reveal>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink/60 py-4 backdrop-blur-md">
        {/*
          Две одинаковые группы, каждая не уже экрана (min-w-full) и сама
          уезжает на свою ширину влево — стык бесшовный на любом мониторе.
        */}
        <div className="flex" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex min-w-full shrink-0 animate-marquee items-center justify-around"
            >
              {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((text, i) => (
                <span
                  key={i}
                  className="flex shrink-0 items-center gap-8 px-4 font-cond text-[11px] uppercase tracking-[0.3em] text-silver"
                >
                  {text}
                  <span className="text-blood">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

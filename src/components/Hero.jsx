import { ArrowDown, Send } from "lucide-react";
import { MARQUEE, TG_TAILOR } from "../data/content.js";
import { Reveal } from "./ui.jsx";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* фон: фото платья + затемнение + бордовое свечение */}
      <div className="absolute inset-0">
        <img
          src="/assets/couture_burgundy_veil.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_22%] opacity-45 md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 animate-breathe bg-[radial-gradient(ellipse_at_75%_35%,rgba(155,20,32,0.30),transparent_55%)]" />
        <div className="u-noise absolute inset-0" />
      </div>

      <div className="u-container relative z-10 flex flex-1 flex-col justify-center pb-16 pt-28 sm:pt-32">
        <Reveal className="mb-7 flex items-center gap-4">
          <span className="h-px w-10 bg-blood" />
          <span className="u-eyebrow">Минск · Made to order</span>
        </Reveal>

        <h1 className="font-serif font-light leading-[0.9] text-bone u-text-balance">
          <Reveal as="span" delay={120} className="block text-[clamp(3.6rem,13vw,11.5rem)] tracking-[0.05em]">
            XANAMI
          </Reveal>
          <Reveal
            as="span"
            delay={260}
            className="mt-5 block text-[clamp(1.4rem,4vw,3.25rem)] italic text-silver"
          >
            Gothic Couture <span className="not-italic text-blood">&amp;</span> Dark Streetwear
          </Reveal>
        </h1>

        <Reveal delay={420} className="mt-8 max-w-xl">
          <p className="text-sm font-light leading-relaxed text-silver/90 sm:text-base">
            Ручная работа, индивидуальный пошив и лимитированные дропы. Вечерние
            платья, корсеты и кружево — и тяжёлая streetwear-фактура: зипки и
            деним малыми партиями.
          </p>
        </Reveal>

        <Reveal delay={560} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#couture" className="u-btn u-btn-ghost">
            Исследовать коллекцию
            <ArrowDown size={14} strokeWidth={1.5} />
          </a>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-solid"
          >
            <Send size={14} strokeWidth={1.5} />
            Связаться в TG
          </a>
        </Reveal>
      </div>

      {/* бегущая строка */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink/60 py-4 backdrop-blur-md">
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((text, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 px-4 font-cond text-[11px] uppercase tracking-[0.3em] text-silver"
            >
              {text}
              <span aria-hidden="true" className="text-blood">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Send, ArrowUpRight, Lock } from "lucide-react";
import { COUTURE, TG_TAILOR, tg, LINKS } from "../data/content";
import { Reveal, SectionHead, CornerMarks } from "./ui";

function Card({ item, index }) {
  const [hovered, setHovered] = useState(false);

  const href = tg(
    LINKS.tailor,
    `Здравствуйте! Пишу с сайта XANAMI — хочу обсудить пошив по модели «${item.name}».`
  );

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 90}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden border border-white/10 bg-coal">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.img}
            alt={`${item.name} — ${item.kind}`}
            loading={index < 3 ? "eager" : "lazy"}
            className="h-full w-full object-cover object-[50%_22%] opacity-90 transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
          />

          {/* затемнение + вуаль по ховеру */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

          <CornerMarks className="m-3 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* индекс */}
          <span className="absolute left-3 top-3 font-cond text-[9px] tracking-[0.3em] text-bone/55">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Кнопка поверх фото */}
          <div className="absolute inset-x-3 bottom-3">
            <div
              className={`transition-all duration-500 ease-out ${
                hovered
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-3 opacity-0 blur-[2px]"
              }`}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-btn w-full border-white/25 bg-ink/70 px-4 py-3.5 text-[10px] tracking-[0.2em] text-bone backdrop-blur-md hover:border-bone/60 hover:bg-ink/90"
              >
                <Send size={13} strokeWidth={1.5} aria-hidden="true" />
                Обсудить пошив в TG
              </a>
            </div>
          </div>
        </div>

        {/* Подпись */}
        <div className="flex items-start justify-between gap-4 border-t border-white/10 px-4 py-4">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg font-light text-bone">
              {item.name}
            </h3>
            <p className="mt-1 truncate font-cond text-[9px] uppercase tracking-[0.2em] text-ash">
              {item.kind}
            </p>
          </div>
          <span className="shrink-0 pt-1 font-cond text-[9px] uppercase tracking-[0.18em] text-silver/70">
            made to order
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3">
          <span className="truncate font-cond text-[9px] uppercase tracking-[0.18em] text-ash">
            {item.meta}
          </span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Обсудить пошив модели ${item.name}`}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-white/10 text-silver transition-colors duration-500 hover:border-blood/60 hover:text-white"
          >
            <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function CoutureGallery() {
  return (
    <section
      id="couture"
      className="relative scroll-mt-16 py-20 sm:py-28 lg:py-32"
    >
      {/* мягкое свечение слева */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blood/[0.07] blur-[120px]"
      />

      <div className="u-container relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            eyebrow="Gothic Couture · архив"
            title="Платья, сшитые"
            accent="по одному разу"
            note="Каждая модель создаётся под конкретного человека: посадка, длина, ткань и фурнитура подбираются индивидуально. Ниже — архив работ ателье."
          />

          <Reveal delay={200} className="shrink-0">
            <a
              href={TG_TAILOR}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost"
            >
              <Send size={14} strokeWidth={1.5} aria-hidden="true" />
              Обсудить свой концепт
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {COUTURE.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center sm:mt-12">
          <Lock size={13} strokeWidth={1.25} className="text-ash" aria-hidden="true" />
          <p className="max-w-md text-[13px] font-light leading-relaxed text-ash">
            Модели из архива можно повторить в вашем размере и другой ткани —
            или начать с полностью нового эскиза.
          </p>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-cond text-[10px] uppercase tracking-[0.28em] text-bone underline decoration-white/20 underline-offset-8 transition hover:decoration-blood"
          >
            Написать дизайнеру
          </a>
        </Reveal>
      </div>
    </section>
  );
}

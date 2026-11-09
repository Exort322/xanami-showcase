import { MessageCircle, Ruler, Scissors, Send } from "lucide-react";
import { RITUAL, TG_TAILOR } from "../data/content.js";
import { CornerMarks, Reveal, SectionHead } from "./ui.jsx";

const ICONS = [Ruler, MessageCircle, Scissors];

export default function Ritual() {
  return (
    <section
      id="ritual"
      className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32"
    >
      {/* мягкое бордовое свечение за блоком */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(155,20,32,0.12),transparent_65%)] animate-breathe"
      />

      <div className="u-container relative">
        <div className="mb-16">
          <SectionHead
            index="04"
            eyebrow="Order ritual"
            title="Как проходит"
            accent="заказ"
            note="Без корзин и форм. Весь процесс — в личных сообщениях Telegram."
            align="center"
          />
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {RITUAL.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                as="li"
                key={step.n}
                delay={i * 140}
                className="u-glass relative flex flex-col gap-6 p-7 transition-colors duration-500 hover:border-blood/40 sm:p-9"
              >
                <CornerMarks />
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl font-light italic leading-none text-white/15">
                    {step.n}
                  </span>
                  <Icon size={22} strokeWidth={1.25} className="text-silver" />
                </div>
                <h3 className="font-serif text-3xl font-light leading-tight text-bone">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ash">{step.text}</p>
                <p className="mt-auto pt-4 font-cond text-[10px] uppercase tracking-[0.26em] text-blood">
                  {step.tag}
                </p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="font-serif text-2xl font-light italic text-silver sm:text-3xl">
            Готовы обсудить концепт?
          </p>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-solid"
          >
            <Send size={14} strokeWidth={1.5} />
            Написать в Telegram
          </a>
        </Reveal>
      </div>
    </section>
  );
}

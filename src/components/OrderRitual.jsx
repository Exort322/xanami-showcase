import { Send, MessageCircle, Scissors, Package, ArrowUpRight } from "lucide-react";
import { RITUAL, TG_TAILOR, TG_CHANNEL } from "../data/content";
import { Reveal, SectionHead, CornerMarks } from "./ui";

const ICONS = [MessageCircle, Scissors, Package];

export default function OrderRitual() {
  return (
    <section id="ritual" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* фон: затемнённое фото с сильной вуалью */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/assets/couture_black_velvet.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-[50%_30%] opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />
        <div className="u-noise absolute inset-0" />
      </div>

      <div className="u-container relative">
        <SectionHead
          index="04"
          eyebrow="Ритуал заказа"
          title="Три шага"
          accent="до вашей вещи"
          note="Никаких корзин и форм — только диалог. Весь процесс идёт в Telegram, чтобы вы видели каждый этап и могли что-то поменять по ходу."
        />

        <div className="mt-12 grid grid-cols-1 gap-px border border-white/10 bg-white/[0.06] sm:mt-16 lg:grid-cols-3">
          {RITUAL.map((step, i) => {
            const Icon = ICONS[i] ?? MessageCircle;
            return (
              <Reveal
                key={step.n}
                delay={i * 110}
                className="group relative bg-ink/85 p-6 backdrop-blur-sm transition-colors duration-700 hover:bg-ink/60 sm:p-8"
              >
                <CornerMarks className="m-3 opacity-0 transition-opacity duration-700 group-hover:opacity-60" />

                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-white/15 transition-colors duration-700 group-hover:text-blood/60">
                    {step.n}
                  </span>
                  <Icon
                    size={18}
                    strokeWidth={1.25}
                    className="text-silver/50 transition-colors duration-700 group-hover:text-bone"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-8 font-serif text-xl font-light text-bone sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-[13px] font-light leading-relaxed text-bone/60 sm:text-sm">
                  {step.text}
                </p>

                <p className="mt-6 border-t border-white/[0.07] pt-3 font-cond text-[9px] uppercase tracking-[0.22em] text-ash">
                  {step.tag}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* CTA-блок */}
        <Reveal delay={80} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-blood/[0.12] via-white/[0.02] to-transparent p-6 backdrop-blur-md sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blood/20 blur-[90px]"
            />
            <CornerMarks className="m-4 opacity-40" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="u-eyebrow">Свободные слоты · по записи</p>
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,3.4vw,2.4rem)] font-light leading-tight text-bone">
                  Начните с одного сообщения
                </h3>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-bone/60 sm:text-sm">
                  Расскажите, что хотите сшить или какой дроп ищете — ответим
                  с вариантами, сроками и стоимостью. Мерки и эскиз обсудим там же.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
                <a
                  href={TG_TAILOR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-btn u-btn-solid w-full sm:w-auto"
                >
                  <Send size={14} strokeWidth={1.5} aria-hidden="true" />
                  Написать дизайнеру
                </a>
                <a
                  href={TG_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-btn u-btn-ghost w-full sm:w-auto"
                >
                  Канал @xana_mi
                  <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

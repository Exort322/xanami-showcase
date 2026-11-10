import { Info, Ruler } from "lucide-react";
import { MEASUREMENTS, MEASURE_TIPS, TG_TAILOR } from "../data/content.js";
import { Reveal, SectionHead } from "./ui.jsx";

export default function Measurements() {
  return (
    <section
      id="measurements"
      className="relative border-t border-white/10 bg-coal py-20 sm:py-28"
    >
      <div className="u-container">
        <SectionHead
          index="05"
          eyebrow="Как снять мерки"
          title="Шесть цифр,"
          accent="и вещь сядет"
          note="Примерок нет — приём только онлайн. Поэтому мерки важны: по ним собирается посадка."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {MEASUREMENTS.map((m, i) => (
                <Reveal
                  key={m.n}
                  delay={i * 70}
                  className="flex items-start gap-4 bg-ink p-5 sm:p-6"
                >
                  <span className="mt-0.5 font-cond text-[10px] tracking-[0.2em] text-blood">
                    {m.n}
                  </span>
                  <div>
                    <p className="font-serif text-lg font-light text-bone">{m.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ash">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal className="u-glass relative flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Ruler size={18} strokeWidth={1.25} className="text-blood" />
                <p className="font-serif text-xl font-light text-bone">
                  Чтобы не переделывать
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {MEASURE_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm leading-relaxed text-silver">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-blood" />
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-start gap-2.5 border-t border-white/10 pt-5">
                <Info size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ash" />
                <p className="text-xs leading-relaxed text-ash">
                  Не уверены, что сняли правильно? Пришлите мерки в Telegram — проверю до
                  начала пошива.
                </p>
              </div>

              <a
                href={TG_TAILOR}
                target="_blank"
                rel="noopener noreferrer"
                className="u-btn u-btn-ghost mt-1 w-full"
              >
                Отправить мерки в TG
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

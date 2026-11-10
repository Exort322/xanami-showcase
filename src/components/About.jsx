import { Scissors, Ruler, Layers, Truck } from "lucide-react";
import { ABOUT, TG_CHANNEL } from "../data/content.js";
import { Reveal, SectionHead } from "./ui.jsx";

const ICONS = [Scissors, Ruler, Layers, Truck];

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 py-20 sm:py-28">
      <div className="u-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              index="01"
              eyebrow="О мастерской"
              title="Одна мастерская,"
              accent="одна пара рук"
              note=""
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-5">
              {ABOUT.text.map((par, i) => (
                <Reveal
                  key={i}
                  delay={i * 90}
                  as="p"
                  className="text-sm font-light leading-relaxed text-silver sm:text-base"
                >
                  {par}
                </Reveal>
              ))}
            </div>

            <Reveal delay={220} className="mt-8">
              <a
                href={TG_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-white/20 pb-1 font-cond text-[11px] uppercase tracking-[0.24em] text-silver transition-colors hover:border-blood hover:text-bone"
              >
                Смотреть работы в канале
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.advantages.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="flex flex-col gap-4 bg-ink p-6 transition-colors duration-500 hover:bg-white/[0.02] sm:p-7"
              >
                <Icon size={20} strokeWidth={1.25} className="text-blood" />
                <div>
                  <p className="font-serif text-xl font-light leading-snug text-bone">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ash">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

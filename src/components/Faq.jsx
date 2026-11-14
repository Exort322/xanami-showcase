import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQ } from "../data/content.js";
import { Reveal, SectionHead } from "./ui.jsx";

export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className="relative border-t border-white/10 bg-coal py-20 sm:py-28">
      <div className="u-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead
              index="07"
              eyebrow="Вопросы"
              title="Часто"
              accent="спрашивают"
              note="Если ответа нет — напишите в Telegram, отвечу лично."
            />
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-white/10">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal
                    key={item.q}
                    delay={Math.min(i, 6) * 50}
                    className="border-b border-white/10"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={`font-serif text-lg font-light leading-snug transition-colors duration-300 sm:text-xl ${
                            isOpen ? "text-bone" : "text-silver group-hover:text-bone"
                          }`}
                        >
                          {item.q}
                        </span>
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-white/15 text-silver transition-colors group-hover:border-white/35">
                          {isOpen ? (
                            <Minus size={13} strokeWidth={1.5} />
                          ) : (
                            <Plus size={13} strokeWidth={1.5} />
                          )}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-ash">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

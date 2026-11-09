import { Lock, Send } from "lucide-react";
import { DROPS, dropMessage } from "../data/content.js";
import { Figure, Reveal, SectionHead, StatusBadge } from "./ui.jsx";

export default function Drops() {
  return (
    <section
      id="streetwear"
      className="relative border-t border-white/10 bg-coal py-24 sm:py-32"
    >
      <div className="u-container">
        <div className="mb-16">
          <SectionHead
            index="03"
            eyebrow="Alt Streetwear"
            title="Streetwear"
            accent="drops"
            note="Кастомные зипки и джинсы выпускаем ограниченными партиями. Когда партия закончилась — карточка получает статус Sold out."
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {DROPS.map((item, i) => {
            const soldout = item.status === "soldout";
            const price = item.price || "уточняется";

            return (
              <Reveal
                key={item.id}
                as="article"
                delay={(i % 3) * 110}
                className="group relative flex flex-col bg-ink"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Figure
                    src={item.img}
                    alt={item.name}
                    label={item.name}
                    style={
                      soldout
                        ? { filter: "grayscale(0.85) brightness(0.55)" }
                        : undefined
                    }
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                  <div>
                    <p className="u-eyebrow">{item.kind}</p>
                    <h3 className="mt-2 font-serif text-2xl font-light text-bone">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-ash">{item.meta}</p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <p className="font-cond text-[10px] uppercase tracking-[0.25em] text-ash">
                        Размер · {item.size}
                      </p>
                      <p
                        className={`mt-1 font-serif text-xl ${
                          soldout ? "text-ash" : "text-bone"
                        }`}
                      >
                        {soldout ? "Партия закончилась" : price}
                      </p>
                    </div>
                  </div>

                  {soldout ? (
                    <span aria-disabled="true" className="u-btn u-btn-off w-full">
                      <Lock size={14} strokeWidth={1.5} />
                      Sold out
                    </span>
                  ) : (
                    <a
                      href={dropMessage({ ...item, price })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-btn u-btn-blood w-full"
                    >
                      <Send size={14} strokeWidth={1.5} />
                      Купить в TG
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

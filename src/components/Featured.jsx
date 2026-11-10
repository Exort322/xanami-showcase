import { ArrowUpRight } from "lucide-react";
import { FEATURED } from "../data/content.js";
import { Reveal, SectionHead } from "./ui.jsx";

export default function Featured({ onOpenFeatured }) {
  return (
    <section id="featured" className="relative border-t border-white/10 py-20 sm:py-28">
      <div className="u-container">
        <SectionHead
          index="04"
          eyebrow="Визитные работы"
          title="Три вещи,"
          accent="с которых всё началось"
          note="Кадры, по которым марку узнают. Нажмите на работу, чтобы открыть карточку."
        />

        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-3">
          {FEATURED.map((item, i) => (
            <Reveal key={item.id} delay={i * 120}>
              <button
                type="button"
                onClick={() => onOpenFeatured(item.id)}
                className="group relative block aspect-[4/5] w-full overflow-hidden border border-white/10 bg-coal"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left sm:p-6">
                  <div>
                    <p className="u-eyebrow text-[9px]">{item.note}</p>
                    <p className="mt-1.5 font-serif text-2xl font-light text-bone">
                      {item.name}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mb-1 shrink-0 text-silver transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui.jsx";

const SIDES = [
  {
    key: "dresses",
    label: "Gothic Couture",
    img: "/assets/couture_black_velvet.jpg",
    target: "dresses",
    text: "Вечерние платья, корсеты, кружево и бархат — по вашим меркам. 50% при заказе, остальное после фото.",
    tags: ["Платья", "Корсеты", "Кружево", "Бархат"],
    cta: "Смотреть платья",
  },
  {
    key: "street",
    label: "Alt Streetwear",
    img: "/assets/street_zip_blond.jpg",
    target: "zip",
    text: "Кастомные зипки и джинсы: оверсайз, фурнитура, мех. Шьются под заказ, 100% предоплата.",
    tags: ["Зипки", "Джинсы", "Оверсайз", "Фурнитура"],
    cta: "Смотреть дропы",
  },
];

export default function DualIdentity({ onOpenCategory }) {
  const [hover, setHover] = useState(null);

  return (
    <section id="identity" className="relative bg-ink pt-4 pb-20 sm:pb-28">
      <div className="u-container">
        <SectionHead
          index="02"
          eyebrow="Два направления"
          title="Одна марка,"
          accent="две тени"
          note="Наведите курсор, чтобы выбрать направление — или сразу перейдите в каталог."
        />
      </div>

      <div className="mt-12 grid grid-cols-1 border-y border-white/10 md:h-[62vh] md:min-h-[460px] md:grid-cols-2">
        {SIDES.map((side, i) => {
          const dimmed = hover !== null && hover !== side.key;
          return (
            <button
              type="button"
              key={side.key}
              onClick={() => onOpenCategory(side.target)}
              onMouseEnter={() => setHover(side.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(side.key)}
              onBlur={() => setHover(null)}
              className={`group relative isolate flex min-h-[420px] overflow-hidden text-left md:min-h-0 ${
                i === 0 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""
              }`}
            >
              <img
                src={side.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.4s] ease-out ${
                  dimmed
                    ? "scale-[1.03] opacity-[0.12] grayscale md:opacity-[0.08]"
                    : "scale-100 opacity-55 group-hover:scale-105 group-hover:opacity-75"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              <div className="u-noise absolute inset-0" />

              <div
                className={`relative z-10 flex w-full flex-col justify-end gap-5 p-7 transition-opacity duration-700 sm:p-10 lg:p-12 ${
                  dimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <Reveal className="flex flex-col gap-4">
                  <span className="u-eyebrow">
                    0{i + 1} — {side.key === "dresses" ? "Couture" : "Streetwear"}
                  </span>
                  <h3 className="font-serif text-4xl font-light leading-none text-bone sm:text-5xl lg:text-6xl">
                    {side.label}
                  </h3>
                  <p className="max-w-md text-sm font-light leading-relaxed text-silver">
                    {side.text}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {side.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 bg-white/[0.02] px-3 py-1.5 font-cond text-[10px] uppercase tracking-[0.2em] text-silver backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-1 inline-flex items-center gap-2 font-cond text-[11px] uppercase tracking-[0.26em] text-bone">
                    {side.cta}
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Reveal>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

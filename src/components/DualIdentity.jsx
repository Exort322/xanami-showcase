import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui.jsx";

const SIDES = [
  {
    key: "couture",
    label: "Gothic Couture",
    img: "/assets/couture_black_velvet.jpg",
    href: "#couture",
    text: "Вечерние платья, корсеты, кружево и бархат. Шьём на заказ — под вашу фигуру и настроение.",
    tags: ["Платья", "Корсеты", "Кружево", "Бархат"],
    cta: "Смотреть платья",
  },
  {
    key: "street",
    label: "Alt Streetwear",
    img: "/assets/street_zip_blond.jpg",
    href: "#streetwear",
    text: "Кастомные зипки и джинсы: оверсайз, фурнитура, мех. Выпускаем лимитированными дропами.",
    tags: ["Зипки", "Джинсы", "Оверсайз", "Дропы"],
    cta: "Смотреть дропы",
  },
];

export default function DualIdentity() {
  const [hover, setHover] = useState(null);

  return (
    <section id="identity" className="relative bg-ink py-24 sm:py-32">
      <div className="u-container">
        <SectionHead
          index="01"
          eyebrow="Dual identity"
          title="Одна марка,"
          accent="две тени"
          note="Два направления — одна эстетика. Наведите курсор на половину, чтобы выбрать."
        />
      </div>

      <div className="mt-16 grid grid-cols-1 border-y border-white/10 md:h-[78vh] md:min-h-[560px] md:grid-cols-2">
        {SIDES.map((side, i) => {
          const dimmed = hover !== null && hover !== side.key;
          return (
            <a
              key={side.key}
              href={side.href}
              onMouseEnter={() => setHover(side.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(side.key)}
              onBlur={() => setHover(null)}
              className={`group relative isolate flex min-h-[520px] overflow-hidden md:min-h-0 ${
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
                    : "scale-100 opacity-65 group-hover:scale-105 group-hover:opacity-80"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              <div className="u-noise absolute inset-0" />

              <div
                className={`relative z-10 flex w-full flex-col justify-end gap-6 p-7 transition-opacity duration-700 sm:p-10 lg:p-14 ${
                  dimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <Reveal className="flex flex-col gap-5">
                  <span className="u-eyebrow">
                    0{i + 1} — {side.key === "couture" ? "Couture" : "Streetwear"}
                  </span>
                  <h3 className="font-serif text-5xl font-light leading-none text-bone sm:text-6xl lg:text-7xl">
                    {side.label}
                  </h3>
                  <p className="max-w-md text-sm font-light leading-relaxed text-silver sm:text-base">
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
                  <span className="mt-2 inline-flex items-center gap-2 font-cond text-[11px] uppercase tracking-[0.26em] text-bone">
                    {side.cta}
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Reveal>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

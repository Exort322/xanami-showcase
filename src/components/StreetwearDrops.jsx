import { useState } from "react";
import { Send, ArrowUpRight, Bell, Lock } from "lucide-react";
import { DROPS, TG_CHANNEL, dropMessage } from "../data/content";
import { Reveal, SectionHead, StatusBadge, CornerMarks } from "./ui";

function DropCard({ item, index }) {
  const sold = item.status === "soldout";
  const [flipped, setFlipped] = useState(false);
  const href = dropMessage(item);

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 90}
      className={`group relative flex flex-col border bg-coal transition-colors duration-700 ${
        sold
          ? "border-white/[0.07]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {/* Фото */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={flipped && item.imgAlt ? item.imgAlt : item.img}
          alt={`${item.name} — ${item.kind}`}
          loading={index < 2 ? "eager" : "lazy"}
          className={`h-full w-full object-cover object-[50%_20%] transition-all duration-[900ms] ease-out ${
            sold
              ? "opacity-40 saturate-[0.15]"
              : "opacity-90 group-hover:scale-[1.04] group-hover:opacity-100"
          }`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent ${
            sold ? "opacity-90" : "opacity-60"
          }`}
        />

        <CornerMarks className="m-3 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Статус */}
        <div className="absolute left-3 top-3">
          <StatusBadge status={item.status} />
        </div>

        {/* Переключатель вида */}
        {item.imgAlt && (
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 border border-white/15 bg-ink/70 px-2 py-1.5 font-cond text-[8px] uppercase tracking-[0.2em] text-bone backdrop-blur-md transition hover:border-white/40"
          >
            {flipped ? "Спина" : "Перед"}
          </button>
        )}

        {/* затемнение поверх при sold out */}
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rotate-[-8deg] border border-white/20 bg-ink/70 px-5 py-2 font-cond text-[11px] uppercase tracking-[0.36em] text-bone/70 backdrop-blur-sm">
              sold out
            </span>
          </div>
        )}
      </div>

      {/* Тело карточки */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-serif text-lg font-light leading-tight ${
              sold ? "text-bone/50" : "text-bone"
            }`}
          >
            {item.name}
          </h3>
          <span className="shrink-0 font-cond text-[10px] uppercase tracking-[0.16em] text-silver">
            {item.price}
          </span>
        </div>

        <p className="mt-1 font-cond text-[9px] uppercase tracking-[0.2em] text-ash">
          {item.kind}
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 font-cond text-[9px] uppercase tracking-[0.18em] text-ash">
          <span>{item.size}</span>
          <span className="h-2 w-px bg-white/15" />
          <span className="truncate">{item.meta}</span>
        </div>

        {/* Кнопка */}
        <div className="mt-4">
          {sold ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="u-btn u-btn-off w-full px-4 py-3.5 text-[10px] tracking-[0.2em]"
            >
              <Lock size={12} strokeWidth={1.5} aria-hidden="true" />
              Продан
            </button>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-blood w-full px-4 py-3.5 text-[10px] tracking-[0.2em]"
            >
              <Send size={12} strokeWidth={1.5} aria-hidden="true" />
              Забрать в TG
            </a>
          )}
        </div>
      </div>

      {/* верхняя акцентная линия */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left transition-transform duration-700 ${
          sold ? "bg-white/10" : "bg-blood/80"
        } ${sold ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </Reveal>
  );
}

export default function StreetwearDrops() {
  const available = DROPS.filter((d) => d.status === "limited").length;

  return (
    <section
      id="streetwear"
      className="relative scroll-mt-16 border-y border-white/10 bg-coal/40 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blood/[0.06] blur-[120px]"
      />

      <div className="u-container relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="03"
            eyebrow="Alt Streetwear · дропы"
            title="Малые партии."
            accent="Без повторов"
            note="Зипки и джинсы собираются вручную ограниченным тиражом. Наличие обновляется в Telegram-канале — статус на карточке может отставать на несколько часов."
          />

          <Reveal delay={200} className="shrink-0">
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-ghost"
            >
              <Bell size={14} strokeWidth={1.5} aria-hidden="true" />
              Следить за дропами
            </a>
          </Reveal>
        </div>

        {/* Легенда статусов */}
        <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/[0.07] py-3">
          <span className="font-cond text-[9px] uppercase tracking-[0.28em] text-ash">
            Легенда
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-blood" />
            <span className="font-cond text-[9px] uppercase tracking-[0.2em] text-silver">
              Limited drop — доступно к заказу
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-ash" />
            <span className="font-cond text-[9px] uppercase tracking-[0.2em] text-ash">
              Sold out — тираж закончился
            </span>
          </span>
          <span className="ml-auto font-cond text-[9px] uppercase tracking-[0.2em] text-silver">
            {available} из {DROPS.length} в наличии
          </span>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {DROPS.map((item, i) => (
            <DropCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-[13px] font-light leading-relaxed text-ash">
            Нужен другой размер или расцветка? Часть вещей можно повторить
            под заказ — напишите в Telegram.
          </p>
          <a
            href={TG_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-cond text-[10px] uppercase tracking-[0.26em] text-bone underline decoration-white/20 underline-offset-8 transition hover:decoration-blood"
          >
            Канал @xana_mi
            <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

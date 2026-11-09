import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Появление при скролле: fade + blur + подъём
   ───────────────────────────────────────────────────────────── */

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`u-reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Активная секция для подсветки навигации
   ───────────────────────────────────────────────────────────── */

export function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.2, 0.5], rootMargin: "-20% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/* ─────────────────────────────────────────────────────────────
   Заголовок секции
   ───────────────────────────────────────────────────────────── */

export function SectionHead({ index, eyebrow, title, accent, note, align = "left" }) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Reveal className="flex items-center gap-4">
        {index && (
          <span className="font-cond text-[10px] tracking-[0.3em] text-blood">
            {index}
          </span>
        )}
        <span className="h-px w-8 bg-white/20 sm:w-12" />
        <span className="u-eyebrow">{eyebrow}</span>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-serif text-[clamp(2rem,6vw,4.25rem)] font-light leading-[1.02] text-bone u-text-balance">
          {title}{" "}
          {accent && <em className="italic text-silver">{accent}</em>}
        </h2>
      </Reveal>

      {note && (
        <Reveal delay={140}>
          <p
            className={`max-w-xl text-sm font-light leading-relaxed text-ash sm:text-[15px] ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {note}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Мелкие декоративные элементы
   ───────────────────────────────────────────────────────────── */

export function CornerMarks({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className="absolute left-0 top-0 h-3 w-px bg-white/25" />
      <span className="absolute left-0 top-0 h-px w-3 bg-white/25" />
      <span className="absolute right-0 top-0 h-3 w-px bg-white/25" />
      <span className="absolute right-0 top-0 h-px w-3 bg-white/25" />
      <span className="absolute bottom-0 left-0 h-3 w-px bg-white/25" />
      <span className="absolute bottom-0 left-0 h-px w-3 bg-white/25" />
      <span className="absolute bottom-0 right-0 h-3 w-px bg-white/25" />
      <span className="absolute bottom-0 right-0 h-px w-3 bg-white/25" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Изображение с аккуратным fallback.
   Если файла в public/assets нет — вместо битой иконки
   показывается тёмная плашка с названием модели.
   ───────────────────────────────────────────────────────────── */

export function Figure({ src, alt, label, className = "", style }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,rgba(155,20,32,0.14),transparent_70%)] text-center ${className}`}
      >
        <span className="font-serif text-2xl italic text-white/25">✦</span>
        <span className="px-6 font-cond text-[10px] uppercase tracking-[0.26em] text-ash">
          {label || alt}
        </span>
        <span className="hidden font-mono text-[9px] text-white/20 sm:block">
          {src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={style}
      className={className}
    />
  );
}

export function StatusBadge({ status }) {
  if (status === "soldout") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-white/15 bg-ink/80 px-2.5 py-1.5 font-cond text-[9px] uppercase tracking-[0.22em] text-ash backdrop-blur-md">
        <span className="h-1 w-1 bg-ash" />
        Sold out
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 border border-blood/60 bg-blood/85 px-2.5 py-1.5 font-cond text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur-md">
      <span className="h-1 w-1 animate-pulse bg-white" />
      Limited drop
    </span>
  );
}

import { useMemo, useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { PhotoNote, Reveal, SectionHead } from "./ui.jsx";

const formatPrice = (value) =>
  value ? `${value.toLocaleString("ru-RU")} ₽` : "по запросу";

export default function Catalog({ products, categories, onOpenProduct, category, onCategory, isLoading }) {
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    const list =
      category === "all" ? products : products.filter((p) => p.category === category);
    if (sort === "price-asc") {
      return [...list].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    }
  if (sort === "price-desc") {
      return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    }
    return list;
  }, [products, category, sort]);

  return (
    <section id="catalog" className="relative border-t border-white/10 bg-coal py-20 sm:py-28">
      <div className="u-container">
        <SectionHead
          index="03"
          eyebrow="Каталог"
          title="Изделия"
          accent="под заказ"
          note="Склада нет: каждая вещь шьётся по вашим меркам. Цена на платья — индивидуально, на зипки фиксированная."
        />

        {/* фильтры */}
        <div className="mt-10 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Категории изделий"
            className="-mx-1 flex gap-1 overflow-x-auto pb-1 sm:pb-0"
          >
            {/* Добавляем "Все изделия" в начало */}
            <button
              role="tab"
              aria-selected={category === "all"}
              onClick={() => onCategory("all")}
              className={`shrink-0 border px-4 py-2.5 font-cond text-[10px] uppercase tracking-[0.2em] transition-all duration-300 sm:text-[11px] ${
                category === "all"
                  ? "border-bone bg-bone text-ink"
                  : "border-white/10 bg-transparent text-silver hover:border-white/30 hover:text-bone"
              }`}
            >
              Все изделия
            </button>

            {/* Остальные категории (из таблицы и базовые) */}
            {categories.filter(c => c.id !== "all").map((cat) => {
              const activeCat = category === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCat}
                  onClick={() => onCategory(cat.id)}
                  className={`shrink-0 border px-4 py-2.5 font-cond text-[10px] uppercase tracking-[0.2em] transition-all duration-300 sm:text-[11px] ${
                    activeCat
                      ? "border-bone bg-bone text-ink"
                      : "border-white/10 bg-transparent text-silver hover:border-white/30 hover:text-bone"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={14} strokeWidth={1.5} className="text-ash" />
            <label className="sr-only" htmlFor="sort">
              Сортировка
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer border border-white/10 bg-ink px-3 py-2.5 font-cond text-[10px] uppercase tracking-[0.18em] text-silver outline-none transition-colors hover:border-white/30 focus:border-white/40"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        <p className="mt-5 font-cond text-[10px] uppercase tracking-[0.22em] text-ash">
          {isLoading ? "Загрузка..." : `${filtered.length} ${filtered.length === 1 ? "изделие" : "изделий"}`}
        </p>

        {/* Скелетон загрузки */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 xs:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col bg-ink">
                <div className="relative aspect-[4/5] animate-pulse bg-coal" />
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="h-3 w-1/3 animate-pulse bg-white/10" />
                  <div className="h-6 w-2/3 animate-pulse bg-white/10" />
                  <div className="h-3 w-1/2 animate-pulse bg-white/10" />
                  <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
                    <div className="h-5 w-1/4 animate-pulse bg-white/10" />
                    <div className="h-4 w-1/5 animate-pulse bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 xs:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col bg-ink"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="eager"
                    decoding="sync"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3">
                    <PhotoNote updated={item.photoStatus === "studio"} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProduct(item)}
                    aria-label={`Подробнее: ${item.name}`}
                    className="absolute inset-0"
                  >
                    <span className="sr-only">Подробнее</span>
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div>
                    <p className="u-eyebrow truncate text-[9px]">{item.kind}</p>
                    <h3 className="mt-2 font-serif text-2xl font-light text-bone">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ash">
                      {item.meta}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="font-cond text-[9px] uppercase tracking-[0.22em] text-ash">
                        Цена
                      </p>
                      <p className="mt-1 font-serif text-lg text-bone">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenProduct(item)}
                      className="inline-flex items-center gap-1.5 font-cond text-[10px] uppercase tracking-[0.2em] text-silver transition-colors hover:text-bone"
                    >
                      Подробнее
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && !filtered.length && (
          <p className="mt-10 text-center text-sm text-ash">
            В этой категории пока пусто.
          </p>
        )}
      </div>
    </section>
  );
}
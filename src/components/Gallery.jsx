import { Send } from "lucide-react";
import { COUTURE, LINKS, TG_TAILOR, tg } from "../data/content.js";
import { Figure, Reveal, SectionHead } from "./ui.jsx";

/**
 * Галерея Gothic Couture.
 * Чтобы заменить фото: положите файл в public/assets и поправьте поле img
 * в src/data/content.js. Текст и ссылка подхватятся автоматически.
 */
export default function Gallery() {
  return (
    <section id="couture" className="relative bg-ink py-24 sm:py-32">
      <div className="u-container">
        <div className="mb-16">
          <SectionHead
            index="02"
            eyebrow="Gothic Couture"
            title="Вечерние платья"
            accent="и корсеты"
            note="Каждая модель — индивидуальный пошив. Выберите силуэт за основу, детали и ткань обсудим в Telegram."
          />
        </div>

        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {COUTURE.map((item, i) => (
            <Reveal
              key={item.id}
              as="article"
              delay={(i % 4) * 90}
              className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-coal"
            >
              <Figure
                src={item.img}
                alt={`${item.name} — ${item.kind}`}
                label={item.name}
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />

              {/* текст — оставляем место под кнопку внизу */}
              <div className="absolute inset-x-0 bottom-0 px-4 pb-16 pt-6 sm:px-6 sm:pb-20">
                <p className="u-eyebrow mb-2 truncate text-[9px] sm:text-[10px]">
                  {item.kind}
                </p>
                <h3 className="font-serif text-xl font-light leading-tight text-bone sm:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-1 hidden text-xs text-ash sm:block">{item.meta}</p>
              </div>

              {/* кнопка появляется при hover (на мобильных — всегда) */}
              <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-500 sm:inset-x-4 sm:bottom-4 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <a
                  href={tg(
                    LINKS.tailor,
                    `Здравствуйте! С сайта XANAMI хочу обсудить пошив: ${item.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-btn u-btn-ghost w-full px-3 py-3 text-[10px] tracking-[0.2em] sm:px-4"
                >
                  <Send size={13} strokeWidth={1.5} />
                  Обсудить пошив в TG
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border border-white/10 bg-white/[0.02] p-7 backdrop-blur-md sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-serif text-2xl font-light text-bone sm:text-3xl">
              Не нашли свой силуэт?
            </p>
            <p className="mt-2 text-sm text-ash">
              Напишите — сошьём то, что существует только для вас.
            </p>
          </div>
          <a
            href={TG_TAILOR}
            target="_blank"
            rel="noopener noreferrer"
            className="u-btn u-btn-solid w-full sm:w-auto"
          >
            <Send size={14} strokeWidth={1.5} />
            Личный пошив в TG
          </a>
        </Reveal>
      </div>
    </section>
  );
}

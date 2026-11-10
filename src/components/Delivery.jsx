import { ArrowUpRight, Package, Truck } from "lucide-react";
import {
  CDEK_CALC,
  DELIVERY_FACTS,
  DELIVERY_STEPS,
  PREPAY,
} from "../data/content.js";
import { CornerMarks, Reveal, SectionHead } from "./ui.jsx";

export default function Delivery() {
  return (
    <section id="delivery" className="relative border-t border-white/10 py-20 sm:py-28">
      <div className="u-container">
        <SectionHead
          index="06"
          eyebrow="Доставка и оплата"
          title="Как это"
          accent="работает"
          note="Отправляю СДЭК по России, Беларуси и в страны, где есть отделения. Примерок нет — весь процесс онлайн."
        />

        {/* факты */}
        <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          {DELIVERY_FACTS.map((fact, i) => (
            <Reveal
              key={fact.k}
              delay={i * 80}
              className="flex flex-col gap-1.5 bg-ink p-6"
            >
              <p className="font-serif text-xl font-light text-bone">{fact.k}</p>
              <p className="text-xs leading-relaxed text-ash">{fact.v}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* шаги */}
          <div className="lg:col-span-7">
            <ol className="grid gap-4 sm:grid-cols-2">
              {DELIVERY_STEPS.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.n}
                  delay={i * 90}
                  className="u-glass relative flex flex-col gap-3 p-6"
                >
                  <CornerMarks />
                  <span className="font-serif text-4xl font-light italic leading-none text-white/15">
                    {step.n}
                  </span>
                  <p className="font-serif text-xl font-light text-bone">{step.title}</p>
                  <p className="text-sm leading-relaxed text-ash">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* оплата + калькулятор */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal className="u-glass flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Package size={18} strokeWidth={1.25} className="text-blood" />
                <p className="font-serif text-xl font-light text-bone">Оплата</p>
              </div>

              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="font-cond text-[10px] uppercase tracking-[0.2em] text-ash">
                    Платья
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-silver">
                    {PREPAY.dresses}
                  </dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="font-cond text-[10px] uppercase tracking-[0.2em] text-ash">
                    Зипки, джинсы и другое
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-silver">
                    {PREPAY.other}
                  </dd>
                </div>
              </dl>

              <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-ash">
                Оплата проходит только в Telegram. На сайте ничего не списывается и
                карта не запрашивается.
              </p>
            </Reveal>

            <Reveal delay={120} className="u-glass flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Truck size={18} strokeWidth={1.25} className="text-blood" />
                <p className="font-serif text-xl font-light text-bone">
                  Стоимость доставки
                </p>
              </div>

              <p className="text-sm leading-relaxed text-silver">
                Считается по тарифу СДЭК: зависит от города, веса и способа получения.
                Точную сумму показывает калькулятор на сайте перевозчика.
              </p>

              <a
                href={CDEK_CALC}
                target="_blank"
                rel="noopener noreferrer"
                className="u-btn u-btn-ghost w-full"
              >
                Калькулятор СДЭК
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>

              <p className="text-[11px] leading-relaxed text-ash">
                В поле «Откуда» укажите город отправки — его пришлю в переписке. Доставку
                оплачивает получатель при получении.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

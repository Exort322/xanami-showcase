import { useEffect, useMemo, useState } from "react";
import { Check, Send } from "lucide-react";
import { LINKS, TG_TAILOR, tg } from "../data/content.js";
import { CornerMarks, Reveal, SectionHead } from "./ui.jsx";

/**
 * Форма заявки. Бэкенда нет: поля собираются в готовое сообщение
 * и открывают чат в Telegram. Ничего не отправляется и не хранится
 * на сервере — так проще с персональными данными.
 */

const FIELD =
  "w-full border border-white/12 bg-ink px-3.5 py-3 text-sm text-bone placeholder:text-ash/70 outline-none transition-colors duration-300 focus:border-white/40";

const LABEL =
  "mb-1.5 block font-cond text-[10px] uppercase tracking-[0.2em] text-silver";

export default function OrderForm({ products, preset, onPresetConsumed }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    product: "",
    size: "",
    date: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  // если пришли из карточки товара — подставляем изделие
  useEffect(() => {
    if (!preset) return;
    setForm((f) => ({ ...f, product: preset.name }));
    setSent(false);
    onPresetConsumed?.();
  }, [preset, onPresetConsumed]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
    setSent(false);
  };

  const message = useMemo(() => {
    const lines = [
      "Заявка с сайта XANAMI",
      "",
      `Имя: ${form.name || "—"}`,
      `Связь: ${form.contact || "—"}`,
      `Изделие: ${form.product || "нужен совет"}`,
      `Размер / мерки: ${form.size || "пришлю позже"}`,
      `Желаемый срок: ${form.date || "не срочно"}`,
    ];
    if (form.comment.trim()) {
      lines.push("", `Комментарий: ${form.comment.trim()}`);
    }
    return lines.join("\n");
  }, [form]);

  const submit = (e) => {
    e.preventDefault();

    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!form.contact.trim()) next.contact = true;

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    window.open(tg(LINKS.tailor, message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="order" className="relative border-t border-white/10 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[85vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(155,20,32,0.13),transparent_65%)] animate-breathe"
      />

      <div className="u-container relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead
              index="08"
              eyebrow="Заявка"
              title="Оставить"
              accent="заявку"
              note="Заполните четыре поля — откроется Telegram с готовым сообщением. Останется нажать «Отправить»."
            />

            <Reveal delay={160} className="mt-8 flex flex-col gap-3">
              {[
                "Ничего не оплачивается на сайте",
                "Данные не сохраняются на сервере",
                "Отвечу лично в Telegram",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-2.5 text-xs text-ash sm:text-sm"
                >
                  <Check size={14} strokeWidth={1.5} className="shrink-0 text-blood" />
                  {item}
                </p>
              ))}
            </Reveal>

            <Reveal delay={240} className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-ash">
                Не хотите заполнять? Напишите сразу —{" "}
                <a
                  href={TG_TAILOR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone"
                >
                  @{LINKS.tailor}
                </a>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="u-glass relative p-6 sm:p-8">
              <CornerMarks />

              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={LABEL} htmlFor="order-name">
                      Как вас зовут *
                    </label>
                    <input
                      id="order-name"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Имя"
                      autoComplete="given-name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={`${FIELD} ${errors.name ? "border-blood/70" : ""}`}
                    />
                    {errors.name && (
                      <p id="err-name" className="mt-1.5 text-[11px] text-blood">
                        Укажите имя, чтобы я знала, к кому обращаться
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="order-contact">
                      Telegram или телефон *
                    </label>
                    <input
                      id="order-contact"
                      value={form.contact}
                      onChange={set("contact")}
                      placeholder="@username"
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? "err-contact" : undefined}
                      className={`${FIELD} ${errors.contact ? "border-blood/70" : ""}`}
                    />
                    {errors.contact && (
                      <p id="err-contact" className="mt-1.5 text-[11px] text-blood">
                        Нужен способ связи для ответа
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={LABEL} htmlFor="order-product">
                    Изделие
                  </label>
                  <select
                    id="order-product"
                    value={form.product}
                    onChange={set("product")}
                    className={`${FIELD} cursor-pointer`}
                  >
                    <option value="">Выберите из каталога или «нужен совет»</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.kind}
                      </option>
                    ))}
                    <option value="нужен совет">Пока не знаю, нужен совет</option>
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={LABEL} htmlFor="order-size">
                      Размер или мерки
                    </label>
                    <input
                      id="order-size"
                      value={form.size}
                      onChange={set("size")}
                      placeholder="S / 88-68-96 / пришлю позже"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="order-date">
                      Желаемый срок
                    </label>
                    <input
                      id="order-date"
                      value={form.date}
                      onChange={set("date")}
                      placeholder="К 20 декабря"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL} htmlFor="order-comment">
                    Комментарий
                  </label>
                  <textarea
                    id="order-comment"
                    value={form.comment}
                    onChange={set("comment")}
                    rows={3}
                    placeholder="Настроение, ткани, повод — всё, что важно"
                    className={`${FIELD} resize-none`}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[11px] leading-relaxed text-ash">
                    Нажимая кнопку, вы открываете Telegram с готовым текстом заявки.
                  </p>
                  <button type="submit" className="u-btn u-btn-solid w-full sm:w-auto">
                    <Send size={14} strokeWidth={1.5} />
                    Отправить в Telegram
                  </button>
                </div>

                {sent && (
                  <div
                    role="status"
                    className="flex items-start gap-3 border border-white/15 bg-white/[0.03] p-4"
                  >
                    <Check size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blood" />
                    <p className="text-xs leading-relaxed text-silver">
                      Telegram открылся в новой вкладке — нажмите «Отправить» в чате. Если
                      вкладка не появилась, напишите напрямую:{" "}
                      <a
                        href={tg(LINKS.tailor, message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/25 underline-offset-2 hover:text-bone"
                      >
                        открыть чат
                      </a>
                      .
                    </p>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from "react";
import { RefreshCw, X } from "lucide-react";

export default function ErrorWindow({ error, onClose, onRetry }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ошибка загрузки"
    >
      <button type="button" aria-label="Закрыть" onClick={onClose} className="fixed inset-0 h-full w-full cursor-default" />

      <div
        className="relative mx-auto mt-10 w-full max-w-md border border-white/10 bg-coal p-6 text-center sm:mt-0 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/10 text-silver transition-colors duration-300 hover:border-white/30 hover:text-bone"
        >
          <X size={14} strokeWidth={1.5} />
        </button>

        <p className="u-eyebrow">Ошибка загрузки</p>
        <h3 className="mt-3 font-serif text-2xl font-light text-bone">Не удалось загрузить витрину</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-ash">{error || "Проверьте соединение с интернетом и попробуйте ещё раз."}</p>

        <button type="button" onClick={onRetry} className="u-btn u-btn-solid mt-6 w-full">
          <RefreshCw size={14} strokeWidth={1.5} aria-hidden="true" />
          Повторить попытку
        </button>
      </div>
    </div>
  );
}
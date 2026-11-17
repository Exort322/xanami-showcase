import { RefreshCw, WifiOff } from "lucide-react";

export default function ErrorWindow({ error, onRetry }) {
  return (
    <div
      role="alert"
      className="mt-6 flex min-h-[320px] w-full flex-col items-center justify-center border border-white/10 bg-ink px-5 py-12 text-center sm:min-h-[420px] sm:px-8 sm:py-16"
    >
      <WifiOff size={28} strokeWidth={1.25} className="text-ash" aria-hidden="true" />
      <p className="u-eyebrow mt-5">Ошибка загрузки</p>
      <h3 className="mt-3 font-serif text-2xl font-light text-bone sm:text-3xl">
        Не удалось загрузить витрину
      </h3>
      <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-ash">
        {error || "Проверьте соединение с интернетом и попробуйте ещё раз."}
      </p>
      <button type="button" onClick={onRetry} className="u-btn u-btn-solid mt-6 w-full max-w-xs">
        <RefreshCw size={14} strokeWidth={1.5} aria-hidden="true" />
        Повторить попытку
      </button>
    </div>
  );
}

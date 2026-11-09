import { useState } from "react";

/**
 * Логотип XANAMI.
 * Берётся из /assets/logo.png. Если файла нет — показывается
 * fallback-текст изящным serif-шрифтом.
 */
export default function Logo({ className = "", fallbackClass = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-serif text-2xl font-light tracking-[0.32em] text-bone ${fallbackClass}`}
      >
        XANAMI
      </span>
    );
  }

  return (
    <img
      src="/assets/logo.png"
      alt="XANAMI"
      width={461}
      height={280}
      draggable="false"
      onError={() => setFailed(true)}
      className={`h-9 w-auto select-none ${className}`}
    />
  );
}

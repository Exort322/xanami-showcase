import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Send, X } from "lucide-react";
import { prepayFor } from "../data/content.js";
import { PhotoNote } from "./ui.jsx";

const formatPrice = (value) =>
  value ? `${value.toLocaleString("ru-RU")} ₽` : "по запросу";

export default function ProductModal({ product, onClose, onOrder }) {
  const [index, setIndex] = useState(0);
  
  // Рефы для свайпа
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const isHorizontalSwipe = useRef(false);

  const images = product ? [product.img, ...(product.gallery || [])].filter(Boolean) : [];

  useEffect(() => {
    setIndex(0);
    // Сбрасываем позицию при открытии нового товара
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = 'translateX(0px)';
    }
  }, [product]);

  useEffect(() => {
    if (!product) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) {
        setIndex((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && images.length > 1) {
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, images.length, onClose]);

  // Синхронизируем позицию ленты при изменении index (например, по клику на стрелки или клавиатуре)
  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    isDragging.current = true;
    isHorizontalSwipe.current = false;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !trackRef.current) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Определяем направление свайпа (если движение по горизонтали больше, чем по вертикали)
    if (!isHorizontalSwipe.current) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalSwipe.current = true;
      } else {
        // Если это вертикальный скролл, прерываем свайп
        isDragging.current = false;
        return;
      }
    }

    // Блокируем скролл страницы, если это горизонтальный свайп
    if (isHorizontalSwipe.current && e.cancelable) {
      e.preventDefault();
    }

    // Вычисляем смещение в процентах относительно ширины контейнера
    const width = trackRef.current.offsetWidth;
    let movePercent = (deltaX / width) * 100;
    
    // Ограничиваем свайп, если фото крайние
    if ((index === 0 && deltaX > 0) || (index === images.length - 1 && deltaX < 0)) {
      movePercent *= 0.2;
    }

    // Двигаем ленту напрямую через DOM
    const translateValue = -(index * 100) + movePercent;
    trackRef.current.style.transform = `translateX(${translateValue}%)`;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;

    // Получаем текущее смещение из style.transform
    const style = window.getComputedStyle(trackRef.current);
    const matrix = new WebKitCSSMatrix(style.transform);
    const currentTranslate = matrix.m41; // смещение по X в пикселях
    const width = trackRef.current.offsetWidth;
    const currentPercent = (currentTranslate / width) * 100;

    const minSwipePercent = 15; // Минимальный свайп для перелистывания (15% ширины)

    let newIndex = index;
    if (currentPercent < -(index * 100 + minSwipePercent) && index < images.length - 1) {
      newIndex = index + 1;
    } else if (currentPercent > -(index * 100 - minSwipePercent) && index > 0) {
      newIndex = index - 1;
    }

    setIndex(newIndex);
  };

  // Сброс позиции ленты, если свайп не удался
  useEffect(() => {
    if (!isDragging.current && trackRef.current) {
      trackRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [isDragging.current, index]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="fixed inset-0 h-full w-full cursor-default"
        tabIndex={-1}
      />

      <div className="relative z-10 my-0 w-full max-w-5xl border border-white/10 bg-ink shadow-2xl sm:my-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть карточку"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border border-white/15 bg-ink/80 text-bone backdrop-blur-md transition-colors hover:border-white/40"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* галерея */}
          <div 
            className="relative aspect-[4/5] touch-pan-y overflow-hidden bg-coal md:aspect-auto md:min-h-[560px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Лента картинок */}
            <div 
              ref={trackRef}
              className="flex h-full w-full"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((img, i) => (
                <div key={i} className="h-full w-full shrink-0">
                  <img
                    src={img}
                    alt={`${product.name} — фото ${i + 1}`}
                    className="pointer-events-none h-full w-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div className="absolute left-3 top-3">
              <PhotoNote updated={product.photoStatus === "studio"} />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  aria-label="Предыдущее фото"
                  className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-ink/70 text-bone backdrop-blur-md transition-colors hover:border-white/40 md:flex"
                >
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  aria-label="Следующее фото"
                  className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-ink/70 text-bone backdrop-blur-md transition-colors hover:border-white/40 md:flex"
                >
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-6 transition-colors ${
                        i === index ? "bg-bone" : "bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* описание */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="u-eyebrow">{product.kind}</p>
              <h3 className="mt-2 font-serif text-3xl font-light leading-tight text-bone sm:text-4xl">
                {product.name}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-silver">{product.description}</p>

            {product.meta && (
              <p className="font-cond text-[10px] uppercase tracking-[0.22em] text-ash">
                {product.meta}
              </p>
            )}

            <dl className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-cond text-[10px] uppercase tracking-[0.2em] text-ash">
                  Цена
                </dt>
                <dd
                  className={`font-cond text-xl ${
                    product.price ? "text-bone" : "text-silver"
                  }`}
                >
                  {formatPrice(product.price)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-cond text-[10px] uppercase tracking-[0.2em] text-ash">
                  Размер
                </dt>
                <dd className="text-right text-sm text-silver">{product.size}</dd>
              </div>
              <div className="flex flex-col gap-1 py-3">
                <dt className="font-cond text-[10px] uppercase tracking-[0.2em] text-ash">
                  Оплата
                </dt>
                <dd className="text-right text-sm text-silver">
                  {product.payment || prepayFor(product.category)}
                </dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onOrder(product)}
                className="u-btn u-btn-solid w-full"
              >
                <Send size={14} strokeWidth={1.5} />
                Заказать
              </button>
              <p className="text-center text-[11px] leading-relaxed text-ash">
                Заявка откроется в Telegram — оплата только там, на сайте ничего не
                списывается.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
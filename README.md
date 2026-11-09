# XANAMI — лендинг

Одностраничный сайт бренда: готическая couture-галерея, лимитированные дропы
streetwear и увод клиентов в Telegram.

Стек: React 18 · Vite · Tailwind CSS 3 · lucide-react.

---

## Быстрый старт

```bash
npm install
npm run dev      # http://localhost:5173
```

Сборка для хостинга (Vercel, Netlify, GitHub Pages, любой статик):

```bash
npm run build    # готовые файлы появятся в dist/
npm run preview  # локальный просмотр собранной версии
```

---

## Что где лежит

```
public/assets/          все фото бренда + logo.png, favicon, og.jpg
src/data/content.js     ← единственный файл для правок контента
src/App.jsx             сборка страницы из секций
src/index.css           шрифты, кнопки, анимации, зерно
src/components/
  Navigation.jsx        шапка + мобильное меню
  Hero.jsx              первый экран + бегущая строка
  DualIdentity.jsx      Couture / Streetwear с затемнением половины
  Gallery.jsx           сетка платьев
  Drops.jsx             карточки дропов со статусами
  Ritual.jsx            три шага заказа
  Footer.jsx            подвал
  Logo.jsx              <img> логотипа с fallback-текстом
  ui.jsx                Reveal (fade-in при скролле), бейджи, заголовки
```

---

## Как менять контент

Всё в `src/data/content.js`:

| Что | Где |
|---|---|
| Telegram-аккаунты | `LINKS.tailor`, `LINKS.channel` |
| Цена зипки | `ZIP_PRICE` |
| Пункты меню | `NAV` |
| Платья в галерее | массив `COUTURE` |
| Дропы, статусы, размеры | массив `DROPS` |
| Шаги заказа | массив `RITUAL` |
| Бегущая строка, «100% ручная» | `MARQUEE`, `BRAND_VALUES` |

### Замена фотографии

1. Положите файл в `public/assets/`, например `couture_new.jpg`.
2. В `src/data/content.js` поменяйте `img: "/assets/couture_new.jpg"`.
   Путь всегда начинается со `/assets/`, без `public`.

Названия файлов в проекте уже осмысленные:

- `couture_*` — платья (burgundy_veil, black_lace, black_velvet, burgundy_velvet,
  white_gown, white_ruffle, white_corset, pink_lace, pink_satin, black_mini)
- `street_*` — зипки и джинсы (zip_rose, zip_blond, zip_white, denim_branch,
  denim_flatlay, duo_zip, *_back — вторые ракурсы)
- `logo.png` — логотип с прозрачным фоном; если файла нет, шапка покажет
  текст «XANAMI» шрифтом Cormorant Garamond

### Статусы дропов

```js
status: "limited"   // акцентная красная плашка, кнопка активна
status: "soldout"   // серая плашка, кнопка заблокирована, фото обесцвечено
```

Цена подставляется автоматически: зипки берут `ZIP_PRICE`, всё остальное
показывает «уточняется».

---

## Telegram

Кнопки ведут на `https://t.me/<handle>` с автоподставленным текстом через
`?text=`. На десктопе сообщение подставляется в поле ввода, на телефоне —
в системный шаринг.

- Пошив, мерки, консультация → `t.me/bogomol_004`
- Дропы, наличие, анонсы → `t.me/xana_mi`

---

## Что стоит уточнить перед публикацией

- **Валюта цены.** Сейчас `7 200 руб.` — в Минске «руб.» может означать
  и BYN, и RUB. Поправьте `ZIP_PRICE`.
- **Часы работы и сроки пошива** — если появятся, логично добавить в блок
  «Как заказать».
- **Домен** — после деплоя замените `og:image` в `index.html` на абсолютный
  адрес, иначе превью в Telegram не подтянется.

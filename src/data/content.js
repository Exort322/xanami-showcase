/**
 * ─────────────────────────────────────────────────────────────
 *  XANAMI — контент и настройки
 *  Всё, что нужно править дизайнеру, живёт в этом файле.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Ссылки ─────────────────────────────────────────────────── */

export const LINKS = {
  /** Личный аккаунт дизайнера — пошив, мерки, обсуждение концепта */
  tailor: "bogomol_004",
  /** Telegram-канал бренда — дропы, анонсы, наличие */
  channel: "xana_mi",
};

/**
 * Ссылка в Telegram с автоподстановкой текста.
 * ?text= открывает чат с уже заполненным сообщением.
 */
export const tg = (handle, text = "") => {
  const base = `https://t.me/${handle}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const TG_TAILOR = tg(
  LINKS.tailor,
  "Здравствуйте! Пишу с сайта XANAMI — хочу обсудить индивидуальный пошив."
);

export const TG_CHANNEL = tg(LINKS.channel);

/* ── Цены ───────────────────────────────────────────────────────
   Единственное место, где меняется цена зипки.
   ВНИМАНИЕ: уточните валюту — «руб.» в Минске может означать
   и BYN, и RUB.
   ─────────────────────────────────────────────────────────────── */

export const ZIP_PRICE = "7 200 руб.";

/** Автотекст для карточки дропа */
export const dropMessage = (item) =>
  tg(
    LINKS.tailor,
    `Здравствуйте! С сайта XANAMI интересует ${item.name}` +
      (item.size ? ` (размер ${item.size})` : "") +
      (item.price ? ` — ${item.price}` : "") +
      ". Подскажите, есть в наличии?"
  );

/* ── Navigation ─────────────────────────────────────────────── */

export const NAV = [
  { label: "Couture", href: "#couture" },
  { label: "Streetwear", href: "#streetwear" },
  { label: "Как заказать", href: "#ritual" },
];

/* ── Gothic Couture ─────────────────────────────────────────────
   Чтобы заменить фото — положите файл в public/assets
   и поменяйте поле img.
   ─────────────────────────────────────────────────────────────── */

export const COUTURE = [
  {
    id: "veil",
    name: "Veil of Ash",
    kind: "Вечернее платье · корсет · фата",
    img: "/assets/couture_burgundy_veil.jpg",
    meta: "Бордо · кружево · ручная сборка",
    featured: true,
  },
  {
    id: "lace",
    name: "Nocturne",
    kind: "Платье с разрезом · шипы",
    img: "/assets/couture_black_lace.jpg",
    meta: "Чёрный креп · цепь · кожа",
  },
  {
    id: "velvet",
    name: "Velvet Sorrow",
    kind: "Платье из бархата · кружево",
    img: "/assets/couture_black_velvet.jpg",
    meta: "Crushed velvet · крест",
  },
  {
    id: "burgundy",
    name: "Wine Ritual",
    kind: "Мини · шнуровка · бархат",
    img: "/assets/couture_burgundy_velvet.jpg",
    meta: "Бордо · цепь · кружево",
  },
  {
    id: "white-gown",
    name: "Pale Mourning",
    kind: "Корсет · жемчуг · шлейф",
    img: "/assets/couture_white_gown.jpg",
    meta: "Айвори · жемчужные нити",
  },
  {
    id: "white-ruffle",
    name: "Ghost Bloom",
    kind: "Корсет · каскад рюшей",
    img: "/assets/couture_white_ruffle.jpg",
    meta: "Шифон · органза · фата",
  },
  {
    id: "white-corset",
    name: "Cold Ivory",
    kind: "Корсет · кружево · тюль",
    img: "/assets/couture_white_corset.jpg",
    meta: "Айвори · кружевная аппликация",
  },
  {
    id: "pink-lace",
    name: "Rotting Rose",
    kind: "Мини · ярусы · кружево",
    img: "/assets/couture_pink_lace.jpg",
    meta: "Пудровый · чёрное кружево",
  },
  {
    id: "pink-satin",
    name: "Dust Petal",
    kind: "Платье · объёмный рукав",
    img: "/assets/couture_pink_satin.jpg",
    meta: "Пудровый сатин · драпировка",
  },
  {
    id: "black-mini",
    name: "Black Mass",
    kind: "Мини · объёмный рукав",
    img: "/assets/couture_black_mini.jpg",
    meta: "Плотный чёрный · V-вырез",
  },
];

/* ── Streetwear Drops ─────────────────────────────────────────
   price: null → на карточке будет «уточняется»,
   иначе подставится ZIP_PRICE.
   ─────────────────────────────────────────────────────────────── */

export const DROPS = [
  {
    id: "zip-rose",
    name: "Rose Decay Zip",
    kind: "Зипка · мех · crushed velvet",
    img: "/assets/street_zip_rose.jpg",
    imgAlt: "/assets/street_zip_rose_back.jpg",
    meta: "Чёрный / пыльная роза",
    status: "limited",
    price: ZIP_PRICE,
    size: "S–L",
  },
  {
    id: "zip-blond",
    name: "Dust Zip",
    kind: "Зипка · мех · панели",
    img: "/assets/street_zip_blond.jpg",
    imgAlt: "/assets/street_zip_blond_back.jpg",
    meta: "Чёрный / выцветший велюр",
    status: "limited",
    price: ZIP_PRICE,
    size: "M–XL",
  },
  {
    id: "denim-branch",
    name: "Bondage Denim",
    kind: "Джинсы · люверсы · ремни",
    img: "/assets/street_denim_branch.jpg",
    imgAlt: "/assets/street_denim_worn.jpg",
    meta: "Чёрный деним · контрастная строчка",
    status: "soldout",
    price: null,
    size: "M",
  },
  {
    id: "zip-white",
    name: "Pale Static Zip",
    kind: "Зипка · белый мех",
    img: "/assets/street_zip_white.jpg",
    meta: "Серо-белый / кислотный принт",
    status: "limited",
    price: ZIP_PRICE,
    size: "S–XL",
  },
  {
    id: "denim-duo",
    name: "Twin Rust Zip",
    kind: "Капсула · две модели",
    img: "/assets/street_duo_zip.jpg",
    meta: "Чёрный / выцветший серый",
    status: "soldout",
    price: null,
    size: "S–L",
  },
  {
    id: "denim-flat",
    name: "Hardware Set",
    kind: "Зипка + джинсы · люверсы",
    img: "/assets/street_denim_flatlay.jpg",
    meta: "Чёрный · матовая фурнитура",
    status: "limited",
    price: null,
    size: "комплект",
  },
];

/* ── Order Ritual ───────────────────────────────────────────── */

export const RITUAL = [
  {
    n: "I",
    title: "Концепт и мерки",
    text: "Присылаете референсы, настроение, поводы — и свои мерки или параметры фигуры. Если мерки не сняты — подскажем, как это сделать дома за пять минут.",
    tag: "Референсы · мерки · ткань",
  },
  {
    n: "II",
    title: "Обсуждение в Telegram",
    text: "Уточняем силуэт, длину, посадку, фурнитуру и бюджет. Согласуем эскиз и сроки. Всё в личных сообщениях — без форм, корзин и ожидания ответа на почте.",
    tag: "Эскиз · сроки · предоплата",
  },
  {
    n: "III",
    title: "Создание шедевра",
    text: "Крой, ручная сборка, кружево, цепи и подгонка по фигуре. Показываем процесс на каждом этапе. Условия доставки и оплаты согласуем в личных сообщениях.",
    tag: "Пошив · примерка · доставка",
  },
];

/* ── Декор / тексты ─────────────────────────────────────────── */

export const MARQUEE = [
  "Ручная работа",
  "Индивидуальный пошив",
  "Лимитированные дропы",
  "Ателье · Минск",
  "Made to order",
];

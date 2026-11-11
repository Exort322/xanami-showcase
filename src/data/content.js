/**
 * ─────────────────────────────────────────────────────────────
 *  XANAMI — контент витрины
 *  Всё, что нужно править, живёт в этом файле.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Ссылки ─────────────────────────────────────────────────── */

export const LINKS = {
  /** Личный аккаунт мастера — заказы, мерки, оплата */
  tailor: "bogomol_004",
  /** Telegram-канал бренда — работы и анонсы */
  channel: "xana_mi",
};

export const tg = (handle, text = "") => {
  const base = `https://t.me/${handle}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const TG_TAILOR = tg(LINKS.tailor);
export const TG_CHANNEL = tg(LINKS.channel);

/** Калькулятор доставки СДЭК */
export const CDEK_CALC = "https://www.cdek.ru/ru/calculate";

/* ── Оплата ─────────────────────────────────────────────────── */

export const PREPAY = {
  dresses: "50% при заказе, 50% после подтверждения фото готового изделия",
  other: "100% предоплата",
};

export const prepayFor = (category) =>
  category === "dresses" ? PREPAY.dresses : PREPAY.other;

/* ── Навигация ──────────────────────────────────────────────── */

export const NAV = [
  { label: "Каталог", href: "#catalog" },
  { label: "Мерки", href: "#measurements" },
  { label: "Доставка", href: "#delivery" },
  { label: "Вопросы", href: "#faq" },
];

/* ── Категории каталога ─────────────────────────────────────── */

export const CATEGORIES = [
  { id: "all", label: "Все изделия" },
  { id: "dresses", label: "Платья" },
  { id: "zip", label: "Зипки" },
  { id: "denim", label: "Джинсы и деним" },
];

/* ── Каталог ────────────────────────────────────────────────────
   Все вещи шьются под заказ, склада нет.
   photoStatus:
     "studio"  — есть студийное фото
     "reshoot" — фото обновляется (плашки на карточке)
   price: число или null (тогда «по запросу»)
   ─────────────────────────────────────────────────────────────── */

export const PRODUCTS = [
  {
    id: "veil",
    name: "Veil of Ash",
    category: "dresses",
    kind: "Вечернее платье · корсет · фата",
    price: null,
    img: "/assets/hero_veil.jpg",
    gallery: ["/assets/couture_burgundy_veil.jpg"],
    photoStatus: "studio",
    meta: "Бордо · чёрное кружево · фата из фатина",
    description:
      "Корсетное платье с кружевной отделкой и длинной фатой. Бордовая парча, чёрный гипюр, ручная сборка по линии талии.",
    size: "по вашим меркам",
  },
  {
    id: "white-gown",
    name: "Pale Mourning",
    category: "dresses",
    kind: "Корсет · жемчуг · шлейф",
    price: null,
    img: "/assets/couture_white_gown.jpg",
    gallery: ["/assets/couture_white_ruffle.jpg"],
    photoStatus: "studio",
    meta: "Айвори · жемчужные нити · атлас",
    description:
      "Светлый корсет с жемчужными перемычками. Драпировка по фигуре, открытая линия плеч.",
    size: "по вашим меркам",
  },
  {
    id: "lace",
    name: "Nocturne",
    category: "dresses",
    kind: "Платье с разрезом · шипы",
    price: null,
    img: "/assets/couture_black_lace.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Чёрный креп · металл · кружево",
    description:
      "Чёрное платье с высоким разрезом и металлической фурнитурой. Крой по фигуре, ручная обработка края.",
    size: "по вашим меркам",
  },
  {
    id: "velvet",
    name: "Velvet Sorrow",
    category: "dresses",
    kind: "Бархат · кружево · крест",
    price: null,
    img: "/assets/couture_black_velvet.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Crushed velvet · гипюр",
    description:
      "Платье из тёмного бархата с кружевной отделкой и подвеской. Мягкая посадка, длина в пол.",
    size: "по вашим меркам",
  },
  {
    id: "burgundy",
    name: "Wine Ritual",
    category: "dresses",
    kind: "Мини · шнуровка · бархат",
    price: null,
    img: "/assets/couture_burgundy_velvet.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Бордо · цепь · кружево",
    description:
      "Короткое платье из бордового бархата со шнуровкой и цепью по корсету.",
    size: "по вашим меркам",
  },
  {
    id: "white-ruffle",
    name: "Ghost Bloom",
    category: "dresses",
    kind: "Корсет · каскад рюшей",
    price: null,
    img: "/assets/couture_white_ruffle.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Шифон · органза · фата",
    description:
      "Корсет с многослойным каскадом рюшей и фатой. Светлая гамма, объём по юбке.",
    size: "по вашим меркам",
  },
  {
    id: "white-corset",
    name: "Cold Ivory",
    category: "dresses",
    kind: "Корсет · кружево · тюль",
    price: null,
    img: "/assets/couture_white_corset.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Айвори · кружевная аппликация",
    description:
      "Корсет с кружевной аппликацией и тюлевой юбкой. Собирается по вашим меркам.",
    size: "по вашим меркам",
  },
  {
    id: "pink-lace",
    name: "Rotting Rose",
    category: "dresses",
    kind: "Мини · ярусы · кружево",
    price: null,
    img: "/assets/couture_pink_lace.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Пудровый · чёрное кружево",
    description:
      "Короткое платье ярусами с чёрным кружевом по пудровому фону. Контраст фактур.",
    size: "по вашим меркам",
  },
  {
    id: "pink-satin",
    name: "Dust Petal",
    category: "dresses",
    kind: "Платье · объёмный рукав",
    price: null,
    img: "/assets/couture_pink_satin.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Пудровый сатин · драпировка",
    description:
      "Платье из пудрового сатина с объёмным рукавом и драпировкой по корпусу.",
    size: "по вашим меркам",
  },
  {
    id: "black-mini",
    name: "Black Mass",
    category: "dresses",
    kind: "Мини · объёмный рукав",
    price: null,
    img: "/assets/couture_black_mini.jpg",
    gallery: [],
    photoStatus: "reshoot",
    meta: "Плотный чёрный · V-вырез",
    description:
      "Короткое чёрное платье с объёмным рукавом и глубоким вырезом. Лаконичный силуэт.",
    size: "по вашим меркам",
  },

  {
    id: "zip-rose",
    name: "Rose Decay Zip",
    category: "zip",
    kind: "Зипка · мех · панели",
    price: 7200,
    img: "/assets/street_zip_rose.jpg",
    gallery: ["/assets/street_zip_rose_back.jpg"],
    photoStatus: "studio",
    meta: "Чёрный · пыльная роза · мех на капюшоне",
    description:
      "Зипка с меховой отделкой капюшона и панелями из выцветшего велюра. Свободная посадка, металлическая молния.",
    size: "S–L, по вашим меркам",
  },
  {
    id: "zip-blond",
    name: "Dust Zip",
    category: "zip",
    kind: "Зипка · мех · панели",
    price: 7200,
    img: "/assets/street_zip_blond.jpg",
    gallery: ["/assets/street_zip_blond_back.jpg"],
    photoStatus: "studio",
    meta: "Чёрный · выцветший велюр",
    description:
      "Зипка с контрастными панелями и мехом. Оверсайз-силуэт, крупная фурнитура.",
    size: "M–XL, по вашим меркам",
  },
  {
    id: "zip-white",
    name: "Pale Static Zip",
    category: "zip",
    kind: "Зипка · белый мех",
    price: 7200,
    img: "/assets/street_zip_white.jpg",
    gallery: [],
    photoStatus: "studio",
    meta: "Серо-белый · принт · мех",
    description:
      "Светлая зипка с принтом и меховой отделкой. Собирается под ваш размер.",
    size: "S–XL, по вашим меркам",
  },
  {
    id: "duo-zip",
    name: "Twin Rust Zip",
    category: "zip",
    kind: "Капсула · две модели",
    price: 7200,
    img: "/assets/street_duo_zip.jpg",
    gallery: [],
    photoStatus: "studio",
    meta: "Чёрный · выцветший серый",
    description:
      "Капсула из двух зипок в одной гамме. Можно заказать по отдельности — обсудим в Telegram.",
    size: "S–L, по вашим меркам",
  },

  {
    id: "denim-branch",
    name: "Bondage Denim",
    category: "denim",
    kind: "Джинсы · люверсы · ремни",
    price: null,
    img: "/assets/street_denim_branch.jpg",
    gallery: ["/assets/street_denim_flatlay.jpg", "/assets/street_denim_worn.jpg"],
    photoStatus: "studio",
    meta: "Чёрный деним · контрастная строчка",
    description:
      "Чёрные джинсы с люверсами, ремнями и контрастной отстрочкой. Посадка по вашим меркам.",
    size: "по вашим меркам",
  },
];

/* ── Визитные работы ────────────────────────────────────────── */

export const FEATURED = [
  {
    id: "veil",
    name: "Veil of Ash",
    note: "Корсет · кружево · фата",
    img: "/assets/hero_veil.jpg",
  },
  {
    id: "white-gown",
    name: "Pale Mourning",
    note: "Жемчуг · атлас · драпировка",
    img: "/assets/couture_white_gown.jpg",
  },
  {
    id: "zip-rose",
    name: "Rose Decay Zip",
    note: "Мех · велюр · фурнитура",
    img: "/assets/street_zip_rose.jpg",
  },
];

/* ── Как снять мерки ────────────────────────────────────────── */

export const MEASUREMENTS = [
  { n: "01", title: "Обхват груди", text: "По самой выступающей точке, сантиметр держите горизонтально." },
  { n: "02", title: "Обхват талии", text: "По самому узкому месту, не затягивая ленту." },
  { n: "03", title: "Обхват бёдер", text: "По выступающим точкам, стоя, ноги вместе." },
  { n: "04", title: "Длина изделия", text: "От плеча или талии до нужной длины — зависит от модели." },
  { n: "05", title: "Длина рукава", text: "От плечевого шва до запястья, рука чуть согнута." },
  { n: "06", title: "Рост", text: "Босиком, у стены, без обуви." },
];

export const MEASURE_TIPS = [
  "Мерьте по лёгкому белью или тонкой одежде, в которой планируете носить вещь.",
  "Ленту не тяните: она должна прилегать, но не сдавливать.",
  "Стойте прямо, не втягивайте живот — иначе вещь будет тесной.",
  "Если сомневаетесь, попросите кого-то помочь: часть мерок сложно снять самой.",
];

/* ── Доставка ───────────────────────────────────────────────── */

export const DELIVERY_STEPS = [
  {
    n: "01",
    title: "Согласуем заказ",
    text: "Выбираем модель, обсуждаем детали и снимаем мерки. Всё в Telegram — переписка сохраняется у вас.",
  },
  {
    n: "02",
    title: "Предоплата",
    text: "Платья — 50% при заказе, остальное после фото готового изделия. Повседневные вещи — 100%.",
  },
  {
    n: "03",
    title: "Пошив и отправка",
    text: "Шью по вашим меркам и отправляю СДЭК. Трек-номер приходит в Telegram.",
  },
  {
    n: "04",
    title: "Получение",
    text: "Забираете в удобном пункте выдачи или курьером. Стоимость — по тарифу СДЭК.",
  },
];

export const DELIVERY_FACTS = [
  { k: "РФ · Беларусь", v: "и страны с отделениями СДЭК" },
  { k: "СДЭК", v: "пункт выдачи или курьер" },
  { k: "Онлайн", v: "примерок нет, приём только в сети" },
];

/* ── FAQ ────────────────────────────────────────────────────── */

export const FAQ = [
  {
    q: "Можно ли заказать вещь по чужому референсу?",
    a: "Нет. Вся одежда создаётся только по авторским эскизам — я не повторяю чужие модели. Вы можете рассказать, какое настроение хотите, но эскиз будет мой.",
  },
  {
    q: "Есть ли готовые вещи в наличии?",
    a: "Склада нет. Каждая вещь шьётся под заказ по вашим меркам, поэтому купить «с полки» нельзя.",
  },
  {
    q: "Как проходит оплата?",
    a: "На платья — 50% при заказе и 50% после подтверждения фото готового изделия. На повседневные вещи (зипки, джинсы) — 100% предоплата. Оплата только в Telegram, на сайте ничего не списывается.",
  },
  {
    q: "Есть ли примерка?",
    a: "Нет. Приём и обсуждение — только онлайн. Поэтому важно точно снять мерки: есть отдельный блок с инструкцией.",
  },
  {
    q: "Куда вы доставляете?",
    a: "По России, Беларуси и в страны, где есть отделения СДЭК. Отправка со склада СДЭК, трек-номер приходит в Telegram.",
  },
  {
    q: "Сколько стоит доставка?",
    a: "По тарифу СДЭК — зависит от города и веса посылки. Точную сумму видно в калькуляторе на сайте СДЭК, ссылка есть в блоке «Доставка».",
  },
  {
    q: "Сколько ждать заказ?",
    a: "Срок зависит от модели и текущей загрузки. Называю его в переписке до оплаты, чтобы не было сюрпризов.",
  },
  {
    q: "Можно ли вернуть вещь?",
    a: "Вещи шьются по вашим меркам, поэтому возврат и обмен не предусмотрены. Все детали — ткань, посадку, длину — согласуем до оплаты.",
  },
];

/* ── О мастере ──────────────────────────────────────────────── */

export const ABOUT = {
  title: "Одна мастерская, одна пара рук",
  text: [
    "XANAMI — независимая марка. Каждая вещь рождается в единственном экземпляре: я сама придумываю эскиз, снимаю мерки, крою и шью.",
    "Без массового производства и склада — только индивидуальная работа и ткани, которые выбираю под конкретный образ.",
  ],
  advantages: [
    { title: "Только авторские эскизы", text: "Не повторяю чужие модели и референсы." },
    { title: "По вашим меркам", text: "Посадка собирается под фигуру, а не под размерную сетку." },
    { title: "Оплата частями", text: "Платья — 50% при заказе, остальное после фото." },
    { title: "Доставка СДЭК", text: "Россия, Беларусь и страны с отделениями." },
  ],
};

/* ── Бегущая строка ─────────────────────────────────────────── */

export const MARQUEE = [
  "Авторские эскизы",
  "Ручная работа",
  "Пошив под заказ",
  "Оплата частями",
  "Доставка СДЭК",
];

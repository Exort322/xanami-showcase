/**
 * Загрузка каталога из Google Таблицы (опционально).
 *
 * Как включить:
 *  1. Создайте таблицу с колонками (первая строка — заголовки):
 *     id, Название, Категория, Подзаголовок, Цена, Фото, Описание, Ткани, Фото-статус, Размер
 *  2. Файл → Поделиться → Опубликовать в интернете → CSV.
 *  3. Скопируйте ссылку в SHEET_CSV_URL ниже.
 *
 * Если ссылка пустая или таблица не отвечает — сайт показывает
 * локальный каталог из content.js. Ошибка никогда не ломает страницу.
 */

export const SHEET_CSV_URL = "";

/** Простой CSV-парсер: понимает кавычки, запятые и переносы внутри поля. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

const CATEGORY_MAP = {
  платья: "dresses",
  платье: "dresses",
  dresses: "dresses",
  зипки: "zip",
  зипка: "zip",
  zip: "zip",
  джинсы: "denim",
  деним: "denim",
  denim: "denim",
};

const normalize = (value) => (value || "").trim();

/** Превращает строки таблицы в объекты каталога. */
export function rowsToProducts(rows) {
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => normalize(h).toLowerCase());
  const index = (name) => header.indexOf(name.toLowerCase());

  const cols = {
    id: index("id"),
    name: index("название"),
    category: index("категория"),
    kind: index("подзаголовок"),
    price: index("цена"),
    img: index("фото"),
    description: index("описание"),
    meta: index("ткани"),
    photoStatus: index("фото-статус"),
    size: index("размер"),
  };

  if (cols.name === -1) return [];

  const pick = (row, i) => (i >= 0 ? normalize(row[i]) : "");

  return rows
    .slice(1)
    .map((row, i) => {
      const name = pick(row, cols.name);
      if (!name) return null;

      const rawPrice = pick(row, cols.price).replace(/[^\d]/g, "");
      const category = CATEGORY_MAP[pick(row, cols.category).toLowerCase()] || "dresses";
      const photo = pick(row, cols.photo);

      return {
        id: pick(row, cols.id) || `sheet-${i}`,
        name,
        category,
        kind: pick(row, cols.kind),
        price: rawPrice ? Number(rawPrice) : null,
        img: photo || "/assets/hero_veil.jpg",
        gallery: [],
        photoStatus: /обнов|reshoot/i.test(pick(row, cols.photoStatus))
          ? "reshoot"
          : "studio",
        meta: pick(row, cols.meta),
        description: pick(row, cols.description),
        size: pick(row, cols.size) || "по вашим меркам",
      };
    })
    .filter(Boolean);
}

/** Возвращает каталог из таблицы либо локальный набор. */
export async function loadCatalog(fallback) {
  if (!SHEET_CSV_URL) return fallback;

  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = rowsToProducts(parseCsv(await res.text()));
    return items.length ? items : fallback;
  } catch (err) {
    console.warn("Каталог из таблицы не загрузился, показываю локальный:", err);
    return fallback;
  }
}

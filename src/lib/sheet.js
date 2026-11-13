/**
 * Загрузка каталога из Google Таблицы (опционально).
 * 
 * Колонки: id, Название, Категория, Подзаголовок, Цена, Фото, Галерея, Описание, Ткани, Фото-статус, Размер, Оплата
 */

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1kRYpG0VuA_--ZtWgz4CnSFi6-hpKYA62EQsOa1vYTrZEvoC3Roh3nhpv8mZVv9fgmL__KGmC03r-/pub?gid=0&single=true&output=csv";

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

/** 
 * Преобразует стандартную ссылку Google Диска в прямой URL изображения.
 * Поддерживает ссылки вида /file/d/ID/view, /open?id=ID и уже прямые форматы.
 */
function normalizeGoogleDriveUrl(url) {
  if (!url) return url;

  // 1. Если это уже прямой формат — возвращаем как есть
  if (/googleusercontent\.com\/d\//.test(url) ||
      /drive\.google\.com\/(uc\?export=view|thumbnail)/.test(url)) {
    return url;
  }

  // 2. Извлекаем FILE_ID из стандартной ссылки
  // Пример: https://drive.google.com/file/d/13nTC_av.../view?usp=sharing
  const match = url.match(/\/file\/d\/([^/]+)/) ||
                url.match(/[?&]id=([^&]+)/);
  if (match) {
    const fileId = match[1];
    // Наиболее надёжный формат для <img>
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // 3. Если ничего не совпало — возвращаем исходную ссылку
  return url;
}

/** 
 * Извлекает ссылки на изображения из ячейки.
 * Поддерживает: =IMAGE("url"), прямые ссылки, списки через запятую.
 * Каждая извлечённая ссылка проходит нормализацию для Google Диска.
 */
function extractImages(cellValue) {
  if (!cellValue) return [];
  
  const parts = cellValue.split(/[,\n;]+/);
  
  return parts.map(part => {
    let url = part.trim();

    // Извлекаем URL из формулы =IMAGE("...")
    const match = url.match(/=IMAGE\(\s*["']?([^"')]+)["']?\s*\)/i);
    if (match) url = match[1];

    // Нормализуем ссылку Google Диска
    return normalizeGoogleDriveUrl(url.trim());
  }).filter(url => url.length > 0);
}

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
    gallery: index("галерея"),
    description: index("описание"),
    meta: index("ткани"),
    photoStatus: index("фото-статус"),
    size: index("размер"),
    payment: index("оплата"),
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

      const mainPhotos = extractImages(pick(row, cols.img));
      const galleryPhotos = extractImages(pick(row, cols.gallery));

      const mainImg = mainPhotos[0] || "/assets/hero_veil.jpg";
      const gallery = [...mainPhotos.slice(1), ...galleryPhotos];

      return {
        id: pick(row, cols.id) || `sheet-${i}`,
        name,
        category,
        kind: pick(row, cols.kind),
        price: rawPrice ? Number(rawPrice) : null,
        img: mainImg,
        gallery: gallery,
        photoStatus: /обнов|reshoot/i.test(pick(row, cols.photoStatus))
          ? "reshoot"
          : "studio",
        meta: pick(row, cols.meta),
        description: pick(row, cols.description),
        size: pick(row, cols.size) || "по вашим меркам",
        payment: pick(row, cols.payment),
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
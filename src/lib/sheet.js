/**
 * Загрузка каталога из Google Таблицы (опционально).
 */

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaWL_6drAKJuqMdqaX9HiKrxjw0aLvk70vxeu2yMfyduoGZt8Qg-4WpdlrZlbBKVdkkgdXl_ljkaXS/pub?gid=1570090092&single=true&output=csv";

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

// Базовые категории, чтобы не сломать старые ссылки
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

function normalizeGoogleDriveUrl(url) {
  if (!url) return url;
  if (/googleusercontent\.com\/d\//.test(url) || /drive\.google\.com\/(uc\?export=view|thumbnail)/.test(url)) {
    return url;
  }
  const match = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}

function extractImages(cellValue) {
  if (!cellValue) return [];
  const parts = cellValue.split(/[,\n;]+/);
  return parts.map(part => {
    let url = part.trim();
    const match = url.match(/=IMAGE\(\s*["']?([^"')]+)["']?\s*\)/i);
    if (match) url = match[1];
    return normalizeGoogleDriveUrl(url.trim());
  }).filter(url => url.length > 0);
}

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
      
      // Логика определения категории
      const rawCategory = pick(row, cols.category);
      const lowerCat = rawCategory.toLowerCase();
      // Если это старая категория — берем её ID, если новая — делаем slug из названия
      const categoryId = CATEGORY_MAP[lowerCat] || lowerCat.replace(/[^a-zа-яё0-9]+/gi, '-');
      // Красивое название для кнопки фильтра (с заглавной буквы)
      const categoryLabel = rawCategory ? rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1) : "Прочее";

      const mainPhotos = extractImages(pick(row, cols.img));
      const galleryPhotos = extractImages(pick(row, cols.gallery));

      const mainImg = mainPhotos[0] || "/assets/hero_veil.jpg";
      const gallery = [...mainPhotos.slice(1), ...galleryPhotos];

      return {
        id: pick(row, cols.id) || `sheet-${i}`,
        name,
        category: categoryId,
        categoryLabel: categoryLabel, // Сохраняем красивое название
        kind: pick(row, cols.kind),
        price: rawPrice ? Number(rawPrice) : null,
        img: mainImg,
        gallery: gallery,
        photoStatus: /обнов|reshoot/i.test(pick(row, cols.photoStatus)) ? "reshoot" : "studio",
        meta: pick(row, cols.meta),
        description: pick(row, cols.description),
        size: pick(row, cols.size) || "по вашим меркам",
        payment: pick(row, cols.payment),
      };
    })
    .filter(Boolean);
}

/** Возвращает каталог и список категорий */
export async function loadCatalog(fallbackProducts, fallbackCategories) {
  if (!SHEET_CSV_URL) return { products: fallbackProducts, categories: fallbackCategories };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store", signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = rowsToProducts(parseCsv(await res.text()));
    
    if (!items.length) return { products: fallbackProducts, categories: fallbackCategories };

    // Собираем уникальные категории из полученных товаров
    const categoriesMap = new Map();
    // Сначала добавляем дефолтные, чтобы они всегда были в списке
    fallbackCategories.forEach(c => categoriesMap.set(c.id, c.label));
    
    // Добавляем новые из таблицы
    items.forEach(p => {
      if (!categoriesMap.has(p.category)) {
        categoriesMap.set(p.category, p.categoryLabel);
      }
    });

    // Превращаем Map обратно в массив объектов
    const categories = Array.from(categoriesMap, ([id, label]) => ({ id, label }));

    return { products: items, categories };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("Каталог из таблицы не загрузился, показываю локальный:", err);
    return { products: fallbackProducts, categories: fallbackCategories };
  }
}
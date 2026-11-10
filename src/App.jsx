import { useCallback, useEffect, useMemo, useState } from "react";

import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import DualIdentity from "./components/DualIdentity.jsx";
import Catalog from "./components/Catalog.jsx";
import ProductModal from "./components/ProductModal.jsx";
import Featured from "./components/Featured.jsx";
import Measurements from "./components/Measurements.jsx";
import Delivery from "./components/Delivery.jsx";
import Faq from "./components/Faq.jsx";
import OrderForm from "./components/OrderForm.jsx";
import Footer from "./components/Footer.jsx";

import { PRODUCTS } from "./data/content.js";
import { loadCatalog } from "./lib/sheet.js";

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState(null);
  const [preset, setPreset] = useState(null);

  // каталог можно подгрузить из Google Таблицы (см. src/lib/sheet.js)
  useEffect(() => {
    let alive = true;
    loadCatalog(PRODUCTS).then((items) => {
      if (alive) setProducts(items);
    });
    return () => {
      alive = false;
    };
  }, []);

  const openCategory = useCallback((id) => {
    setCategory(id);
    setActive(null);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openProduct = useCallback((item) => setActive(item), []);

  const openFeatured = useCallback(
    (id) => {
      const found = products.find((p) => p.id === id);
      if (found) setActive(found);
    },
    [products]
  );

  const orderProduct = useCallback((item) => {
    setPreset({ name: item.name, id: item.id, nonce: Date.now() });
    setActive(null);
    const el = document.getElementById("order");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const visible = useMemo(
    () => (category === "all" ? products : products.filter((p) => p.category === category)),
    [products, category]
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-bone">
      <Navigation />

      <main>
        <Hero />
        <About />
        <DualIdentity onOpenCategory={openCategory} />
        <Catalog
          products={products}
          category={category}
          onCategory={setCategory}
          onOpenProduct={openProduct}
        />
        <Featured onOpenFeatured={openFeatured} />
        <Measurements />
        <Delivery />
        <Faq />
        <OrderForm
          products={visible.length ? visible : products}
          preset={preset}
          onPresetConsumed={() => setPreset(null)}
        />
      </main>

      <Footer />

      <ProductModal
        product={active}
        onClose={() => setActive(null)}
        onOrder={orderProduct}
      />
    </div>
  );
}

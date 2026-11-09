import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import DualIdentity from "./components/DualIdentity.jsx";
import Gallery from "./components/Gallery.jsx";
import Drops from "./components/Drops.jsx";
import Ritual from "./components/Ritual.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-bone">
      <Navigation />
      <main>
        <Hero />
        <DualIdentity />
        <Gallery />
        <Drops />
        <Ritual />
      </main>
      <Footer />
    </div>
  );
}

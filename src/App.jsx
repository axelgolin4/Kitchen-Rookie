import { Bookmark, Compass, LayoutGrid } from "lucide-react";
import { Link, NavLink, Route, Routes } from "react-router";
import { useFavorites } from "./context/FavoritesContext";
import { useLanguage } from "./context/LanguageContext";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipeDetail from "./pages/RecipeDetail";

function navClass({ isActive }) {
  return `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-primary-soft text-white shadow-sm"
      : "text-ink-soft hover:text-ink"
  }`;
}

function App() {
  const { favorites } = useFavorites();
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="group flex min-h-screen flex-col bg-surface text-ink antialiased">
      <header className="sticky top-0 z-50 bg-surface/90 shadow-[0_1px_8px_rgba(41,53,46,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-11 w-11" />
            <span className="flex flex-col">
              <span className="font-display text-lg font-semibold leading-tight tracking-tight text-primary">
                Kitchen Rookie
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">
                {t("brand.tagline")}
              </span>
            </span>
          </Link>

          <nav className="order-last flex w-full items-center justify-center gap-1 md:order-none md:w-auto">
            <NavLink to="/" end className={navClass}>
              <Compass size={16} />
              {t("nav.explore")}
            </NavLink>
            <NavLink to="/categories" className={navClass}>
              <LayoutGrid size={16} />
              {t("nav.categories")}
            </NavLink>
            <NavLink to="/favorites" className={navClass}>
              <Bookmark size={16} />
              {t("nav.favorites")}
              {favorites.length > 0 && (
                <span className="rounded-full bg-accent px-1.5 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </nav>

          <div
            role="group"
            aria-label={t("lang.label")}
            className="flex rounded-full bg-surface-mid p-1 text-xs font-bold"
          >
            {["es", "en"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`cursor-pointer rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === code
                    ? "bg-white text-primary shadow-sm"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="bg-surface-low">
        <div className="mx-auto max-w-7xl px-6 py-10 group-has-[[data-page=not-found]]:py-4">
          <p className="font-display text-xl italic text-primary group-has-[[data-page=not-found]]:hidden">
            {t("footer.quote")}
          </p>
          <p className="mt-2 text-sm text-ink-soft group-has-[[data-page=not-found]]:mt-0 group-has-[[data-page=not-found]]:text-center group-has-[[data-page=not-found]]:text-xs">
            {t("footer.note")}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
import { Link } from "react-router";
import RecipeCard from "../components/RecipeCard";
import useFavorites from "../hooks/useFavorites";
import useLanguage from "../hooks/useLanguage";

function Favorites() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-accent">
        {t("favorites.eyebrow")}
      </span>
      <h1 className="mb-8 font-display text-4xl font-semibold tracking-tight text-primary">
        {t("favorites.title")}
      </h1>

      {favorites.length === 0 ? (
        <div className="rounded-xl bg-surface-low py-16 text-center">
          <p className="text-ink-soft">{t("favorites.empty")}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {t("favorites.cta")}
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Favorites;
import { ArrowRight, Bookmark, Globe, Sparkles, Utensils } from "lucide-react";
import { Link } from "react-router";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";
import useFetch from "../hooks/useFetch";
import { getIngredients } from "../utils/recipe";

const chipClass =
  "flex items-center gap-1.5 rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold tracking-wide shadow-sm";

function Hero() {
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, tCategory } = useLanguage();

  if (error) return null;

  const recipe = Array.isArray(data?.meals) ? data.meals[0] : null;
  if (loading || !recipe) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="h-[440px] animate-pulse rounded-xl bg-surface-high" />
      </section>
    );
  }

  const ingredients = getIngredients(recipe);
  const saved = isFavorite(recipe.idMeal);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-primary lg:text-[56px] lg:leading-[64px]">
            {recipe.strMeal}
          </h1>

          <p className="line-clamp-3 max-w-2xl text-lg leading-7 text-ink-soft">
            {recipe.strInstructions}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={chipClass}>
              <Utensils size={16} className="text-accent" />
              {tCategory(recipe.strCategory)}
            </span>
            <span className={chipClass}>
              <Globe size={16} className="text-accent" />
              {recipe.strArea}
            </span>
            <span className={chipClass}>
              {t("ingredients.count", { n: ingredients.length })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              to={`/recipe/${recipe.idMeal}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg"
            >
              {t("hero.view")}
              <ArrowRight size={18} />
            </Link>
            <button
              type="button"
              onClick={() => toggleFavorite(recipe)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-primary shadow-sm transition-all ${
                saved ? "bg-sage" : "bg-white hover:bg-surface-mid"
              }`}
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
              {saved ? t("hero.saved") : t("hero.save")}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-xl">
            <div className="relative h-[380px] overflow-hidden rounded-lg lg:h-[440px]">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  {t("hero.cuisine")}
                </span>
                <p className="font-display text-lg font-semibold">
                  {recipe.strArea}
                </p>
              </div>
            </div>

            <div className="mt-2 rounded-lg bg-surface-low p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                {t("hero.keyIngredients")}
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ingredients.slice(0, 5).map((ing, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white px-2.5 py-1 text-sm shadow-sm"
                  >
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
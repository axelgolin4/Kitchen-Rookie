import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import FavoriteButton from "../components/FavoriteButton";
import { useLanguage } from "../context/LanguageContext";
import useFetch from "../hooks/useFetch";
import { getIngredients } from "../utils/recipe";
import NotFound from "./NotFound";

const cardClass = "mt-6 rounded-xl bg-white p-6 shadow-sm";
const eyebrowClass =
  "mb-1 block text-[11px] font-bold uppercase tracking-wider text-accent";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, tCategory } = useLanguage();

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl animate-pulse px-6 py-10">
        <div className="h-4 w-20 rounded bg-surface-high" />
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="h-[440px] rounded-xl bg-surface-high lg:col-span-5" />
          <div className="lg:col-span-7">
            <div className="h-6 w-40 rounded-full bg-surface-high" />
            <div className="mt-4 h-12 w-3/4 rounded bg-surface-high" />
            <div className="mt-6 h-48 rounded-xl bg-surface-high" />
            <div className="mt-6 h-64 rounded-xl bg-surface-high" />
          </div>
        </div>
      </main>
    );
  }

  if (error) return <p className="p-10 text-center text-red-700">{error}</p>;

  const recipe = Array.isArray(data.meals) ? data.meals[0] : null;
  if (!recipe) return <NotFound />;

  const ingredients = getIngredients(recipe);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        {t("detail.back")}
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-xl">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="aspect-square w-full rounded-lg bg-surface-high object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold tracking-wide text-primary">
              {tCategory(recipe.strCategory)}
            </span>
            <span className="rounded-full bg-accent-pale px-3 py-1 text-xs font-semibold tracking-wide text-accent-dark">
              {recipe.strArea}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-primary lg:text-5xl">
              {recipe.strMeal}
            </h1>
            <FavoriteButton recipe={recipe} className="mt-2 shrink-0" />
          </div>

          <section className={cardClass}>
            <span className={eyebrowClass}>
              {t("ingredients.count", { n: ingredients.length })}
            </span>
            <h2 className="mb-4 font-display text-2xl font-semibold text-primary">
              {t("detail.ingredients")}
            </h2>
            <ul className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>
                    <strong className="font-semibold">{ing.measure}</strong>{" "}
                    {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={cardClass}>
            <span className={eyebrowClass}>{t("detail.steps")}</span>
            <h2 className="mb-4 font-display text-2xl font-semibold text-primary">
              {t("detail.preparation")}
            </h2>
            <p className="whitespace-pre-line leading-7 text-ink-soft">
              {recipe.strInstructions}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;
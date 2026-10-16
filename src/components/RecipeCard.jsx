import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useLanguage from "../hooks/useLanguage";
import FavoriteButton from "./FavoriteButton";

function RecipeCard({ recipe }) {
  const { t, tCategory } = useLanguage();

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <Link to={`/recipe/${recipe.idMeal}`} className="flex flex-1 flex-col">
        <div className="relative h-52 overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            loading="lazy"
            className="h-full w-full bg-surface-high object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {recipe.strCategory && (
            <span className="absolute bottom-3 left-3 rounded-full bg-sage px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
              {tCategory(recipe.strCategory)}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            {recipe.strArea && (
              <p className="mb-1 text-xs font-semibold tracking-wide text-accent">
                {recipe.strArea}
              </p>
            )}
            <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
              {recipe.strMeal}
            </h3>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-wide text-ink-soft">
            <span>{t("card.view")}</span>
            <ArrowRight
              size={16}
              className="text-primary transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
      <FavoriteButton recipe={recipe} className="absolute right-3 top-3" />
    </li>
  );
}

export default RecipeCard;
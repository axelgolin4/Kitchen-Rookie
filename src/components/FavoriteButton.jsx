import { Bookmark } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";

function FavoriteButton({ recipe, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLanguage();
  const active = isFavorite(recipe.idMeal);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(recipe)}
      aria-label={active ? t("fav.remove") : t("fav.add")}
      aria-pressed={active}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-surface/90 shadow-sm backdrop-blur-sm transition-colors hover:text-accent ${
        active ? "text-accent" : "text-ink-soft"
      } ${className}`}
    >
      <Bookmark size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}

export default FavoriteButton;
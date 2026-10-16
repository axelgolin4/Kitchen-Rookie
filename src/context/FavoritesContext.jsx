import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  function isFavorite(id) {
    return favorites.some((r) => r.idMeal === id);
  }

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((r) => r.idMeal === recipe.idMeal)
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [
            ...prev,
            {
              idMeal: recipe.idMeal,
              strMeal: recipe.strMeal,
              strMealThumb: recipe.strMealThumb,
            },
          ]
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  }
  return context;
}
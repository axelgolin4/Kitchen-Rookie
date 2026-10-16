import { useSearchParams } from "react-router";
import CategoryFilter from "../components/CategoryFilter";
import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import SearchBar from "../components/SearchBar";
import useLanguage from "../hooks/useLanguage";
import useFetch from "../hooks/useFetch";

const API = "https://www.themealdb.com/api/json/v1/1";
const gridClass = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4";

function Home() {
  const { t, tCategory } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("c");
  const query = searchParams.get("q") ?? "chicken";
  const isFiltering = searchParams.has("q") || searchParams.has("c");

  const url = category
    ? `${API}/filter.php?c=${encodeURIComponent(category)}`
    : `${API}/search.php?s=${encodeURIComponent(query)}`;

  const { data, loading, error } = useFetch(url);
  const recipes = data?.meals ?? [];

  const categoriesFetch = useFetch(`${API}/categories.php`);
  const categories = categoriesFetch.data?.categories ?? [];

  function handleSearch(term) {
    if (term) setSearchParams({ q: term });
  }

  function handleCategory(name) {
    setSearchParams(name ? { c: name } : {});
  }

  return (
    <main>
      {!isFiltering && <Hero />}

      <section className="bg-surface-low py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-accent">
              {category
                ? t("home.category", { name: tCategory(category) })
                : t("home.resultsFor", { query })}
            </span>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-primary lg:text-[40px] lg:leading-[48px]">
              {t("home.title")}
            </h1>
          </div>

          <div className="mb-6 flex flex-col gap-4">
            <SearchBar
              key={category ?? query}
              initialValue={category ? "" : query}
              onSearch={handleSearch}
            />
            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={handleCategory}
            />
          </div>

          {loading && (
            <ul className={gridClass}>
              {Array.from({ length: 8 }).map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </ul>
          )}
          {error && <p className="text-center text-red-700">{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p className="py-16 text-center text-ink-soft">
              {t("home.empty", {
                term: category ? tCategory(category) : query,
              })}
            </p>
          )}
          {!loading && !error && (
            <ul className={gridClass}>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
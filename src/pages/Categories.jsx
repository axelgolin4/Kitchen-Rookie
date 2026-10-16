import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import useFetch from "../hooks/useFetch";

function Categories() {
  const { t, tCategory } = useLanguage();
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categories = data?.categories ?? [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-accent">
        {t("categories.eyebrow")}
      </span>
      <h1 className="mb-8 font-display text-4xl font-semibold tracking-tight text-primary">
        {t("categories.title")}
      </h1>

      {error && <p className="text-center text-red-700">{error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-xl bg-surface-high"
            />
          ))}

        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/?c=${encodeURIComponent(cat.strCategory)}`}
            className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <div className="mb-3 h-44 w-full overflow-hidden rounded-lg bg-surface-mid">
                <img
                  src={cat.strCategoryThumb}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="mb-1.5 font-display text-[22px] font-medium text-primary transition-colors group-hover:text-accent">
                {tCategory(cat.strCategory)}
              </h2>
              <p className="line-clamp-2 text-sm text-ink-soft">
                {cat.strCategoryDescription}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-wide text-primary">
              <span>{t("categories.view")}</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Categories;
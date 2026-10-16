import { useLanguage } from "../context/LanguageContext";

function CategoryFilter({ categories, selected, onSelect }) {
  const { t, tCategory } = useLanguage();

  function tabClass(active) {
    return `shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
      active
        ? "bg-primary text-white shadow-sm"
        : "text-ink-soft hover:text-ink"
    }`;
  }

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto rounded-full bg-surface-mid p-1">
      <button onClick={() => onSelect(null)} className={tabClass(!selected)}>
        {t("filter.all")}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className={tabClass(selected === cat.strCategory)}
        >
          {tCategory(cat.strCategory)}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
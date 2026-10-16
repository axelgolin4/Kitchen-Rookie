import { Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function SearchBar({ initialValue = "", onSearch }) {
  const [text, setText] = useState(initialValue);
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-full bg-white px-4 py-2 shadow-sm transition-shadow focus-within:shadow-md"
    >
      <Search size={20} className="mr-2 shrink-0 text-muted" />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("search.placeholder")}
        aria-label={t("search.label")}
        className="min-w-0 flex-1 bg-transparent placeholder:text-muted focus:outline-none"
      />
      <button className="shrink-0 cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-primary-soft">
        {t("search.button")}
      </button>
    </form>
  );
}

export default SearchBar;
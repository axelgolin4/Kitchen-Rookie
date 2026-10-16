import { ArrowRight, LayoutGrid } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";

const INGREDIENTS = ["🍅", "🥕", "🌶️", "🥦", "🧄", "🧅", "🍆", "🥔", "🫑", "🍋"];

const digitClass =
  "font-display text-[length:clamp(6rem,min(28vh,40vw),16rem)] font-bold leading-none text-primary/20";

function NotFound() {
  const { t } = useLanguage();

  return (
    <main
      data-page="not-found"
      className="mx-auto flex max-w-5xl flex-col items-center px-6 py-8 text-center"
    >
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-2 sm:gap-6"
      >
        <span className={digitClass}>4</span>

        <div className="relative size-[clamp(7rem,min(26vh,30vw),15rem)] shrink-0">
          <div className="absolute inset-0 animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
            {INGREDIENTS.map((emoji, i) => {
              const angle = (i / INGREDIENTS.length) * 2 * Math.PI;
              return (
                <span
                  key={emoji}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${50 + 40 * Math.cos(angle)}%`,
                    top: `${50 + 40 * Math.sin(angle)}%`,
                  }}
                >
                  <span className="block animate-[spin_40s_linear_infinite_reverse] text-[length:clamp(1.5rem,min(4.5vh,6vw),3rem)] motion-reduce:animate-none">
                    {emoji}
                  </span>
                </span>
              );
            })}
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-[length:clamp(2.5rem,min(9vh,11vw),5.5rem)]">
            🍲
          </span>
        </div>

        <span className={digitClass}>4</span>
      </div>

      <span className="mt-6 rounded-full bg-accent-pale px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-dark">
        {t("notFound.eyebrow")}
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-ink-soft">
        {t("notFound.text")}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg"
        >
          {t("notFound.cta")}
          <ArrowRight size={18} />
        </Link>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-surface-mid"
        >
          <LayoutGrid size={18} />
          {t("notFound.secondary")}
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
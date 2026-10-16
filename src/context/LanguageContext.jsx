import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import translations from "../i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage("lang", "es");
  const dict = translations[lang] ?? translations.es;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key, vars = {}) {
    let text = dict[key] ?? translations.es[key] ?? key;
    for (const name in vars) {
      text = text.replace(`{${name}}`, vars[name]);
    }
    return text;
  }

  function tCategory(name) {
    return dict.categories[name] ?? name;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tCategory }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return context;
}
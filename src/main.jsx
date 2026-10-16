import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { LanguageProvider } from "./context/LanguageProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
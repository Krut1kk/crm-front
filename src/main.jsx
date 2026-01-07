import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@/shared/i18n/i18n.js";
import "./assets/global.scss";
import App from "./App.jsx";
import { store } from "@/store/store";
import { ToastHost } from "@/shared/ui/Toast/ToastHost";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastHost />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

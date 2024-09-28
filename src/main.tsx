import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import "./styles/app.scss";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </HelmetProvider>
    </Provider>
  </StrictMode>,
);

import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { SpecterProvider } from '@rcti/noir/react'

createRoot(document.getElementById("root")!).render(
  <SpecterProvider token={import.meta.env.VITE_SPECTER_TOKEN} apiUrl="http://localhost:4000">
    <HelmetProvider>
        <App />
      </HelmetProvider>
  </SpecterProvider>
);
//sdsds
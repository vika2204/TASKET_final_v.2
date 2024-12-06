import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { LoginPage } from "@/pages/index.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);

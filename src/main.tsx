import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// The build prerenders the page into #root (see scripts/prerender.mjs), so
// attach to that markup instead of throwing it away and re-rendering. Falls
// back to a normal client render if the container is empty, which is what
// happens in `vite dev`.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}

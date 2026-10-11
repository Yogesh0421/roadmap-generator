import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RoadMapProvider } from "../src/context/RoadMapContext.jsx";
import { ThemeProvider } from "../src/context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RoadMapProvider>
        <App />
      </RoadMapProvider>
    </ThemeProvider>
  </StrictMode>,
);

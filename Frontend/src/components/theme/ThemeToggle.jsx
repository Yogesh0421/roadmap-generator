import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Theme.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="theme-icon">{theme === "light" ? "☾" : "☀"}</span>

      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;

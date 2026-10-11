import { Link, NavLink } from "react-router-dom";
import "../Navbar/Navbar2.css";
import logo from "../../assets/logo-black.svg";
import ThemeToggle from "../theme/ThemeToggle.jsx";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo-image"
            style={{ height: "40px" }}
          />
        </Link>

        {/* Desktop / Mobile Navigation */}
        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/generate"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Generate
          </NavLink>

          <NavLink
            to="/chat"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Chat
          </NavLink>

          <NavLink
            to="/roadmap"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Roadmap
          </NavLink>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="navbar-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

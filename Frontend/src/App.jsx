// import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/home/Home.jsx";
import Generate from "../src/page/generate/Generate.jsx";
import Roadmap from "../src/page/roadmap/Roadmap.jsx";
import Chat from "../src/page/chat/Chat.jsx";
import Navbar from "../src/components/Navbar/Navbar.jsx";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

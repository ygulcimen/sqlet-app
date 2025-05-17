import React, { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-slate-800 text-white dark:bg-gray-900 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold tracking-wide">
        🧠 SQLet – <span className="text-teal-300">Query Excel Visually</span>
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-slate-600 hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition text-sm px-3 py-1 rounded"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Header;

// src/pages/MainApp.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaQuestionCircle,
  FaChevronRight,
} from "react-icons/fa";

import { ExcelProvider } from "../context/ExcelContext";
import Sidebar from "../components/layout/Sidebar";
import HomePage from "./HomePage";
import AnalysisPage from "./AnalysisPage";
import FunctionsPage from "./FunctionsPage";
import MatchReturnPage from "./MatchReturnPage";
import DateCalculatorPage from "./functions/DateCalculatorPage";
import SettingsPage from "./SettingsPage";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();

  const tabClass = (path) =>
    `hover:text-green-400 transition border-b-2 pb-1 ${
      location.pathname === path
        ? "text-green-400 border-green-400"
        : "border-transparent"
    }`;

  return (
    <header className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-md z-50 relative">
      <div className="flex items-center gap-10">
        <div className="text-3xl font-extrabold text-green-400 tracking-tight">
          SQLet
        </div>
        <nav className="flex items-center gap-6 text-lg font-medium">
          <Link to="/" className={tabClass("/")}>
            Home
          </Link>
          <Link to="/analysis" className={tabClass("/analysis")}>
            Analysis
          </Link>
          <Link to="/functions" className={tabClass("/functions")}>
            Functions
          </Link>
          <Link to="/settings" className={tabClass("/settings")}>
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button title="Help" className="hover:text-green-400 transition">
          <FaQuestionCircle />
        </button>
        <button
          title="Toggle Dark Mode"
          onClick={toggleDarkMode}
          className="hover:text-green-400 transition"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

const Layout = ({ children, collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const isAnalysis = location.pathname.startsWith("/analysis");

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {isAnalysis && (
        <div
          className={`transition-all duration-300 ${
            collapsed ? "w-[60px]" : "w-[260px]"
          }`}
        >
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </div>
      )}

      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out animate-fade px-6 py-6">
        {children}
      </main>
    </div>
  );
};

const MainApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem("darkMode", newValue.toString());
    document.documentElement.classList.toggle("dark", newValue);
  };

  return (
    <Router>
      <ExcelProvider>
        <div className="min-h-screen flex flex-col bg-gray-950 text-white relative">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Layout
            collapsed={sidebarCollapsed}
            toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/functions" element={<FunctionsPage />} />
              <Route
                path="/functions/match-return"
                element={<MatchReturnPage />}
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="*"
                element={<div className="p-4">🚧 Page Not Found</div>}
              />
              <Route
                path="/functions/date-calculate"
                element={<DateCalculatorPage />}
              />
            </Routes>
          </Layout>
        </div>
      </ExcelProvider>
    </Router>
  );
};

export default MainApp;

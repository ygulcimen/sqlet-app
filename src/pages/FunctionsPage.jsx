// src/pages/FunctionsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaExchangeAlt,
  FaBroom,
  FaCalculator,
  FaBrain,
} from "react-icons/fa";

const FunctionCard = ({ icon, title, description, comingSoon, path }) => {
  const navigate = useNavigate();
  const isClickable = !comingSoon && path;

  return (
    <div
      className={`bg-gray-800 rounded-lg p-5 text-white shadow transition-all ${
        isClickable
          ? "hover:shadow-lg cursor-pointer"
          : "opacity-60 cursor-not-allowed"
      }`}
      onClick={isClickable ? () => navigate(path) : undefined}
    >
      <div className="flex items-center gap-3 text-xl font-semibold mb-2">
        <span className="text-green-400">{icon}</span> {title}
      </div>
      <p className="text-gray-300 text-sm mb-3">{description}</p>
      {comingSoon && (
        <span className="text-xs text-yellow-400 italic">Coming soon...</span>
      )}
    </div>
  );
};

const FunctionsPage = () => {
  const functions = [
    {
      icon: <FaSearch />,
      title: "DÜŞEYARA (VLOOKUP)",
      description:
        "Search values in one column and return matching data from another.",
      path: "/functions/match-return",
    },
    {
      icon: <FaCalculator />,
      title: "Tarih Hesapla",
      description: "Verilen tarihe göre süre ekleyerek sonucu hesapla.",
      path: "/functions/date-calculate",
    },

    {
      icon: <FaExchangeAlt />,
      title: "ÇAPRAZARA (Cross-Lookup)",
      description: "Match across rows and columns for cross-referencing.",
      comingSoon: true,
    },
    {
      icon: <FaBroom />,
      title: "Clean Data",
      description: "Remove duplicates, trim spaces, and fix invalid entries.",
      comingSoon: true,
    },
    {
      icon: <FaCalculator />,
      title: "Add Calculated Column",
      description: "Generate new columns based on formulas or expressions.",
      comingSoon: true,
    },
    {
      icon: <FaBrain />,
      title: "Smart Column Mapping",
      description: "Auto-detect and map similar column names across files.",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-10 py-10">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        ⚙️ Smart Functions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {functions.map((func, i) => (
          <FunctionCard key={i} {...func} />
        ))}
      </div>
    </div>
  );
};

export default FunctionsPage;

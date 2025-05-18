import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaExchangeAlt,
  FaBroom,
  FaCalculator,
  FaBrain,
} from "react-icons/fa";

import SectionHeader from "../components/ui/SectionHeader";
import SmartCard from "../components/ui/SmartCard";

const FunctionsPage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-950 text-white px-10 py-10 space-y-6">
      <SectionHeader icon="⚙️" title="Smart Functions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {functions.map((func, i) => (
          <SmartCard
            key={i}
            icon={func.icon}
            title={func.title}
            comingSoon={func.comingSoon}
            onClick={() => !func.comingSoon && func.path && navigate(func.path)}
          >
            <p className="text-gray-300 text-sm mb-2">{func.description}</p>
            {func.comingSoon && (
              <span className="text-xs text-yellow-400 italic">
                Coming soon...
              </span>
            )}
          </SmartCard>
        ))}
      </div>
    </div>
  );
};

export default FunctionsPage;

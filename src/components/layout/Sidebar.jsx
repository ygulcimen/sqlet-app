// src/components/layout/Sidebar.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChartBar,
  FaTable,
  FaCode,
  FaListUl,
} from "react-icons/fa";
import { ExcelContext } from "../../context/ExcelContext";

const sections = [
  { id: "dashboard-section", label: "Dashboard", icon: <FaListUl /> },
  { id: "preview-section", label: "Data Preview", icon: <FaTable /> },
  { id: "schema-section", label: "Schema", icon: <FaCode /> },
  { id: "query-section", label: "SQL Query", icon: <FaCode /> },
  { id: "chart-section", label: "Charts", icon: <FaChartBar /> },
];

export default function Sidebar({ collapsed, toggleCollapsed }) {
  const [activeId, setActiveId] = useState("");
  const { files } = useContext(ExcelContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] z-40 bg-gray-900 text-white shadow-md transition-all duration-300 ease-in-out ${
        collapsed ? "w-[20px]" : "w-[260px]"
      }`}
    >
      {!collapsed ? (
        <>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-50">
              <button
                onClick={toggleCollapsed}
                className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-green-500 hover:text-black"
              >
                <FaChevronLeft />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm p-4">
            {sections.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => {
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                  toggleCollapsed();
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition ${
                  activeId === id
                    ? "bg-gray-800 text-green-400"
                    : "text-gray-300"
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </>
      ) : (
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-50">
          <button
            onClick={toggleCollapsed}
            className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-green-500 hover:text-black"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

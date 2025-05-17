// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import { FaMoon, FaSun, FaLanguage, FaTrashAlt, FaCog } from "react-icons/fa";

const SettingsPage = () => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  const clearLocalData = () => {
    localStorage.clear();
    alert("✅ Local data cleared!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-10 py-10">
      <h1 className="text-3xl font-bold text-green-400 mb-8">
        <FaCog className="inline mr-2" />
        Settings
      </h1>

      <div className="space-y-8 max-w-xl">
        {/* Appearance */}
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">🌓 Appearance</h2>
          <div className="flex items-center justify-between">
            <span>Compact Mode UI</span>
            <input
              type="checkbox"
              checked={isCompactMode}
              onChange={() => setIsCompactMode(!isCompactMode)}
              className="h-5 w-5 text-green-500"
            />
          </div>
        </div>

        {/* Language */}
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            <FaLanguage className="inline mr-2" />
            Language
          </h2>
          <select className="w-full p-2 bg-gray-900 text-white rounded">
            <option value="en">English (EN)</option>
            <option value="tr">Türkçe (TR)</option>
            {/* Add more */}
          </select>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-800 rounded-lg p-6 shadow border border-red-600">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            Danger Zone
          </h2>
          <button
            onClick={clearLocalData}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            <FaTrashAlt /> Clear Local Storage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

// src/pages/functions/dateCalculator/components/ControlButtons.jsx
import React from "react";

const ControlButtons = ({
  onCalculate,
  onExport,
  onClear,
  previewLength = 0,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <button
        onClick={onCalculate}
        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white font-medium"
      >
        🚀 Calculate
      </button>

      {previewLength > 0 && (
        <>
          <button
            onClick={onExport}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-medium"
          >
            📤 Export to Excel
          </button>

          <button
            onClick={onClear}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-medium"
          >
            🧹 Clear
          </button>
        </>
      )}

      <span className="text-sm text-gray-400 mt-2">
        {previewLength > 0 && `✅ ${previewLength} rows processed`}
      </span>
    </div>
  );
};

export default ControlButtons;

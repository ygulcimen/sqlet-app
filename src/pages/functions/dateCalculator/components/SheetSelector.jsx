// src/pages/functions/dateCalculator/components/SheetSelector.jsx
import React from "react";

const SheetSelector = ({ sheets, sheetIndex, onSheetChange }) => {
  if (!sheets || sheets.length <= 1) return null;

  return (
    <div>
      <label className="text-sm text-gray-400">📑 Sheet</label>
      <select
        className="w-full bg-gray-800 p-2 rounded"
        value={sheetIndex}
        onChange={(e) => onSheetChange(Number(e.target.value))}
      >
        {sheets.map((sheet, i) => (
          <option key={i} value={i}>
            {sheet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SheetSelector;

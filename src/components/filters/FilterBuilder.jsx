import React, { useState } from "react";

const operators = ["=", "!=", ">", "<", ">=", "<=", "LIKE"];

const FilterBuilder = ({ columns, onFilterApply }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [operator, setOperator] = useState("=");
  const [value, setValue] = useState("");

  const handleApply = () => {
    if (!selectedColumn || !value) {
      alert("Please select a column and enter a value.");
      return;
    }

    let formattedValue = value;
    if (operator === "LIKE") {
      // Auto-wrap with % if not present
      if (!value.includes("%")) {
        formattedValue = `%${value}%`;
      }
    }

    const clause = `"${selectedColumn}" ${operator} '${formattedValue}'`;
    onFilterApply(clause);
  };

  return (
    <div className="mt-6">
      <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
        🔍 Build Filter
      </h4>
      <div className="flex items-center gap-2 flex-wrap">
        <select
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 text-sm dark:text-white dark:border-gray-600"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="">Select column</option>
          {columns.map((col, i) => (
            <option key={i} value={col}>
              {col}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 text-sm dark:text-white dark:border-gray-600"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          {operators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 text-sm dark:text-white dark:border-gray-600"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />

        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBuilder;

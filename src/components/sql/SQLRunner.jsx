import React, { useEffect, useState } from "react";
import { initDuckDB, runQuerySQL } from "../services/duckdbService";

const SQLRunner = ({ tableData, initialQuery }) => {
  const [query, setQuery] = useState(
    initialQuery || "SELECT * FROM excel_data"
  );
  const [result, setResult] = useState([]);

  useEffect(() => {
    setQuery(initialQuery || "SELECT * FROM excel_data");
  }, [initialQuery]);

  useEffect(() => {
    if (!tableData || tableData.length === 0) return;

    const load = async () => {
      try {
        await initDuckDB(tableData);
      } catch (err) {
        console.error("DuckDB Init Failed:", err);
        alert("Failed to initialize database.");
      }
    };

    load();
  }, [tableData]);

  const handleRunQuery = async () => {
    try {
      const data = await runQuerySQL(query);
      setResult(data);
    } catch (err) {
      console.error("Query Failed:", err);
      alert("Query Error: " + err.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        🧪 SQL Query
      </h3>
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm font-mono text-gray-900 dark:text-gray-100"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
      />
      <button
        onClick={handleRunQuery}
        className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition"
      >
        ▶️ Run
      </button>

      {result.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                {Object.keys(result[0]).map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                >
                  {Object.values(row).map((cell, j) => (
                    <td
                      key={j}
                      className="px-3 py-2 border border-gray-200 dark:border-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SQLRunner;

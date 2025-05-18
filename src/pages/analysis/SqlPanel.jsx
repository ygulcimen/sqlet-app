import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import alasql from "alasql";
import Button from "../../components/ui/Button";
import SectionHeader from "../../components/ui/SectionHeader";

const SqlPanel = ({ data, headers, onQuerySubmit, onClear }) => {
  const [query, setQuery] = useState("SELECT * FROM data");
  const [rowCount, setRowCount] = useState(null);
  const [error, setError] = useState(null);

  // Load saved queries
  const savedQueries = JSON.parse(localStorage.getItem("savedQueries") || "[]");

  const handleRun = () => {
    try {
      if (!query.toLowerCase().includes("select")) {
        throw new Error("Only SELECT queries are supported.");
      }

      alasql.tables.data = { data }; // bind as table
      const result = alasql(query); // run the query normally

      setRowCount(result.length);
      setError(null);
      onQuerySubmit(result, query);
    } catch (err) {
      setRowCount(null);
      setError(err.message);
    }
  };

  const handleClear = () => {
    setQuery("");
    setRowCount(null);
    setError(null);
    onClear(); // 🔥 trigger reset in AnalysisPage
  };

  const handleSave = () => {
    const alias = prompt("💾 Enter a name for this query:");
    if (!alias || !query.trim()) return;

    const existing = JSON.parse(localStorage.getItem("savedQueries") || "[]");
    const newQuery = { alias, query };

    localStorage.setItem(
      "savedQueries",
      JSON.stringify([newQuery, ...existing].slice(0, 10))
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded p-4 space-y-4">
      <SectionHeader icon="💻" title="SQL Editor" />
      <CodeMirror
        value={query}
        height="150px"
        extensions={[sql()]}
        theme={oneDark}
        onChange={(val) => setQuery(val)}
      />

      <div className="flex justify-between items-center flex-wrap gap-2">
        {rowCount !== null && (
          <div className="text-green-400 text-sm">
            ✅{" "}
            {rowCount === 0
              ? "No matching rows found."
              : `${rowCount} row${rowCount > 1 ? "s" : ""} returned`}
          </div>
        )}

        {savedQueries.length > 0 && (
          <select
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
          >
            <option value="">📂 Load Saved Query</option>
            {savedQueries.map((item, i) => (
              <option key={i} value={item.query}>
                {item.alias}
              </option>
            ))}
          </select>
        )}
      </div>

      {error && <div className="text-red-400 text-sm mt-2">❌ {error}</div>}

      <div className="flex flex-wrap gap-4 mt-2">
        <Button onClick={handleRun}>▶ Run Query</Button>
        <Button onClick={handleClear} variant="secondary">
          🧹 Clear
        </Button>
        <Button onClick={handleSave} variant="ghost">
          💾 Save Query
        </Button>
      </div>
    </div>
  );
};

export default SqlPanel;

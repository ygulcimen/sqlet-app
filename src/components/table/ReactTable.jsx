import React, { useState, useMemo, useEffect } from "react";

const ReactTable = ({ data, headers = [], title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState([]);

  // Initialize headers
  const allHeaders = useMemo(() => {
    const rawHeaders =
      headers.length > 0 ? headers : Object.keys(data?.[0] || {});
    return rawHeaders.filter((h) => h !== "__raw");
  }, [data, headers]);

  // Initialize visibleColumns ONCE when headers are ready
  useEffect(() => {
    if (allHeaders.length > 0 && visibleColumns.length === 0) {
      setVisibleColumns(allHeaders);
    }
  }, [allHeaders, visibleColumns.length]);

  const toggleColumn = (col) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((h) => h !== col) : [...prev, col]
    );
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const filteredData = useMemo(() => {
    if (!globalSearch) return data;
    return data.filter((row) =>
      visibleColumns.some((col) =>
        String(row[col]).toLowerCase().includes(globalSearch.toLowerCase())
      )
    );
  }, [data, globalSearch, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  if (!data || data.length === 0) return null;

  return (
    <div className="mt-6">
      {title && <h4 className="text-lg font-bold mb-4">{title}</h4>}

      <input
        type="text"
        placeholder="🔍 Global search..."
        className="bg-gray-800 px-4 py-2 rounded w-full mb-3"
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-3 mb-4">
        {allHeaders.map((col) => (
          <label key={col} className="text-sm text-gray-300 whitespace-nowrap">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col)}
              onChange={() => toggleColumn(col)}
              className="mr-1"
            />
            {col}
          </label>
        ))}
      </div>

      <div className="overflow-x-auto rounded border border-gray-700">
        <table className="min-w-full text-sm text-left text-white bg-gray-900">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {allHeaders
                .filter((h) => visibleColumns.includes(h))
                .map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 font-semibold cursor-pointer select-none hover:bg-gray-700"
                    onClick={() => toggleSort(h)}
                  >
                    {h}
                    {sortConfig?.key === h
                      ? sortConfig.direction === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                {allHeaders
                  .filter((h) => visibleColumns.includes(h))
                  .map((h, j) => (
                    <td key={j} className="px-4 py-2">
                      {typeof row[h] === "object"
                        ? JSON.stringify(row[h])
                        : String(row[h])}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
        <span>
          Showing{" "}
          {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)}–
          {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                p * rowsPerPage < filteredData.length ? p + 1 : p
              )
            }
            disabled={currentPage * rowsPerPage >= filteredData.length}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;

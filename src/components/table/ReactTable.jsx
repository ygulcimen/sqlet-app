import React, { useState, useMemo, useEffect } from "react";

const ReactTable = ({ data, headers = [], title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([]);

  // Derive headers from data if not explicitly provided
  const finalHeaders = useMemo(() => {
    if (headers.length > 0) return headers;
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data, headers]);

  // Reset visibleColumns when headers change
  useEffect(() => {
    setVisibleColumns(finalHeaders);
  }, [finalHeaders]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const toggleColumn = (col) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((h) => h !== col) : [...prev, col]
    );
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="mt-6">
      {title && <h4 className="text-lg font-bold mb-4">{title}</h4>}

      <div className="flex flex-wrap gap-2 mb-4">
        {finalHeaders.map((h, i) => (
          <label key={i} className="text-sm text-gray-300">
            <input
              type="checkbox"
              checked={visibleColumns.includes(h)}
              onChange={() => toggleColumn(h)}
              className="mr-1"
            />
            {h}
          </label>
        ))}
      </div>

      <div className="overflow-x-auto rounded border border-gray-700">
        <table className="min-w-full text-sm text-left text-white bg-gray-900">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {visibleColumns.map((h, i) => (
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
                {visibleColumns.map((h, j) => (
                  <td key={j} className="px-4 py-1">
                    {row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
        <span>
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, data.length)}–
          {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}
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
              setCurrentPage((p) => (p * rowsPerPage < data.length ? p + 1 : p))
            }
            disabled={currentPage * rowsPerPage >= data.length}
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

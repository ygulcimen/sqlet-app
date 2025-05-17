import React, { useState } from "react";

const AnalysisResult = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageData = data.slice(startIdx, startIdx + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded p-4 mt-6">
      <h2 className="text-lg font-semibold text-green-400 mb-4">
        📋 Analysis Result
      </h2>

      <div className="overflow-auto max-h-[400px] border border-gray-700 rounded">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-gray-800">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-2 border-b border-gray-700 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-800 border-b border-gray-800"
              >
                {headers.map((header, j) => (
                  <td key={j} className="px-4 py-2">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
        <span>
          Showing {startIdx + 1}–{Math.min(startIdx + rowsPerPage, data.length)}{" "}
          of {data.length}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;

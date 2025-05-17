import React from "react";

const inferType = (value) => {
  if (value === null || value === "") return "Empty";
  if (!isNaN(Number(value))) return "Number";
  if (
    (typeof value === "string" && value.toLowerCase() === "true") ||
    value.toLowerCase() === "false"
  )
    return "Boolean";
  return "Text";
};

const SchemaSummary = ({ headers, data }) => {
  if (!headers || headers.length === 0 || data.length === 0) return null;

  const sampleRow = data[0];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-green-300 mb-3">
        🧬 Schema Overview
      </h2>
      <div className="overflow-x-auto rounded border border-gray-700">
        <table className="min-w-full text-sm text-left text-white bg-gray-900">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-4 py-2">Column</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Example</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, idx) => {
              const exampleValue = sampleRow[header];
              return (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="px-4 py-2 font-medium text-green-400">
                    {header}
                  </td>
                  <td className="px-4 py-2">{inferType(exampleValue)}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {String(exampleValue).substring(0, 50) || (
                      <i className="text-gray-500">Empty</i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchemaSummary;

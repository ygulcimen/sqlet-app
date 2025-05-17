import React from "react";
import SearchableSelect from "../../../../components/SearchableSelect";

const DatasetSelector = ({
  title,
  fileIndex,
  sheetIndex,
  column1,
  column2,
  files,
  onFileChange,
  onSheetChange,
  onCol1Change,
  onCol2Change,
  type,
}) => {
  const file = files?.[fileIndex];
  const sheets = file?.sheets || [];
  const sheet = sheets[sheetIndex];

  return (
    <div className="bg-gray-900 p-4 rounded shadow-md border border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-green-400">{title}</h2>
      {/* File selector */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Excel File</label>
        <select
          className="w-full p-2 rounded bg-gray-800"
          value={fileIndex}
          onChange={(e) => onFileChange(Number(e.target.value))}
        >
          {files.map((f, i) => (
            <option key={i} value={i}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sheet selector */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Sheet</label>
        <select
          className="w-full p-2 rounded bg-gray-800"
          value={sheetIndex}
          onChange={(e) => onSheetChange(Number(e.target.value))}
        >
          {sheets.map((s, i) => (
            <option key={i} value={i}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Column selectors */}
      {type === "base" ? (
        <div className="mb-2">
          <label className="block text-sm mb-1">Column to match from</label>
          <SearchableSelect
            options={sheet?.headers || []}
            value={column1}
            onChange={onCol1Change}
            placeholder="Select column"
          />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-sm mb-1">Match against column</label>
            <SearchableSelect
              options={sheet?.headers || []}
              value={column1}
              onChange={onCol1Change}
              placeholder="Select column"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Return column</label>
            <SearchableSelect
              options={sheet?.headers || []}
              value={column2}
              onChange={onCol2Change}
              placeholder="Select column"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetSelector;

import React, { useState } from "react";
import dayjs from "dayjs";
import FunctionFileUploader from "../../../components/uploader/FunctionFileUploader";
import ReactTable from "../../../components/table/ReactTable";
import SearchableSelect from "../../../components/filters/SearchableSelect";
import * as XLSX from "xlsx";

const durationUnits = [
  { label: "🕒 Seconds", value: "second" },
  { label: "⏱ Minutes", value: "minute" },
  { label: "🕰 Hours", value: "hour" },
  { label: "📆 Days", value: "day" },
];

const durationModes = [
  { label: "🔢 Fixed Duration", value: "fixed" },
  { label: "📄 From Column", value: "column" },
];

const operations = [
  { label: "➕ Add", value: "add" },
  { label: "➖ Subtract", value: "subtract" },
];

const DateBulkProcessor = () => {
  const [fileName, setFileName] = useState("");
  const [sheets, setSheets] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(0);

  const [dateColumn, setDateColumn] = useState("");
  const [durationColumn, setDurationColumn] = useState("");
  const [fixedDuration, setFixedDuration] = useState(0);
  const [durationUnit, setDurationUnit] = useState("second");
  const [operation, setOperation] = useState("add");
  const [mode, setMode] = useState("fixed");
  const [preview, setPreview] = useState([]);

  const currentSheet = sheets[sheetIndex];
  const data = currentSheet?.data || [];
  const headers = currentSheet?.headers || [];

  const parseExcelDate = (serial) => {
    const days = Math.floor(serial);
    const timeFraction = serial - days;

    const baseDate = new Date(1899, 11, 30); // Excel starts on 1899-12-30
    baseDate.setDate(baseDate.getDate() + days);

    const secondsInDay = 86400;
    const totalSeconds = Math.round(timeFraction * secondsInDay);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return dayjs(baseDate).hour(hours).minute(minutes).second(seconds);
  };

  const handleProcess = () => {
    const processed = data.map((row) => {
      const raw = row.__raw || row;

      const baseDate = parseExcelDate(raw[dateColumn]);
      const duration =
        mode === "fixed" ? fixedDuration : Number(raw[durationColumn]);

      if (!baseDate.isValid() || isNaN(duration)) {
        const { __raw, ...safeRow } = row;
        return { ...safeRow, calculatedDate: "Invalid" };
      }

      const resultDate =
        operation === "add"
          ? baseDate.add(duration, durationUnit)
          : baseDate.subtract(duration, durationUnit);

      const { __raw, ...safeRow } = row;
      return {
        ...safeRow,
        calculatedDate: resultDate.format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    setPreview(processed);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(preview);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, `BulkDateResults_${Date.now()}.xlsx`);
  };

  const handleClear = () => {
    setPreview([]);
    setDateColumn("");
    setDurationColumn("");
    setFixedDuration(0);
    setDurationUnit("second");
    setOperation("add");
    setMode("fixed");
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded p-6 space-y-6">
      <h2 className="text-xl font-bold text-green-400">
        📅 Bulk Date Calculator
      </h2>
      <FunctionFileUploader
        onFileParsed={(parsedSheets, fileName) => {
          setSheets(parsedSheets);
          setSheetIndex(0);
          setFileName(fileName);
          setPreview([]);
          setDateColumn("");
          setDurationColumn("");
        }}
      />

      {sheets.length > 0 && (
        <>
          {sheets.length > 1 && (
            <div>
              <label className="text-sm text-gray-400">📑 Sheet</label>
              <select
                className="w-full bg-gray-800 p-2 rounded"
                value={sheetIndex}
                onChange={(e) => setSheetIndex(Number(e.target.value))}
              >
                {sheets.map((sheet, i) => (
                  <option key={i} value={i}>
                    {sheet.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <SearchableSelect
              label="📅 Date Column"
              options={headers}
              value={dateColumn}
              onChange={setDateColumn}
            />

            <SearchableSelect
              label="🧮 Duration Mode"
              options={durationModes.map((d) => d.label)}
              value={durationModes.find((m) => m.value === mode)?.label || ""}
              onChange={(label) =>
                setMode(
                  durationModes.find((m) => m.label === label)?.value || "fixed"
                )
              }
            />

            <SearchableSelect
              label="🔁 Operation"
              options={operations.map((o) => o.label)}
              value={operations.find((o) => o.value === operation)?.label || ""}
              onChange={(label) =>
                setOperation(
                  operations.find((o) => o.label === label)?.value || "add"
                )
              }
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mode === "fixed" ? (
              <div>
                <label className="text-sm text-gray-400">
                  📏 Duration Amount
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-800 p-2 rounded"
                  value={fixedDuration}
                  onChange={(e) => setFixedDuration(Number(e.target.value))}
                  placeholder="e.g. 7"
                />
              </div>
            ) : (
              <SearchableSelect
                label="🧾 Duration Column"
                options={headers}
                value={durationColumn}
                onChange={setDurationColumn}
              />
            )}

            <SearchableSelect
              label="⏱️ Duration Unit"
              options={durationUnits.map((u) => u.label)}
              value={
                durationUnits.find((u) => u.value === durationUnit)?.label || ""
              }
              onChange={(label) =>
                setDurationUnit(
                  durationUnits.find((u) => u.label === label)?.value ||
                    "second"
                )
              }
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleProcess}
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white font-medium"
            >
              🚀 Calculate
            </button>

            {preview.length > 0 && (
              <>
                <button
                  onClick={handleExport}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-medium"
                >
                  📤 Export to Excel
                </button>

                <button
                  onClick={handleClear}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-medium"
                >
                  🧹 Clear
                </button>
              </>
            )}

            <span className="text-sm text-gray-400 mt-2">
              {preview.length > 0 && `✅ ${preview.length} rows processed`}
            </span>
          </div>

          {preview.length > 0 && (
            <div className="mt-6">
              <ReactTable
                data={preview}
                title="📋 Result Preview (includes calculatedDate)"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default DateBulkProcessor;

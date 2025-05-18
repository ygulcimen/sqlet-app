// src/pages/functions/dateCalculator/DateBulkProcessor.jsx
import React, { useState } from "react";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

import FunctionFileUploader from "../../../components/uploader/FunctionFileUploader";
import ReactTable from "../../../components/table/ReactTable";

// Custom components
import DateCalculatorHeader from "./components/DateCalculatorHeader";
import SheetSelector from "./components/SheetSelector";
import DurationConfig from "./components/DurationConfig";
import ControlButtons from "./components/ControlButtons";

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

    const baseDate = new Date(1899, 11, 30);
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
      <DateCalculatorHeader />

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
          <SheetSelector
            sheets={sheets}
            sheetIndex={sheetIndex}
            onSheetChange={setSheetIndex}
          />

          <DurationConfig
            headers={headers}
            mode={mode}
            setMode={setMode}
            operation={operation}
            setOperation={setOperation}
            durationUnit={durationUnit}
            setDurationUnit={setDurationUnit}
            fixedDuration={fixedDuration}
            setFixedDuration={setFixedDuration}
            durationColumn={durationColumn}
            setDurationColumn={setDurationColumn}
            dateColumn={dateColumn}
            setDateColumn={setDateColumn}
          />

          <ControlButtons
            onCalculate={handleProcess}
            onExport={handleExport}
            onClear={handleClear}
            previewLength={preview.length}
          />

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

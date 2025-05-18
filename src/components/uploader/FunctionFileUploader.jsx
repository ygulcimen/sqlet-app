// src/components/uploader/FunctionFileUploader.jsx
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { FaFileUpload, FaTimesCircle } from "react-icons/fa";

const FunctionFileUploader = ({ onFileParsed }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [sheets, setSheets] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const parsedSheets = workbook.SheetNames.map((sheetName) => {
      const formatted = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        defval: "",
        raw: false,
      });
      const raw = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        defval: "",
        raw: true,
      });

      const merged = formatted.map((row, i) => ({
        ...row,
        __raw: raw[i] || {},
      }));

      return {
        name: sheetName,
        data: merged,
        headers: Object.keys(merged[0] || {}).filter((h) => h !== "__raw"),
      };
    });

    setFileName(file.name);
    setSheets(parsedSheets);
    inputRef.current.value = "";
    onFileParsed(parsedSheets, file.name);
  };

  const clearUpload = () => {
    setFileName("");
    setSheets([]);
    onFileParsed([], null);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-full">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-green-400 transition">
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
          id="function-file-upload"
        />
        <label
          htmlFor="function-file-upload"
          className="cursor-pointer text-center"
        >
          <FaFileUpload className="text-3xl text-green-400 mx-auto mb-2" />
          <p className="text-white font-semibold">Upload Excel File</p>
          <p className="text-sm text-gray-400">
            Drag and drop, or click to select
          </p>
        </label>
      </div>

      {fileName && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center bg-gray-800 text-sm text-white px-3 py-2 rounded shadow border border-green-400">
            <span>{fileName}</span>
            <FaTimesCircle
              className="cursor-pointer text-red-400 hover:text-red-500"
              onClick={clearUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionFileUploader;

import React, { createContext, useState } from "react";
import * as XLSX from "xlsx";

export const ExcelContext = createContext();

export const ExcelProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const addFile = (name, arrayBuffer) => {
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheets = workbook.SheetNames.map((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      return {
        name: sheetName,
        data: jsonData,
        headers,
      };
    });

    const newFile = { name, sheets };
    setFiles((prev) => [...prev, newFile]);
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <ExcelContext.Provider value={{ files, addFile, removeFile }}>
      {children}
    </ExcelContext.Provider>
  );
};

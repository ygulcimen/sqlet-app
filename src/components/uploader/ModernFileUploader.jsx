import React, { useContext, useRef } from "react";
import { ExcelContext } from "../context/ExcelContext";
import { FaFileUpload, FaTimesCircle } from "react-icons/fa";

const ModernFileUploader = () => {
  const { files, addFile, removeFile } = useContext(ExcelContext);
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 1);
    for (let file of selectedFiles) {
      const data = await file.arrayBuffer();
      addFile(file.name, data);
    }
    inputRef.current.value = "";
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[200px] p-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-green-400 transition">
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer text-center">
          <FaFileUpload className="text-3xl text-green-400 mx-auto mb-2" />
          <p className="text-white font-semibold">Upload Excel File</p>
          <p className="text-sm text-gray-400">
            Drag and drop, or click to select
          </p>
        </label>
      </div>

      <div className="mt-4">
        {files.map((f, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-800 text-sm text-white px-3 py-2 rounded mt-2 shadow border border-green-400"
          >
            <span>{f.name}</span>
            <FaTimesCircle
              className="cursor-pointer text-red-400 hover:text-red-500"
              onClick={() => removeFile(f.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernFileUploader;

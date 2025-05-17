import React, { useRef, useContext } from "react";
import { ExcelContext } from "../../context/ExcelContext";
import { FaFileExcel, FaTimesCircle } from "react-icons/fa";

const FileUploader = ({ maxFiles = 2 }) => {
  const { files, addFile, removeFile } = useContext(ExcelContext);
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(
      0,
      maxFiles - files.length
    );
    for (let file of selectedFiles) {
      const data = await file.arrayBuffer();
      addFile(file.name, data);
    }
    inputRef.current.value = "";
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Upload Excel Files (Max {maxFiles})
      </label>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx, .xls"
        multiple
        disabled={files.length >= maxFiles}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
      />

      <div className="flex flex-wrap gap-3 mt-4">
        {files.map((f, i) => (
          <div
            key={i}
            className="bg-gray-800 flex items-center gap-2 text-sm px-3 py-2 rounded-full text-white shadow border border-green-400"
          >
            <FaFileExcel className="text-green-400" />
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

export default FileUploader;

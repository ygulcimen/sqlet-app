import React from "react";
import ReactTable from "../../../../../components/table/ReactTable";
import { FaTimes, FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";

const MatchPreviewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MatchPreview");
    XLSX.writeFile(wb, "Matched_Result.xlsx");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-[90%] max-w-5xl max-h-[90vh] p-6 overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          🔎 Matched Preview
        </h2>
        <p className="text-gray-300 mb-4">
          Showing <strong>{data.length}</strong> rows (first few visible).
        </p>

        <ReactTable data={data.slice(0, 100)} />

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
          >
            <FaFileExport /> Export as Excel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPreviewModal;

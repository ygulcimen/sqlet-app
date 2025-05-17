import React, { useContext, useState, useEffect } from "react";
import ModernFileUploader from "../../components/uploader/ModernFileUploader";
import SchemaSummary from "./SchemaSummary";
import SqlPanel from "./SqlPanel";
import ReactTable from "../../components/table/ReactTable";
import { ExcelContext } from "../../context/ExcelContext";

const AnalysisPage = () => {
  const { files } = useContext(ExcelContext);

  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const [sqlQuery, setSqlQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [displayHeaders, setDisplayHeaders] = useState([]);

  const file = files[selectedFileIndex];
  const sheet = file?.sheets?.[selectedSheetIndex];
  const data = sheet?.data || [];
  const headers = sheet?.headers || [];

  useEffect(() => {
    if (files.length > 0) {
      setSelectedFileIndex(0);
      setSelectedSheetIndex(0);
      setFilteredData([]);
    }
  }, [files]);

  return (
    <div className="flex flex-col w-full h-full text-white px-6 py-6 space-y-10 transition-all duration-300">
      <div className="w-full flex justify-center">
        <ModernFileUploader maxFiles={1} />
      </div>

      {files.length > 0 && (
        <>
          {/* File Info */}
          <div
            id="fileinfo-section"
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div className="bg-gray-900 p-4 rounded shadow border border-gray-700">
              <label className="text-sm text-gray-400 block mb-1">
                Excel File
              </label>
              <select
                className="w-full p-2 rounded bg-gray-800"
                value={selectedFileIndex}
                onChange={(e) => setSelectedFileIndex(Number(e.target.value))}
              >
                {files.map((f, i) => (
                  <option key={i} value={i}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-900 p-4 rounded shadow border border-gray-700">
              <label className="text-sm text-gray-400 block mb-1">Sheet</label>
              <select
                className="w-full p-2 rounded bg-gray-800"
                value={selectedSheetIndex}
                onChange={(e) => setSelectedSheetIndex(Number(e.target.value))}
              >
                {file?.sheets?.map((s, i) => (
                  <option key={i} value={i}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-900 p-4 rounded shadow border border-gray-700 flex items-center justify-center text-lg font-medium text-gray-300">
              {data.length} Rows • {headers.length} Columns
            </div>
          </div>
          <div id="preview-section">
            <ReactTable
              data={filteredData.length > 0 ? displayData : data}
              headers={filteredData.length > 0 ? displayHeaders : headers}
              title={sqlQuery ? "Query Results" : "Full Data Preview"}
            />
          </div>

          <div id="query-section">
            <SqlPanel
              data={data}
              headers={headers}
              onQuerySubmit={(result, rawQuery) => {
                setFilteredData(result);
                setSqlQuery(rawQuery);
                if (result.length > 0) {
                  setDisplayHeaders(Object.keys(result[0]));
                  setDisplayData(result);
                } else {
                  setDisplayHeaders([]);
                  setDisplayData([]);
                }
              }}
              onClear={() => {
                setFilteredData([]);
                setSqlQuery("");
                setDisplayHeaders(headers);
                setDisplayData(data);
              }}
            />
          </div>

          <div id="schema-section">
            <SchemaSummary headers={headers} data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisPage;

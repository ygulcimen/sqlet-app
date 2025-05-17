import React, { useContext, useState, useEffect } from "react";
import { ExcelContext } from "../../../context/ExcelContext";
import FileUploader from "../../../components/uploader/FileUploader";
import MatchReturnHeader from "./components/MatchReturnHeader";
import DatasetSelector from "./components/DataSelector";
import MatchPreviewModal from "./components/modals/MatchPreviewModal";

const MatchReturnPage = () => {
  const { files } = useContext(ExcelContext);

  const [base, setBase] = useState({ fileIndex: 0, sheetIndex: 0, column: "" });
  const [lookup, setLookup] = useState({
    fileIndex: 0,
    sheetIndex: 0,
    matchColumn: "",
    returnColumn: "",
  });
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Ensure lookup points to second file when it exists
  useEffect(() => {
    if (files.length === 2 && lookup.fileIndex !== 1) {
      setLookup((prev) => ({ ...prev, fileIndex: 1, sheetIndex: 0 }));
    }
  }, [files.length]);

  const fileA = files[base.fileIndex];
  const fileB = files[lookup.fileIndex];
  const sheetA = fileA?.sheets?.[base.sheetIndex];
  const sheetB = fileB?.sheets?.[lookup.sheetIndex];

  const runMatch = () => {
    if (!sheetA?.data || !sheetB?.data) return;
    const enriched = sheetA.data.map((row) => {
      const matched = sheetB.data.find(
        (r) => r[lookup.matchColumn] === row[base.column]
      );
      return {
        ...row,
        MatchedValue: matched ? matched[lookup.returnColumn] : "Not found",
      };
    });

    setPreview(enriched.slice(0, 100)); // show first 100 for modal
    setShowModal(true);
  };

  return (
    <div className="text-white max-w-6xl mx-auto px-6 py-8">
      <MatchReturnHeader />
      <FileUploader maxFiles={2} />
      {files.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <DatasetSelector
              title="📄 Dataset A (Base)"
              type="base"
              files={files}
              fileIndex={base.fileIndex}
              sheetIndex={base.sheetIndex}
              column1={base.column}
              onFileChange={(fileIndex) =>
                setBase({ ...base, fileIndex, sheetIndex: 0 })
              }
              onSheetChange={(sheetIndex) => setBase({ ...base, sheetIndex })}
              onCol1Change={(column) => setBase({ ...base, column })}
            />

            <DatasetSelector
              title="📂 Dataset B (Lookup)"
              type="lookup"
              files={files}
              fileIndex={lookup.fileIndex}
              sheetIndex={lookup.sheetIndex}
              column1={lookup.matchColumn}
              column2={lookup.returnColumn}
              onFileChange={(fileIndex) =>
                setLookup({ ...lookup, fileIndex, sheetIndex: 0 })
              }
              onSheetChange={(sheetIndex) =>
                setLookup({ ...lookup, sheetIndex })
              }
              onCol1Change={(matchColumn) =>
                setLookup({ ...lookup, matchColumn })
              }
              onCol2Change={(returnColumn) =>
                setLookup({ ...lookup, returnColumn })
              }
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={runMatch}
              disabled={
                !base.column || !lookup.matchColumn || !lookup.returnColumn
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Run Match
            </button>
          </div>
        </>
      )}

      {/* Modal Preview */}
      <MatchPreviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={preview}
      />
    </div>
  );
};

export default MatchReturnPage;

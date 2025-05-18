// src/pages/functions/matchAndReturn/MatchReturnPage.jsx
import React, { useState, useEffect } from "react";
import SectionHeader from "../../../components/ui/SectionHeader";
import FunctionFileUploader from "../../../components/uploader/FunctionFileUploader";
import DatasetPairSelector from "./components/DatasetPairSelector";
import MatchReturnHeader from "./components/MatchReturnHeader";
import MatchPreviewModal from "./components/modals/MatchPreviewModal";
import { matchDatasets } from "../../../utils/matchDataset";

const MatchReturnPage = () => {
  const [parsedFiles, setParsedFiles] = useState([]);

  const [base, setBase] = useState({ fileIndex: 0, sheetIndex: 0, column: "" });
  const [lookup, setLookup] = useState({
    fileIndex: 0,
    sheetIndex: 0,
    matchColumn: "",
    returnColumn: "",
  });

  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (parsedFiles.length === 1) {
      setBase({ fileIndex: 0, sheetIndex: 0, column: "" });
      setLookup({
        fileIndex: 0,
        sheetIndex: 0,
        matchColumn: "",
        returnColumn: "",
      });
    }
    if (parsedFiles.length === 2) {
      setLookup((prev) => ({ ...prev, fileIndex: 1, sheetIndex: 0 }));
    }
  }, [parsedFiles.length]);

  useEffect(() => {
    if (base.fileIndex >= parsedFiles.length) {
      setBase({ fileIndex: 0, sheetIndex: 0, column: "" });
    }
    if (lookup.fileIndex >= parsedFiles.length) {
      setLookup({
        fileIndex: 0,
        sheetIndex: 0,
        matchColumn: "",
        returnColumn: "",
      });
    }
  }, [parsedFiles, base.fileIndex, lookup.fileIndex]);

  const fileA = parsedFiles[base.fileIndex];
  const fileB = parsedFiles[lookup.fileIndex];
  const sheetA = fileA?.sheets?.[base.sheetIndex];
  const sheetB = fileB?.sheets?.[lookup.sheetIndex];

  const runMatch = () => {
    if (!sheetA?.data || !sheetB?.data) return;

    const enriched = matchDatasets(
      sheetA.data,
      sheetB.data,
      base.column,
      lookup.matchColumn,
      lookup.returnColumn
    );

    setPreview(enriched.slice(0, 100));
    setShowModal(true);
  };

  return (
    <div className="text-white max-w-6xl mx-auto px-6 py-8 space-y-10">
      <SectionHeader icon="🔍" title="Match & Return" />
      <MatchReturnHeader />
      <FunctionFileUploader maxFiles={2} onFileParsed={setParsedFiles} />

      {parsedFiles.length > 0 && (
        <DatasetPairSelector
          files={parsedFiles}
          base={base}
          lookup={lookup}
          setBase={setBase}
          setLookup={setLookup}
          onRunMatch={runMatch}
        />
      )}

      <MatchPreviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={preview}
      />
    </div>
  );
};

export default MatchReturnPage;

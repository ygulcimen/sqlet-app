// src/pages/functions/matchAndReturn/components/DatasetPairSelector.jsx
import React from "react";
import DatasetSelector from "./DataSelector";

const DatasetPairSelector = ({
  files,
  base,
  lookup,
  setBase,
  setLookup,
  onRunMatch,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
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
          onSheetChange={(sheetIndex) => setLookup({ ...lookup, sheetIndex })}
          onCol1Change={(matchColumn) => setLookup({ ...lookup, matchColumn })}
          onCol2Change={(returnColumn) =>
            setLookup({ ...lookup, returnColumn })
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onRunMatch}
          disabled={!base.column || !lookup.matchColumn || !lookup.returnColumn}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          ▶ Run Match
        </button>
      </div>
    </div>
  );
};

export default DatasetPairSelector;

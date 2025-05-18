import React from "react";

const MatchReturnHeader = () => (
  <div className="text-sm text-gray-400 max-w-3xl leading-relaxed">
    Upload up to <strong>2 Excel files</strong>. You can match data:
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>Between two different files (File A ➜ File B)</li>
      <li>Or within the same file (Sheet A ➜ Sheet B)</li>
    </ul>
    Select which columns to compare and which column to return.
  </div>
);

export default MatchReturnHeader;

// src/pages/functions/dateCalculator/components/DateCalculatorHeader.jsx
import React from "react";

const DateCalculatorHeader = () => (
  <div className="mb-4">
    <h1 className="text-2xl font-bold text-green-400 mb-1">
      📅 Date Calculator
    </h1>
    <p className="text-sm text-gray-400">
      Upload an Excel file and apply date addition or subtraction using fixed
      values or values from another column.
    </p>
  </div>
);

export default DateCalculatorHeader;

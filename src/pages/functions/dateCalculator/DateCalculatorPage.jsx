// src/pages/DateCalculatorPage.jsx
import React from "react";
import DateBulkProcessor from "./dateCalculator/DateBulkProcessor";

const DateCalculatorPage = () => {
  return (
    <div className="min-h-screen px-10 py-8 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        📅 Date Calculator
      </h1>
      <DateBulkProcessor />
    </div>
  );
};

export default DateCalculatorPage;

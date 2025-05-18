// src/components/ui/SectionHeader.jsx
import React from "react";

const SectionHeader = ({ title, icon = "📌" }) => {
  return (
    <h2 className="text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2">
      <span>{icon}</span>
      <span>{title}</span>
    </h2>
  );
};

export default SectionHeader;

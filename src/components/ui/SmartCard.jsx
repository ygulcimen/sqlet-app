// src/components/ui/SmartCard.jsx
import React from "react";

const SmartCard = ({ children, title, icon, comingSoon, onClick }) => {
  return (
    <div
      className={`rounded-xl p-4 shadow-md transition transform 
        ${
          comingSoon
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-[1.02]"
        } 
        bg-gray-900`}
      onClick={onClick} // <--- THIS MUST BE PRESENT!
    >
      <div className="flex items-center gap-2 text-lg font-medium text-white mb-2">
        {icon && <span>{icon}</span>}
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SmartCard;

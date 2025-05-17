import React from "react";
import {
  FaFileExcel,
  FaStar,
  FaChartBar,
  FaPuzzlePiece,
  FaFileAlt,
  FaRocket,
} from "react-icons/fa";

const HomePage = ({ onNavigate }) => {
  const recentFiles = [
    "clients_q1.xlsx",
    "sales_data_march.xlsx",
    "products_2025.xlsx",
  ];
  const savedQueries = ["Top 10 Sales", "Empty Emails", "Frequent Customers"];

  const cardStyle =
    "flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded shadow hover:bg-gray-700 transition cursor-pointer";

  return (
    <div className="p-10 text-white min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Header */}
      <h1 className="text-4xl font-bold text-green-400 mb-2 flex items-center gap-2">
        Welcome to <span className="text-white">SQLet</span> 👋
      </h1>
      <p className="text-gray-400 mb-10">
        Visual SQL for your Excel sheets. Upload files, build queries, and
        uncover insights.
      </p>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div
          onClick={() => onNavigate("Analysis")}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg cursor-pointer transition"
        >
          <FaChartBar className="text-2xl" />
          <span className="text-lg font-medium">Start New Analysis</span>
        </div>
        <div
          onClick={() => onNavigate("Functions")}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg cursor-pointer transition"
        >
          <FaPuzzlePiece className="text-2xl" />
          <span className="text-lg font-medium">Try Smart Functions</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Recent Files */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaFileExcel className="text-green-400" /> Recently Opened Files
          </h2>
          <div className="space-y-3">
            {recentFiles.map((file, idx) => (
              <div key={idx} className={cardStyle}>
                <FaFileAlt className="text-green-300" />
                <span className="truncate">{file}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Queries */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Saved Queries
          </h2>
          <div className="space-y-3">
            {savedQueries.map((query, idx) => (
              <div key={idx} className={cardStyle}>
                <FaStar className="text-yellow-400" />
                <span>{query}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-gray-500 text-center">
        Built with 💚 by Bro & ChatGPT — <span className="italic">v1.0.0</span>{" "}
        • All data stays local
      </footer>
    </div>
  );
};

export default HomePage;

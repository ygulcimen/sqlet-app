import React from "react";
import { FaFileExcel, FaRocket, FaGithub } from "react-icons/fa";

const CoverPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        <span className="text-green-400">SQLet</span> – Query Excel Visually
      </h1>
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        Powerful yet simple Excel analysis with visual filters, smart functions
        like <strong>DÜŞEYARA</strong>, <strong>ÇAPRAZARA</strong>, and full SQL
        control — all in your browser.
      </p>

      <button
        onClick={onStart}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition flex items-center gap-2"
      >
        <FaFileExcel className="text-xl" /> Upload Excel & Start
      </button>

      <div className="flex gap-4 mt-6 text-sm text-gray-400">
        <button className="hover:text-white flex items-center gap-1">
          <FaRocket /> Learn More
        </button>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white flex items-center gap-1"
        >
          <FaGithub /> GitHub
        </a>
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        Built with 💚 by Bro & ChatGPT — {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default CoverPage;

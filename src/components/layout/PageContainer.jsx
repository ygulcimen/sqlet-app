import React from "react";

const PageContainer = ({ children }) => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-all">
      {children}
    </main>
  );
};

export default PageContainer;

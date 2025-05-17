import React, { useState } from "react";
import CoverPage from "./pages/CoverPage";
import MainApp from "./pages/MainApp";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? <MainApp /> : <CoverPage onStart={() => setStarted(true)} />}
    </>
  );
}

export default App;

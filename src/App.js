import React from "react";
import Class from "./components/Class";
import Func from "./components/Func";
import Refactored from "./components/Refactored";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Class /> */}
        {/* <Func /> */}
        <Refactored />
      </header>
    </div>
  );
}

export default App;

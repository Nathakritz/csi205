import React from "react";
import Temperatures from "./Temperatures";

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1>Temperature Converter</h1>
      <Temperatures />
    </div>
  );
}

export default App;
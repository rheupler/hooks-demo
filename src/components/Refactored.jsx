import React, { useState } from "react";
const API = "https://api.wheretheiss.at/v1/satellites/25544";

export default function Refactored() {
  const [name, setName] = useState("Placeholder Name");
  const [lat, setLat] = useState("Placeholder Lat");
  const [long, setLong] = useState("Placeholder Long");
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasCounter, setHasCounter] = useState(false);
  return (
    <div>
      <p>Hello, world!</p>
    </div>
  );
}

function Counter() {
  const [updatedCounter, setUpdatedCounter] = useState(0);
  const [render, setRender] = useState(0);
  return (
    <div>
      <p>Counter: counter</p>
      <p>Counter Updated: updatedCounter</p>
      <p>Rendered: render</p>
    </div>
  );
}

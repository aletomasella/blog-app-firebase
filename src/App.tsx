import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Home } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

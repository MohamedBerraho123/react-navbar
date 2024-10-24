// app.jsx
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Contact } from "./components/pages";
// import AuthFromStudent from "../components/pages/login/AuthFromStudent"
import AuthFromStudent from "../src/components/pages/login/AuthFromStudent"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthFromStudent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;

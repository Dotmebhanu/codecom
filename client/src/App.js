import React from "react";
import EditorPage from "./components/EditorPage";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomid" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
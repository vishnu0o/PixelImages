import "./App.css";
import * as React from "react";
import { useAreaSelection, useSelected } from "./area-selection";
import ImageMixer from "./ImageMixer";
import Grid from "./Grid";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Image from "./Image";
import Header from "./Header";


export default function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Image />} />
        <Route path="/upload" element={<Grid />} />
        <Route path="/image" element={<ImageMixer />} />
      </Routes>
    </div>
  );
}

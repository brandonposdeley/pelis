import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreenDetails from "./view/ScreenDetails";
import ContextProvider from "./context/slice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pelicula/:id" element={<ScreenDetails />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);

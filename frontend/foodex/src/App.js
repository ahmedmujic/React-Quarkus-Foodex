import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/header/header";
import { Content } from "./components/Content";
import { useState, createContext } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header title={"Foodex"} />

        <Content className="container" />
      </BrowserRouter>
    </div>
  );
}

export default App;

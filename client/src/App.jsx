import React from "react";
import Header from "./Components/Header";
import Homepage from "./Components/Buttons";
import Footer from "./Components/Footer";
import TransactionHist from "./Components/TransactionHist";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";


function App() {

  return (
    <>
      <div>
        <Header />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/TransactionHist" element={<TransactionHist />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

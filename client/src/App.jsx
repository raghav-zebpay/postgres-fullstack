import React from "react";
import Header from "./Components/Header";
import Homepage from "./Components/Buttons";
import Footer from "./Components/Footer";
import TransactionHist from "./Components/TransactionHist";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";

// comments addded
function App() {
  // const[details,setDetails]=React.useState([]);
  // const [obj,setObj]=React.useState({
  //     coin:"",
  //     price:"",
  //     exchange:""
  // })

  return (
    <>
      <div>
        <Header/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}/>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/TransactionHist" element={<TransactionHist />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

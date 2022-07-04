import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransactionHist = () => {
  const navigate = useNavigate();
  const [hist, sethist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/trades/")
      .then((res) => {
        console.log("in transaction history")
        console.log(res.data.rows);
        sethist(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <div className="TransHist">
        <h1 className="heading">Transaction History</h1>
      </div>
      <table className="table" style={{ marginTop: "1.5rem" }}>
        <thead className="tablecolor">
          <tr>
            {/* <th>Date</th> */}
            <th>Currency</th>
            <th>Exchange</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Order Value</th>
            <th>Status</th>
            <th>Trade-Type</th>
          </tr>
        </thead>
        <tbody>
        {console.log(hist)}
          {hist.map((history) => (
            <tr key={history.id}>
              {/* <td>{history.date}</td> */}
              <td>{history.currency}</td>
              <td>{history.exchange_name}</td>
              <td>{history.quantity}</td>
              <td>{history.price}</td>
              <td>{history.total}</td>
              <td>{history.execution}</td>
              <td>{history.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <br></br>
      <button className="btn btn-warning btn-lg" onClick={() => navigate("/homepage")}>Back</button>
    </div>
  );
};
export default TransactionHist;

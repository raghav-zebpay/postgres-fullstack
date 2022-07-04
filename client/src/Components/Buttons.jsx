import React from "react";
import DataFetch from "./DataFetch";
import {NavLink,useNavigate} from "react-router-dom";

function Button(){

    const navigate=useNavigate();
    
    // const [btc,setbtc]=React.useState(false)
    // const [eth,seteth]=React.useState(false)
    // const [bat,setbat]=React.useState(false)
    // const [xrp,setxrp]=React.useState(false)
    // const [ada,setada]=React.useState(false)

    const [coin,setCoin]=React.useState("");

    // Previous state restore 
    React.useEffect(()=>{
        const prevdata=localStorage.getItem("coins-data")
        if(prevdata){
            setCoin(JSON.parse(prevdata))
            // console.log(JSON.parse(prevdata))
        }
    },[])

    // stroing previous state
    React.useEffect(()=>{
        localStorage.setItem("coins-data",JSON.stringify(coin))
    })

    return (
        <div>
         <button type="button" className="btn btn-primary bt btmargin" onClick={()=>setCoin("btc")}>BTC-USDT</button>
         <button type="button" className="btn btn-primary bt btmargin" onClick={()=>setCoin("eth")}>ETH-USDT</button>
         <button type="button" className="btn btn-primary bt btmargin" onClick={()=>setCoin("bat")}>BAT-USDT</button>
         <button type="button" className="btn btn-primary bt btmargin" onClick={()=>setCoin("xrp")}>XRP-USDT</button>
         <button type="button" className="btn btn-primary bt btmargin" onClick={()=>setCoin("ada")}>ADA-USDT</button>
         <button type="button" className="btn btn-dark bt btmargin" style={{float:"right"}} onClick={()=>{navigate("/")}} >Logout</button>
         {coin==="btc"?<DataFetch id="btc"/>:""}
         {coin==="eth"?<DataFetch id="eth"/>:""}
         {coin==="bat"?<DataFetch id="bat"/>:""}
         {coin==="xrp"?<DataFetch id="xrp"/>:""}
         {coin==="ada"?<DataFetch id="ada"/>:""}
          {/* transactions button */}
         <button type="button" className="btn btn-dark btmargin"><NavLink className="col" to ="/TransactionHist">Go to Transaction History</NavLink> </button>
         </div>
    )
}

function reload(){
    window.location.reload(true);
}

// setTimeout(reload,10000);

export default Button
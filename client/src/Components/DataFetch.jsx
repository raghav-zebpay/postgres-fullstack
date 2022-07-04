import React, { useEffect, useState } from "react";
import axios from "axios";
import Trade from "./Trade"


function DataFetch(props){
    const[post,setPost]=React.useState([]);


    const [click,setClick]=useState(false);
    const [text,setText]=useState("");
    const [exchage,setExchange]=useState("");
    const [price,setPrice]=useState(0);
    const [tb, setTb] = useState([]);

    var pp=price;

// getting data from databade
   useEffect(()=>{
        axios.get(`/${props.id}`)
        .then(res=>{
            // console.log(res);
            setPost(res.data.rows);
        })
        .catch(err=>{
            console.log(err);
        })
    })

    // React.useEffect(()=>{
    //         console.log(price);
    // },[post])

        // React.useEffect(()=>{
        // const prevdata=localStorage.getItem("coins-data")
        // if(prevdata){
        //     setPost(JSON.parse(prevdata))
        //     console.log(JSON.parse(prevdata))
        // }
        // // const cl=localStorage.getItem("cl");
        // // if(cl){
        // //     setClick(JSON.parse(cl));
        // //     console.log(cl);
        // // }
    // },[post])

    // React.useEffect(()=>{
    //     console.log("DataFEtc")
    //     localStorage.setItem("coins-data",JSON.stringify(post))
    //     localStorage.setItem("cl",JSON.stringify(click))
    // },[post])

    // the price is not getting updated 
    function func(hell){
        console.log("it has been called")
        console.log("the price is "+hell +" && "+price)
    }

    return(
        <div>         
            <table className="table" style={{marginTop:"1.5rem"}}>
                <thead className="tablecolor">
                    <tr>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Exchange</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {/* {console.log(post.rows)}; */}
                    {post.map((x,idx)=>(
                        <tr key={idx} className="tablemargin">
                            <td>{x.id}</td>
                            <td>{x.price}</td>
                            <td>{x.exc}</td>
                            <td style={{width:"316px"}}>

                            <button type="button" className="btn btn-outline-success mari" onClick={()=>{
                                setClick(true);
                                setText("Buy")
                                setExchange(x.exc)
                                setPrice(x.price)
                                setTimeout(setPrice(x.price),1);
                    // console.log(x.price);
                            }}> Buy</button>
                            <button type="button" className="btn btn-outline-danger mari" onClick={()=>{
                                setClick(true);
                                setText("Sell")
                                setExchange(x.exc)
                                setPrice(x.price)
                                func(x.price);
                            }}>Sell</button>
                            </td>
                        {/* {console.log(x.price)} */}
                        </tr>
                    ))}
                </tbody>
            </table>
           {/* { console.log(x.price)} */}
            {click===true && text.length>0? <Trade action={text} coin={props.id} exchange={exchage} price={pp}/>:null}
        </div>
    )
}

function reload(){
    window.location.reload(true);
}

// setTimeout(reload,5000);

export default DataFetch;
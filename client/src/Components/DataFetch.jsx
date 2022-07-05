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
    // function data_getter(){
        axios.get(`/${props.id}`)
        .then(res=>{
            // console.log(res);
            setPost(res.data.rows);
        })
        .catch(err=>{
            console.log(err);
        })
    // }

    },[])


// helping to update data 
    async function data_getter(){
        await axios.get(`/${props.id}`)
        .then(res=>{
            // console.log(res);
            setPost(res.data.rows);
        })
        .catch(err=>{
            console.log(err);
        })

    }
    setTimeout(data_getter,5000);
    
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
                                 // console.log(x.price);
                            }}> Buy</button>
                            <button type="button" className="btn btn-outline-danger mari" onClick={()=>{
                                setClick(true);
                                setText("Sell")
                                setExchange(x.exc)
                                setPrice(x.price)
                                // func(x.price);
                                // setTimeout(setPrice(x.price),1000);
                            }}>Sell</button>
                            </td>
                        {/* {console.log(x.price)} */}
                        </tr>
                    ))}
                </tbody>
            </table>
           {/* { console.log(price)} */}
            {click===true && text.length>0? <Trade action={text} coin={props.id} exchange={exchage} price={price}/>:null}
        </div>
    )
}

function reload(){
    window.location.reload(true);
}

// setTimeout(reload,5000);

export default DataFetch;
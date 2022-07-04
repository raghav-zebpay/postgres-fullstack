import React, { useEffect } from "react";
import axios from "axios";


function DataFetch(props){
    const[post,setPost]=React.useState([]);


    const url=`./${props.id}.json`;

    console.log(`${url}`)



   useEffect(()=>{
        // axios.get(`"${url}"`)
        axios.get("./btc.json")
        .then(res=>{
            console.log(res);
            setPost(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return(
        <div>         
            <table>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Exchange</th>
                    </tr>
                </thead>
                <tbody>
                    {post.map(x=>(
                        <tr>
                            <td>{x.id}</td>
                            <td>{x.price}</td>
                            <td>{x.exc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataFetch;
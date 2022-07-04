import React from "react";
import { useNavigate,NavLink } from "react-router-dom";




function Header(){

    // const navigate=useNavigate();

    return(
        <header>
            <h1>Crypto Exchage Dashboard</h1>
            {/* <button><NavLink to ="/">Logout</NavLink></button>
             */}
        </header>
    )
}
export default Header
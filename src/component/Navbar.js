import React from "react";
import { Link } from "react-router-dom";
import '../navbar.css';

export default function Navbar(){
    return(
        <div>
            <header>
                <h2 class="logo">ร้านขายของออน์ไลน์</h2>
                <nav>
                    <Link to="/login" class="btnLogin">Login</Link>
                </nav>
            </header>
        </div>    
    )
}

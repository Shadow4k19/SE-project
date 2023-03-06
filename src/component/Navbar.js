import React from "react";
import '../navbar.css';

export default function Navbar(){
    return(
        <div>
            <header>
                <h2 class="logo">Logo</h2>
                <nav>
                    <button class="btnLogin">Login</button>
                </nav>
            </header>
        </div>    
    )
}
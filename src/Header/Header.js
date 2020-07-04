import React from 'react';
import {
    BrowserRouter as Router,
  } from "react-router-dom";

function Header(props) {
    return ( 
    <div>    
    <h1>Rancid Tomatillos</h1>
      {props.userInfo.name ? 
      <h2>Welcome, {props.userInfo.name}!</h2> : 
      null}
      <Router>
         <nav>
           <ul>
             {!props.userInfo.id ? 
             <li><a href="/login">Login</a></li> : 
             <li><a href="/">Logout</a></li>}
           </ul>
         </nav>
         </Router>
    </div>
    )
}

export default Header;
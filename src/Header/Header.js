import React from 'react';
import './Header.css';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Header(props) {

  return ( 
    <div className='header'>    
    <h1 className='header-title'>Rancid Tomatillos</h1>
      {props.userInfo.name ? 
      <h2 className='welcome-message'>Welcome, {props.userInfo.name}!</h2> : 
      null}
      <Router>
         <nav>
           <ul className='header-list'>
             {!props.userInfo.id ? 
             <li><a className='login-link' href="/login">Login</a></li> : 
             <>
             <Link className='login-link' to='/favorites'>Favorites</Link>
             <a className='login-link' href="/">Logout</a>
             </>
             }
           </ul>
         </nav>
        </Router>
    </div>
  )
}

export default Header;
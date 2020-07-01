import React from 'react';

function Header(props) {
    return (
        <div className='header' data-testid='header'>
            <h1>Rotten Tomatillos</h1>
            <button onClick={props.handleClick}>Log In</button>
        </div>
    )
}

export default Header;
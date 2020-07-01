import React from 'react';
import { Redirect, Router } from 'react-router-dom'
class Header extends React.Component {
    constructor() {
        super()
        

    }

    displayLogin = (event) => {
        event.preventDefault()
        return <Redirect to='/login' />
        // console.log('house')
    }


render = () => {
    return (
        <div className='header' data-testid='header'>
            <h1>Rotten Tomatillos</h1>
        </div>
    )
    }
}

export default Header;
import React from 'react';


function LoginForm(props) {
    return (
        <section className= 'login'>
            <input className= 'form-input' placeholder= 'email'></input>
            <input className= 'form-input' placeholder= 'password'></input>
            <button className= 'enter' onClick= {props.handleClick}>Log In</button>
        </section>
    )
}

export default LoginForm;
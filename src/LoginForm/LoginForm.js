import React from 'react';
import {
    BrowserRouter as Router,
    NavLink
  } from "react-router-dom";


class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit = (event) => {
        this.props.handleSubmit(this.state);
        this.clearInputs();
    }

    clearInputs = () => {
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        return (
            <form className= 'login'>
                <input 
                    type= 'text' 
                    name= 'email' 
                    className= 'form-input' 
                    placeholder= 'email' 
                    onChange={this.handleChange}
                    value= {this.state.email}>
                </input>
                <input 
                    type= 'password' 
                    name= 'password' 
                    className= 'form-input' 
                    placeholder= 'password' 
                    onChange={this.handleChange}
                    value= {this.state.password}>
                </input>
                <NavLink to='/home'>
                    <button className= 'enter' onClick={this.submit}>Log In</button>
                </NavLink>
            </form>
        )
    }
}

export default LoginForm;
import React from 'react';


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
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <form className= 'login' onSubmit= {this.submit}>
                <input type= 'text' name= 'email' className= 'form-input' placeholder= 'email' onChange={this.handleChange}></input>
                <input type= 'password' name= 'password' className= 'form-input' placeholder= 'password' onChange={this.handleChange}></input>
                <button className= 'enter'>Log In</button>
            </form>
        )
    }
}

export default LoginForm;
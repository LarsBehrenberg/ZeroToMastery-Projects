import React from 'react';
import './signin.css';

class Signin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            signInEmail: "",
            signInPassword: ""
        } 
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch("http://localhost:4000/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": this.state.signInEmail,
                "password": this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data == "success"){
                this.props.onRouteChange('home')
            }
        })
    }

    render(){
        const { onRouteChange } = this.props 
        return (
            <div className='signin-container'>
                <div className="login-page">
                    <div className="form">
                        <div className="login-form">
                            <h1>Login</h1>
                            <input type="text" placeholder="email" onChange={this.onEmailChange}/>
                            <input type="password" placeholder="password" onChange={this.onPasswordChange}/>
                            <button onClick={this.onSubmitSignIn}>login</button>
                            <p className="message" onClick={() => onRouteChange('register')}>Not registered? <a>Create an account</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default Signin
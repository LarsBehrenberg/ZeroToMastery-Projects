import React from 'react';
import '../Signin/signin.css'

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    } 

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch("http://localhost:4000/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "name": this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <div className='signin-container'>
                <div className="login-page">
                    <div className="form">
                        <div className="register-form">
                            <h1>Register now</h1>
                            <input type="text" placeholder="name" onChange={this.onNameChange}/>
                            <input type="text" placeholder="email address" onChange={this.onEmailChange}/>
                            <input type="password" placeholder="password" onChange={this.onPasswordChange}/>
                            <button onClick={this.onSubmitSignIn}>create</button>
                            <p className="message" onClick={() => onRouteChange('signin')}>Already registered? <a>Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
import React from 'react';
import '../Signin/signin.css'

const Register = ({ onRouteChange }) => {
    return (
        <div className='signin-container'>
            <div className="login-page">
                <div className="form">
                    <div className="register-form">
                        <h1>Register now</h1>
                        <input type="text" placeholder="name"/>
                        <input type="text" placeholder="email address"/>
                        <input type="password" placeholder="password"/>
                        <button onClick={() => onRouteChange('signin')}>create</button>
                        <p className="message" onClick={() => onRouteChange('signin')}>Already registered? <a>Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
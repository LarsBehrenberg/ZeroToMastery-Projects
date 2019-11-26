import React from 'react';
import './signin.css';

const Signin = ({ onRouteChange }) => {
    return (
        <div className='signin-container'>
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                        <h1>Login</h1>
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button onClick={() => onRouteChange('home')}>login</button>
                        <p className="message" onClick={() => onRouteChange('register')}>Not registered? <a>Create an account</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
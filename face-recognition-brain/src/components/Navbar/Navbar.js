import React from 'react'

const Navbar = ({ isSignedIn, onRouteChange }) => {

    return (
        <nav>
            {isSignedIn === false ? <div></div> : <p onClick={() => onRouteChange('signin')}>Sign out</p>}
        </nav>
    )
}

export default Navbar
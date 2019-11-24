import React from 'react'
import brain from './brain.png';

const Logo = () => {
    return (
        <div>
            <img src={brain} alt='brain logo' style={{width: '64px', paddingTop: '20px'}}/>
        </div>
    )
}

export default Logo
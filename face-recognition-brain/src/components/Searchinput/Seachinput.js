import React from 'react'

const Searchinput = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <h3 style={{textAlign: 'center'}}>This is a Face detecting app</h3>
            <div className='input-container'>
                <input type='text' placeholder='Enter your link here' onChange={onInputChange}/>
                <button onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default Searchinput
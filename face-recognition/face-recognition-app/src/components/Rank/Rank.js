import React from 'react'

const Rank = ({ name, entries}) => {
    return (
        <div style={{textAlign: "center"}}>
            <h4>{name} Your current number of entries is:</h4>
            <h3>{entries}</h3>
        </div>
    )
}

export default Rank
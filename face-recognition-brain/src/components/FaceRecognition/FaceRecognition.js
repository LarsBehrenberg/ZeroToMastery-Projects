import React from 'react';
import './face-recognition.css';

const FaceRecognition = ({ imgSrc }) => {
    return (
        <div className='img-container'>
            <img src={imgSrc} />
        </div>
    )
}

export default FaceRecognition;
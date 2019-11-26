import React from 'react';
import './face-recognition.css';

const FaceRecognition = ({ imgSrc }) => {
    return (
        <div className='img-container' id="img-container">
                <img id='face-image' src={imgSrc} alt=''/>
        </div>
    )
}

export default FaceRecognition;
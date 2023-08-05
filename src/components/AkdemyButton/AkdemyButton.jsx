import React from 'react';
import './AkdemyButton.css';

//CREATE COMPONENT AKDEMY BUTTON
export const AkdemyButton = ({ onClick, children, text }) => {
    return (
        <div className='borderAkdemy'>
        <button className="akdemyButton"  onClick={onClick}>
            {children} {text}
        </button>
        </div>
    );
};

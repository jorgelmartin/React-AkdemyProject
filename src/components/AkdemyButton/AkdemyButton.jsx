import React from 'react';
import './AkdemyButton.css';

//CREATE COMPONENT AKDEMY BUTTON
export const AkdemyButton = ({ onClick, children, text }) => {
    return (
        <button className="AkdemyButton"  onClick={onClick}>
            {children} {text}
        </button>
    );
};

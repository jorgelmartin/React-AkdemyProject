import React from 'react';
import './AkdemyButton.css';

export const AkdemyButton = ({ onClick, children, text }) => {
    return (
        <button className="AkdemyButton"  onClick={onClick}>
            {children} {text}
        </button>
    );
};

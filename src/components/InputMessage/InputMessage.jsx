import React from 'react';
import './InputMessage.css';

export const InputMessage = ({ type, placeholder, name, state, onClick, children, text }) => {

    //INPUTHANDLER FUNCTION
    const inputHandler = ({ target }) => {
        // Bring the name and the value from the element that started the event
        const { name, value } = target;
        // Update the state of the component
        state((prevState) => ({
            // Make a copy from the last stage
            ...prevState,
            // Set the new state
            [name]: value,
        }));
    };

    return (
        // RENDER THE INPUT
        <div className="InputMessageContainer">
            <input
                type={type}
                className="InputMessage"
                placeholder={placeholder}
                name={name}
                onChange={(e) => inputHandler(e, state)}
            />
            <button
            className='inputMessageButton'
                onClick={onClick}
            >
                {children} {text}
            </button>
            </div>
    )
}


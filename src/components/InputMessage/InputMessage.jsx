import React from 'react';
import './InputMessage.css';

export const InputMessage = ({ type, placeholder, name, state, onSubmit, children, text }) => {

    //INPUTHANDLER FUNCTION
    const inputHandler = ({ target }, state) => {
        //BRING THE NAME AND THE VALUE FROM THE ELEMENT THAT START THE EVENT
        const { name, value } = target;
        //UPDATE THE STAGE OF THE COMPONENT
        state((prevState) => ({
            //MAKE A COPY FROM THE LAST STAGE
            ...prevState,
            //SET THE NEW STATE
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e); // CALL THE onSubmit FUNCTION PASSED AS PROP
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
            <button onClick={handleSubmit}>
                {children} {text}
            </button>
            </div>
    )
}


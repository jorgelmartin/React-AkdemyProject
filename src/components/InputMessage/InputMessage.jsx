
import { inputHandler } from '../../services/useful';
import './InputMessage.css';

export const InputMessage = ({ type, placeholder, name, state, onClick, text }) => {

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
                {text}
            </button>
            </div>
    )
}


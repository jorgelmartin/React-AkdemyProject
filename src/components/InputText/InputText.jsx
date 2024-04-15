import './InputText.css';
import { inputCheck, inputHandler } from '../../services/useful';
import { Form } from 'react-bootstrap';

export const InputText = ({ type, design, placeholder, name, state, errorState, autoCompleteValue  }) => {

    //GETTING INPUT CLASS NORMAL AND ERROR
    const getInputClass = () => {
        let inputClass = 'normalInput';
        if (design === 'errorInput') {
            inputClass += ' errorInput';
        }
        return inputClass;
    };

    return (
        // RENDER THE INPUT TEXT
        <>
            <Form.Control
                id={name}
                name={name}
                type={type}
                className={getInputClass()}
                placeholder={placeholder}
                onChange={(e) => inputHandler(e, state)}
                onBlur={(e) => inputCheck(e, errorState)}
                autoComplete={autoCompleteValue}
            />
        </>
    )
}
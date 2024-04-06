import './InputText.css';
import { checkError } from '../../services/useful';
import { Form } from 'react-bootstrap';

export const InputText = ({ type, design, placeholder, name, state, errorState, autoCompleteValue  }) => {

    //INPUTHANDLER FUNCTION
    const inputHandler = ({ target }, state) => {
        //BRING THE NAME AND THE VALUE FROM THE ELEMENT THAT START THE EVENT
        const { name, value } = target;
        //UPDATE THE STAGE OF THE COMPONENT
        state((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //CHECKERROR FUNCTION
    const inputCheck = ({ target }, state) => {
        let { name, value } = target;
        let errorMessage = checkError(name, value)
        state(prevState => ({
            ...prevState,
            [name + "Error"]: errorMessage
        }))
    }

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
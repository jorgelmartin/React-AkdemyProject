

//INPUTHANDLER FUNCTION
export const inputHandler = ({ target }, state) => {
    //BRING THE NAME AND THE VALUE FROM THE ELEMENT THAT START THE EVENT
    const { name, value } = target;
    //UPDATE THE STAGE OF THE COMPONENT
    state((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

 //CHECKERROR/INPUTCHECK FUNCTION
 export const inputCheck = ({ target }, state) => {
    let { name, value } = target;
    let errorMessage = checkError(name, value)
    state(prevState => ({
        ...prevState,
        [name + "Error"]: errorMessage
    }))
}

//CHECKERROR
export const checkError = (name, value) => {
    switch (name) {

        //CHECKING EMAIL ERROR
        case "email":
        case "e-mail":
        case "correo":
            if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "El e-mail es incorrecto";
            }
            if (value.length > 50) {
                return "El e-mail no puede tener más de 50 caracteres";
            }
            return "";

        //CHECKING PASSWORD ERROR
        case "password":
        case "contraseña":
            if (value.length < 8) {
                return "El password debe de tener 8 caracteres";
            }
            if (!/[A-Z]/.test(value)) {
                return "El password debe contener al menos una letra mayúscula";
            }
            // if (!/\d/.test(value)) {
            //     return "El password debe contener al menos un número";
            // }
            return "";

        //CHECKING NAME ERROR
        case "name":
            if (!/^[a-zA-Z ]+$/.test(value)) {
                return "El nombre debe contener solo letras";
            }
            if (value.length > 40) {
                return "El nombre no pueden tener más de 40 caracteres";
            }
            return "";

        //CHECKING SURNAME ERROR
        case "surname":
            if (!/^[a-zA-Z ]+$/.test(value)) {
                return "El apellido debe contener solo letras";
            }
            if (value.length > 40) {
                return "El apellido no puede tener más de 40 caracteres";
            }
            return "";

        default:
            console.log("Unknown format");
    }
    return "";
}
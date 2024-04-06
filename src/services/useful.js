

//INPUTHANDLER
export const inputHandler = ({ target }, state) => {
    let { name, value } = target;
    state((prevState) => {
        return {
            ...prevState,
            [name]: value,
        };
    });
};

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
            if (value.length < 6) {
                return "El password debe de tener 6 caracteres";
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
            if (!/^[a-zA-Z]+$/.test(value)) {
                return "El nombre debe contener solo letras";
            }
            if (value.length > 40) {
                return "El nombre no pueden tener más de 30 caracteres";
            }
            return "";

        //CHECKING SURNAME ERROR
        case "surname":
            if (!/^[a-zA-Z]+$/.test(value)) {
                return "El apellido debe contener solo letras";
            }
            if (value.length > 40) {
                return "El apellido no puede tener más de 30 caracteres";
            }
            return "";

        default:
            console.log("Unknown format");
    }
    return null;
}
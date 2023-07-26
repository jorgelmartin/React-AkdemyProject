export const inputHandler = ({ target }, state) => {
    let { name, value } = target;

    state((prevState) => {
        return {
            ...prevState,
            [name]: value,
        };
    });
};

// export const inputCheck = ({ target }, state) => {
//     let { name, value } = target
//     let errorMessage = checkError(name, value)

//     state(prevState => ({
//         ...prevState,
//         [name + "Error"]: errorMessage
//     }))
// };

export const checkError = (name, value) => {
    switch (name) {
        case "email":
        case "e-mail":
        case "correo":
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "El e-mail es incorrecto";
            }
            return "";
        case "password":
        case "contraseña":
            if (value.length < 6) {
                return "El password debe de tener 6 caracteres minimo";
            }
            return "";
        case "name":
            break;
        default:
            console.log("Unknown format");
    }
    return null;
}
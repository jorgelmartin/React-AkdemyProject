import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchAcceptRequest = () => {
    // Puedes utilizar useState para guardar la respuesta de la API
    const [userRequest, setUserRequest] = useState(null);
    const datosCredencialesRedux = useSelector(userData);

    // Esta es la función que realizará la solicitud para aceptar la solicitud del usuario
    const acceptUserRequest = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/userConvo/accept/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
                },
            });

            if (!response.ok) {
                // Maneja los errores de respuesta aquí si es necesario
                throw new Error("Error al aceptar la solicitud");
            }

            const data = await response.json();
            // Actualiza el estado con la respuesta de la API
            setUserRequest(data);

            // Devuelve la respuesta si es necesaria para el componente que utiliza el gancho
            return data;
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            throw error;
        }
    };

    // Retorna la función acceptUserRequest para que el componente que use este gancho pueda acceder a ella
    return acceptUserRequest;
};



// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { userData } from "../src/containers/userSlice";

// export const useFetchAcceptRequest = (id) => {
//     const [userRequest, setUserRequest] = useState({});
//     const datosCredencialesRedux = useSelector(userData);
//     useEffect(() => {
//         let config = {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
//             },
//         }
//         fetch(`http://localhost:8000/api/userConvo/accept/${id}`, config)
//             .then(res => res.json())
//             .then(res => {
//                 setUserRequest(res);
//                 // console.log("Response from APIIII:", res.data);
//             })
//             .catch(error => console.log("Error fetching convocations:", error))
//     }, [id]);
//     return userRequest;
// };
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchRequestAccepted = (userId) => {
    const [usersRequest, setUsersRequest] = useState(null);
    const datosCredencialesRedux = useSelector(userData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
            },
        };

        fetch(`http://localhost:8000/api/userConvo/getAccepted/${userId}`, config) // Agrega una barra antes de userId
            .then(res => res.json())
            .then(res => {
                setUsersRequest(res);
                console.log("Response from APIIII:", res.data);
                setIsLoading(false); // Asegúrate de establecer isLoading a false cuando se complete la solicitud
            })
            .catch(error => {
                setIsLoading(false);
                console.log("Error fetching request:", error);
                // Puedes mostrar un mensaje de error en la interfaz de usuario si lo deseas.
            });
    }, [userId, datosCredencialesRedux.credentials?.token]);

    return usersRequest;
};
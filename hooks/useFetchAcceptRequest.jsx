import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchAcceptRequest = () => {
    const [usersRequest, setUsersRequest] = useState(null);
    const datosCredencialesRedux = useSelector(userData);

    // THIS FUNCTION ACCEPT USER REQUEST
    const acceptUserRequest = async (id) => {
        try {
            const response = await fetch(`https://laravel-akdemyproject-production.up.railway.app/api/userConvo/accept/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
                },
            });
            if (!response.ok) {
                console.error("Error al aceptar la solicitud:", error);
            }
            const data = await response.json();
            setUsersRequest(data);
            return data;
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            throw error;
        }
    };
    return acceptUserRequest;
};
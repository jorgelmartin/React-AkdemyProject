import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchAcceptRequest = () => {
    const [usersRequest, setUsersRequest] = useState('');
    const token = useSelector((state) => state.user.credentials.token);

    // THIS FUNCTION ACCEPT USER REQUEST
    const acceptUserRequest = async (id) => {
        try {
            const response = await fetch(`https://laravel-akdemyproject-production.up.railway.app/api/userConvo/accept/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
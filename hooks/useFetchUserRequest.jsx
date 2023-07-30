import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchUserRequest = () => {
    const [usersRequest, setUsersRequest] = useState(null);
    const datosCredencialesRedux = useSelector(userData);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
            },
        }
        fetch('http://localhost:8000/api/userConvo/getPending', config)
            .then(res => res.json())
            .then(res => {
                setUsersRequest(res);
                // console.log("Response from APIIII:", res.data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log("Error fetching request:", error);
                // Puedes mostrar un mensaje de error en la interfaz de usuario si lo deseas.
            });
    }, []);
    return usersRequest;
};
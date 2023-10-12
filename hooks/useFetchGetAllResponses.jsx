import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchGetAllResponses = (messageId) => {
    const token = useSelector((state) => state.user.credentials.token);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        // Verifica que tengas un messageId válido antes de hacer la solicitud
        if (!messageId) {
            return;
        }

        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`https://laravel-akdemyproject-production.up.railway.app/api/message/${messageId}/responses`, config)
            .then((res) => res.json())
            .then((res) => setResponses(res.data))
            .catch((error) => console.log(error));
    }, [messageId]);

    return responses;
};
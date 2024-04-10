import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//GET THE REQUEST ACCEPTED
export const useFetchRequestAccepted = (userId) => {
    const [usersRequest, setUsersRequest] = useState('');
    const token = useSelector((state) => state.user.credentials.token);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getAccepted/${userId}`, config)
            .then(res => res.json())
            .then(res => {
                setUsersRequest(res);
            })
            .catch(error => {
                console.log("Error fetching request:", error);
            });
    }, [userId]);

    return usersRequest;
};
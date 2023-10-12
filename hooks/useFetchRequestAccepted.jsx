import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

//GET THE REQUEST ACCEPTED
export const useFetchRequestAccepted = (userId) => {
    const [usersRequest, setUsersRequest] = useState(null);
    const datosCredencialesRedux = useSelector(userData);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${datosCredencialesRedux?.credentials?.token}`,
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
    }, [userId, datosCredencialesRedux?.credentials?.token]);

    return usersRequest;
};
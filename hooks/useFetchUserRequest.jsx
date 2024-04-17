import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//GET USER REQUEST FROM THE API
export const useFetchUserRequest = () => {
    const token = useSelector((state) => state.user.credentials.token);
    const [usersReq, setUsersReq] = useState(null);

    useEffect(() => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getPending', config)
                .then(res => res.json())
                .then(data => {
                    setUsersReq(data);
                })
                .catch(error => {
                    console.error("Error fetching request:", error);
                });
    }, []);

    return usersReq;
};
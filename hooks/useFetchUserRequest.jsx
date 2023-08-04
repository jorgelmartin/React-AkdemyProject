import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

//GET USER REQUEST FROM THE API
export const useFetchUserRequest = () => {
    const datosCredencialesRedux = useSelector(userData);
    const [usersReq, setUsersReq] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
                    },
                };
                const response = await fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getPending', config);
                const data = await response.json();
                setUsersReq(data); 
            } catch (error) {
                console.error("Error fetching request:", error);
            }
        };

        fetchData();
    }, [datosCredencialesRedux.credentials?.token]); 

    return usersReq;
};
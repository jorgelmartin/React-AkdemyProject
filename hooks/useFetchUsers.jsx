import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

//GET ALL USERS FROM THE API
export const useFetchUsers = () => {
    const [users, setUsers] = useState(null);
    const datosCredencialesRedux = useSelector(userData);
    useEffect(() => {
            let config = {
                headers: {
                    Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
                },
            };
        fetch('https://laravel-akdemyproject-production.up.railway.app/api/user/getAll', config)
            .then(res => res.json())
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => console.log("Error fetching users:", error))
    }, []);
    return users;
};
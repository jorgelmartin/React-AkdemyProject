import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//GET ALL USERS FROM THE API
export const useFetchUsers = () => {
    const [users, setUsers] = useState('');
    const token = useSelector((state) => state.user.credentials.token);
    useEffect(() => {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
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
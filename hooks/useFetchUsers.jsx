import { useEffect, useState } from "react";

//GET ALL USERS
export const useFetchUsers = () => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/user/getAll')
            .then(res => res.json())
            .then(res => {
                console.log("Response from API:", res);
                setUsers(res.data);
            })
            .catch(error => console.log("Error fetching users:", error))
    }, []);
    return users;
};
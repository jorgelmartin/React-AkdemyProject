import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchInscriptions = () => {
    const token = useSelector((state) => state.user.credentials.token);
    const [studentAccepted, setStudentAccepted] = useState({});

    const fetchInscriptions = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getAllInscriptions', config)
            .then(res => res.json())
            .then((data) => {
                setStudentAccepted(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchInscriptions();
    }, [token]);

    return studentAccepted;
};
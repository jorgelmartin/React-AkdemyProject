import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchInscriptions = () => {
    const datosCredencialesRedux = useSelector(userData);
    const [studentAccepted, setStudentAccepted] = useState({});

    const fetchInscriptions = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
            },
        };

        fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getAllInscriptions', config)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setStudentAccepted(data);
            })
            .catch((error) => {
                console.error("Error fetching request:", error);
            });
    };

    useEffect(() => {
        fetchInscriptions();
    }, [datosCredencialesRedux.credentials?.token]);

    return studentAccepted;
};
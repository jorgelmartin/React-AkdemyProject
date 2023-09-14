import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export function useFetchInscriptions() {
    const datosCredencialesRedux = useSelector(userData);
    const [studentAccepted, setStudentAccepted] = useState({});

    useEffect(() => {
        async function fetchInscriptions() {
            try {
                let config = {
                    headers: {
                        Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
                    },
                };

                const response = await fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getAllInscriptions', config);

                if (!response.ok) {
                    throw new Error("Error al obtener las inscripciones");
                }

                const inscriptionsData = await response.json();
                setStudentAccepted(inscriptionsData);
            } catch (error) {
                console.error("Error al obtener las inscripciones:", error);
            }
        }

        fetchInscriptions();
    }, [datosCredencialesRedux.credentials?.token]);

    return studentAccepted;
}
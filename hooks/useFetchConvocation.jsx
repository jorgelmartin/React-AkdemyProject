import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";

export const useFetchConvocations = () => {
    const [convocations, setConvocations] = useState(null);
    const datosCredencialesRedux = useSelector(userData);
    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
            },
        }
        fetch('https://laravel-akdemyproject-production.up.railway.app/api/convocation/getAll', config)
            .then(res => res.json())
            .then(res => {
                setConvocations(res.data);
                console.log("Response from API:", res);
            })
            .catch(error => console.log("Error fetching convocations:", error))
    }, []);

    return convocations;
};
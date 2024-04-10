import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//GET THE CONVOCATIONS
export const useFetchConvocations = () => {
    const [convocations, setConvocations] = useState('');
    const token = useSelector((state) => state.user.credentials.token);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        fetch('https://laravel-akdemyproject-production.up.railway.app/api/convocation/getAll', config)
            .then(res => res.json())
            .then(res => {
                setConvocations(res.data);
            })
            .catch(error => console.log("Error fetching convocations:", error))
    }, []);

    return convocations;
};
import { useEffect, useState } from "react";

//GETTING SERVICES/PRODUCTS FROM THE API
export const useFetchPrograms = () => {
    const [programs, setPrograms] = useState([]);
    useEffect(() => {
        fetch('https://laravel-akdemyproject-production.up.railway.app/api/program/getAll')
            .then(res => res.json())
            .then(res => setPrograms(res.data))
            .catch(error => console.log(error))
    }, [])
    return programs;
}
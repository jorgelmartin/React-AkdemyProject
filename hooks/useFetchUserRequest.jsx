import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../src/containers/userSlice";




// useFetchUserRequest.js
export const useFetchUserRequest = () => {
    const datosCredencialesRedux = useSelector(userData);
    const [usersReq, setUsersReq] = useState(null); // Initialize the state with null

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
                setUsersReq(data); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching request:", error);
                // You can handle the error if needed.
            }
        };

        fetchData();
    }, [datosCredencialesRedux.credentials?.token]); // Include the token in the dependency array

    return usersReq;
};

// export const useFetchUserRequest = () => {
//     const [usersRequest, setUsersRequest] = useState(null);
//     const datosCredencialesRedux = useSelector(userData);
//     const [isLoading, setIsLoading] = useState(true);
//     useEffect(() => {
//         let config = {
//             headers: {
//                 Authorization: `Bearer ${datosCredencialesRedux.credentials?.token}`,
//             },
//         }
//         fetch('https://laravel-akdemyproject-production.up.railway.app/api/userConvo/getPending', config)
//             .then(res => res.json())
//             .then(res => {
//                 setUsersRequest(res);
//                 // console.log("Response from APIIII:", res.data);
//             })
//             .catch(error => {
//                 setIsLoading(false);
//                 console.log("Error fetching request:", error);
//                 // Puedes mostrar un mensaje de error en la interfaz de usuario si lo deseas.
//             });
//     }, []);
//     return usersRequest;
// };
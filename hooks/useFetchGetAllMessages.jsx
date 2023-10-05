import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//GETTING MESSAGES FROM THE API
export const useFetchGetAllMessages = () => {
    const token = useSelector((state) => state.user.credentials.token);

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch('https://laravel-akdemyproject-production.up.railway.app/api/message/getAll', config)
            .then(res => res.json())
            .then(res => setMessages(res.data))
            .catch(error => console.log(error))
    }, [])
    return messages;
    console.log(messages);
}
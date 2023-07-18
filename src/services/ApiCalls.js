import axios from 'axios';

const URL = "http://localhost:8000";

//LOGIN 
export const loginMe = async (credentials) => {
    return await axios.post(`${URL}/api/login`, credentials);
    return res.data
}

//REGISTER
export const registerMe = async (credentials) => {
    let res = await axios.post(`${URL}/api/register`, credentials);
    return res.data;
}

//GET PROFILE
export const getProfile = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.get(`${URL}/api/profile`, config);
    return res.data;
};

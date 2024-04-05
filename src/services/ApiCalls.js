import axios from 'axios';

const URL = "https://laravel-akdemyproject-production.up.railway.app";

//LOGIN 
export const loginMe = async (credentials) => {
    let res = await axios.post(`${URL}/api/login`, credentials);
    return res.data;
}

//REGISTER
export const registerMe = async (credentials) => {
    return await axios.post(`${URL}/api/register`, credentials);
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

//UPDATE PROFILE
export const updateProfile = async (body, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.put(`${URL}/api/user/update`, body, config);
    return res.data;
};

//DELETE PROFILE
export const deleteProfile = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.delete(`${URL}/api/user/delete`, config);
    return res.data;
};

//CREATE CONVOCATION
export const createConvocation = async (body, token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };
    let res = await axios.post(`${URL}/api/convocation/create`, body, config)
    return res.data;

}

//UPDATE CONVOCATION
export const updateConvocation = async (token, id, bodyApp) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/api/convocation/update/${id}`, bodyApp, config);
    return res;
}

//CREATE USER-CONVOCATION
export const createUserConvocation = async (body, token) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    let res = await axios.post(`${URL}/api/userConvo/create`, body, config);
    return res;
}

//CREATE USER-CONVOCATION
export const createMessage = async (body, token) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    let res = await axios.post(`${URL}/api/message/create`, body, config);
    return res.data.data;

}

//CREATE REPLY TO COMMENT
export const createReply = async (commentId, body, token) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    let res = await axios.post(`${URL}/api/message/${commentId}/reply`, body, config);
    return res;
}

export const deleteMessage = async (messageId, token) => {

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const res = await axios.delete(`${URL}/api/message/delete/${messageId}`, config);

    return res.data;

};
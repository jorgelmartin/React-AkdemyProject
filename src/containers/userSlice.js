import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        credentials: {
            token: "",
        },
        data: {
            name: "",
            role: "",
            userId: ""
        },
    },
    reducers: {
        login: (state, action) => {
            let { payload } = action;
            (state.credentials = {
                token: payload.token,
            }),
                (state.data = {
                    name: payload.name,
                    role: payload.role,
                    userId: payload.userId
                });
        },
        logout: (state) => {
            return {
                ...state,
                credentials: {
                    token: "",
                },
                data: {
                    name: "",
                    role: "",
                },
            }
        }

    }

});

//exporto las ACCIONES.....
export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
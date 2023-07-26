import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { Users } from "../Users/Users";
import { Convocation } from "../Convocation/Convocation";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";


export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<CreateConvocation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/admin" element={<Admin />} /> 
                <Route path="/users" element={<Users />} /> 
                <Route path="/convocation" element={<Convocation />} /> 
                <Route path="/createConvocation" element={<CreateConvocation />} /> 
            </Routes>
        </>
    );
};
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { Home } from "../Home/Home";
import { Login } from "../Login/Login";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
               {/*  <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} /> */}
            </Routes>
        </>
    );
};
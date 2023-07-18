import React, { useEffect } from 'react';
import "./Header.css";
// import { useSelector, useDispatch } from "react-redux";
// import { userData, logout } from "../../pages/userSlice";
// import { useNavigate } from 'react-router-dom';

export const Header = () => {

    //GETTING CREDENTIALS FROM REDUX
    // const datosCredencialesRedux = useSelector(userData);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    
    //
    // useEffect(() => {
    //     if (!datosCredencialesRedux.credentials?.token) {
    //         navigate("/login");
    //     }
    // }, []);
    //LOGOUT
    // const handleLogout = () => {
    //     dispatch(logout({ credentials: "" }));
    //     navigate("/home");
    // };



    return (
        <div className='headerDesign'>
            {/* <div className='linksDesign'>
                <div className="headerLink" onClick={() => navigate("/home")}>:(SMILE:)</div>
            </div>
            {datosCredencialesRedux.data ? (
                <div className="linksDesignToken">
                    {datosCredencialesRedux.data.role === 3 ? (
                        <>
                            <div className="headerLink" onClick={() => navigate("/profile")}>Perfil</div>
                            <div className="headerLink" onClick={() => navigate("/appointment")}>Citas</div>
                            <div className="headerLink" onClick={handleLogout}>Salir</div>
                        </>
                    ) : datosCredencialesRedux.data.role === 2 ? (
                        <>
                            <div className="headerLink" onClick={() => navigate("/profile")}>Perfil</div>
                            <div className="headerLink" onClick={() => navigate("/admin")}>Admin</div>
                            <div className="headerLink" onClick={handleLogout}>Salir</div>
                        </>
                    ) : (
                        <>
                            <div className="headerLink" onClick={() => navigate("/login")}>Entrar</div>
                            <div className="headerLink" onClick={() => navigate("/register")}>Regístrate</div>
                        </>
                    )}
                </div>
            ) : (
                <>
                </>
            )} */}
        </div>
    );
};
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../containers/userSlice";
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    //GETTING CREDENTIALS FROM REDUX
    const datosCredencialesRedux = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // LOGOUT
    const handleLogout = () => {
        dispatch(logout({ credentials: "" }));
        navigate("/home");
    };

    return (

         //CREATE COMPONENT HEADER
        <div className='headerDesign'>
            <div className='linksDesign'>
                <div className="headerLink" onClick={() => navigate("/home")}>Akdemy</div>
            </div>

            {/* CHECK IF THERE IS TOKEN TO SHOW ADMIN OR USER WINDOW*/}
            {datosCredencialesRedux.data ? (
                <div className="linksDesignToken">
                    {datosCredencialesRedux.data.role === 2 ? (
                        <>
                            <div className="headerLink" onClick={() => navigate("/profile")}>Perfil</div>
                            <div className="headerLink" onClick={() => navigate("/student")}>Menú</div>
                            <div className="headerLink" onClick={handleLogout}>Salir</div>
                        </>
                    ) : datosCredencialesRedux.data.role === 1 ? (
                        <>
                            <div className="headerLink" onClick={() => navigate("/profile")}>Perfil</div>
                            <div className="headerLink" onClick={() => navigate("/admin")}>Admin</div>
                            <div className="headerLink" onClick={handleLogout}>Salir</div>
                        </>
                    ) : (
                        // IF THERE IS NO TOKEN SHOW THIS
                        <>
                            <div className="headerLink" onClick={() => navigate("/login")}>Entrar</div>
                            <div className="headerLink" onClick={() => navigate("/register")}>Regístrate</div>
                        </>
                    )}
                </div>
            ) : (
                <>
                </>
            )}
        </div>
    );
};
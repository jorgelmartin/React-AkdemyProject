import React from "react";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { useNavigate } from "react-router-dom";
import "./Home.css";

//SHOW PROGRAMS AT HOME PAGE
export const Home = () => {
    const navigate = useNavigate()

    //GET PROGRAMS
    const programs = useFetchPrograms();
    if (!programs) {
        return <div>Cargando...</div>;
    }

    return (

        //HOME PAGE
        <div className="productCardContainer">

            {/* AKDEMY NAME */}
            <div className="akdemyTitle" style={{ textShadow: '0.05em 0.05em 0.06em rgba(0, 0, 0, 0.5)' }}>AKDEMY</div>

            {/* MAPPING PROGRAMS */}
            {programs.slice(0, 6).map((program) => (
                <div key={program.id} className="productCardDesign">
                    <img
                        className="productImgDesign"
                        src={`https://laravel-akdemyproject-production.up.railway.app/${program.image}`}
                        alt={program.name}
                        onClick={() => navigate(`/programDetail/${program.id}`)}
                    />
                    <h1>{program.name}</h1>
                </div>
            ))}
            <div className="centerTitle">
            <div className="akdemyTitle1" 
            style={{ textShadow: '0.06em 0.08em 0.06em rgba(0, 0, 0, 0.5)' }}
            >
                Unlock Your Potential
            </div>
        </div>
        </div>
    );
};
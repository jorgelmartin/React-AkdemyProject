import React from "react";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { useNavigate } from "react-router-dom";
import "./Home.css";

//SHOW PROGRAMS AT HOME PAGE
export const Home = () => {

    const programs = useFetchPrograms();

    if (!programs) {
        return <div>Cargando...</div>;
    }

    const navigate = useNavigate();
    
    console.log("Soy los programas", programs);
    
    return (
        <div className="productCardContainer">
            {programs.map((program) => (
                <div key={program.id} className="productCardDesign">
                    <img
                        className="productImgDesign"
                        src={`http://localhost:8000/${program.image}`}
                        alt={program.name}
                        onClick={() => navigate(`/programDetail/${program.id}`)}
                    />
                    <h1>{program.name}</h1>
                </div>
            ))}
        </div>
    );
};
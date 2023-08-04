import React, { useState } from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { Container, Table } from "react-bootstrap";
import "./../../App.css";
import { InputSearch } from "../../components/InputSearch/InputSearch";

export const Users = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);

    //GET THE USERS
    const users = useFetchUsers();

    //HANDLER SEARCH
    const handleSearch = (text) => {

        //IF THERE IS TEXT
        if (text) {

            //FILTER TEXT IN USERS 
            const filtered = users.filter(
                (user) =>
                    user.name.includes(text) ||
                    user.email.includes(text) ||
                    user.id.toString().includes(text)
            );

            //UPDATE WITH THE FILTERED ARRAY FROM USERS
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    if (!users) {
        return <div>Cargando...</div>;
    }

    //ASSIGN THE VALUE FROM FILTERED USERS, IF THERE IS NOT, SHOW USERS
    const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users;

    return (

        //RENDER USERS
        <Container fluid className="mt-5">

            {/* INPUT SEARCH */}
            <InputSearch onSearch={handleSearch} />

            {/* USERS TITLE */}
            <div className="requestUser">Usuarios</div>
            <div className="tableContainerCheck">
                <div className="tableHeader ">

                    {/* USERS TABLE */}
                    <div className="tableHeaderCheck">Nombre</div>
                    <div className="tableHeaderCheck">Apellidos</div>
                    <div className="tableHeaderCheck">Email</div>
                </div>
                <div className="tableBodyCheck">

                    {/* MAPPING USER DATA */}
                    {displayedUsers.map((user) => (
                        <div className="tableDataRow " key={user.id}>
                            <div className="tableDataCheck">{user.name}</div>
                            <div className="tableDataCheck">{user.surname}</div>
                            <div className="tableDataCheck">{user.email}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
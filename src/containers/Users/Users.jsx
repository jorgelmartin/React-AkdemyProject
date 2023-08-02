import React, { useState } from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { Container, Table } from "react-bootstrap";
import "./../../App.css";
import { InputSearch } from "../../components/InputSearch/InputSearch";



export const Users = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    // Replace 'users' with your actual list of users.
    const users = useFetchUsers();
  
    const handleSearch = (text) => {
      if (text) {
        const filtered = users.filter(
          (user) =>
            user.name.includes(text) ||
            user.email.includes(text) ||
            user.id.toString().includes(text)
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers([]);
      }
    };
  
    if (!users) {
      return <div>Cargando...</div>;
    }
    const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users;
    return (
        <Container fluid className="mt-5">
            <InputSearch onSearch={handleSearch} />
            <div className="requestUser">Usuarios</div>
            <div className="tableContainerCheck">
                <div className="tableHeader ">
                    <div className="tableHeaderCheck">Nombre</div>
                    <div className="tableHeaderCheck">Apellidos</div>
                    <div className="tableHeaderCheck">Email</div>
                    {/* <div className="tableHeaderCheck">Teléfono</div> */}
                </div>
                <div className="tableBodyCheck">
                    {displayedUsers.map((user) => (
                        <div className="tableDataRow " key={user.id}>
                            <div className="tableDataCheck">{user.name}</div>
                            <div className="tableDataCheck">{user.surname}</div>
                            <div className="tableDataCheck">{user.email}</div>
                            {/* <div className="tableDataCheck">{user.phone}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

// import React from "react";
// import { useFetchUsers } from "../../../hooks/useFetchUsers";
// import { Container, Table } from "react-bootstrap";
// import "./../../App.css";
// import { InputSearch } from "../../components/InputSearch/InputSearch";

// const Users = () => {
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     // Replace 'users' with your actual list of users.
//     const users = useFetchUsers();

//     const handleSearch = (text) => {
//         if (text) {
//             const filtered = users.filter(
//                 (user) =>
//                     user.name.includes(text) ||
//                     user.email.includes(text) ||
//                     user.id.toString().includes(text)
//             );
//             setFilteredUsers(filtered);
//         } else {
//             setFilteredUsers([]);
//         }
//     };

//     if (!users) {
//         return <div>Cargando...</div>;
//     }

//     return (
//         <Container fluid className="mt-5">
//             <div>
//                 <InputSearch onSearch={handleSearch} />
//                 {filteredUsers.map((user) => (
//                     <div key={user.id}>
//                         <span>{user.name}</span>
//                         <span>{user.email}</span>
//                     </div>
//                 ))}
//             </div>
//         </Container>
//     );
// };
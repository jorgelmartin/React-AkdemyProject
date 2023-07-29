import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";

export const UserRequest = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);

    if (!usersReq) {
        return <div>Loading...</div>;
    }

    const handleAcceptRequest = (id) => {
        console.log("Valor de id:", id); 
        acceptUserRequest(id)
        
            .then(() => {
                console.log("Solicitud aceptada correctamente");
                setRequestAccepted(true);
            })
            .catch((error) => {
                console.error("Error al aceptar la solicitud:", error);
            });
    };

    return (
        <Container className="mt-4">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Curso</th>
                        <th>Inicio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {usersReq.map((request, index) => (
                        console.log("request.id:", request.id),
                        <tr key={index}>
                            <td>{request.user.name} {request.user.surname}</td>
                            <td>{request.program.name}</td>
                            <td>{request.convocation.beginning}</td>
                            <td>{request.status}</td>
                            {/* Estado */}
                            <Button onClick={() => {
                                handleAcceptRequest(request.id);
                            }}>Aceptar</Button>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};






// import React , { useState } from "react";
// import { Container, Table, Button } from "react-bootstrap";
// import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
// import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
// // import "./Users.css";

// export const UserRequest = () => {
//     const usersReq = useFetchUserRequest();
//     const acceptUserRequest = useFetchAcceptRequest();
//     console.log("aaaaaa", usersReq);
//     const id = usersReq ? usersReq.id : null;
//     if (!usersReq) {
//         return <div>Loading...</div>;
//     }

//     const handleAcceptRequest = (id) => {
//         console.log("Valor de id:", id); 
//         acceptUserRequest(id) // <-- Línea 18, posible origen del error
//             .then(() => {
//                 // Aquí puedes agregar lógica adicional si es necesario
//                 console.log("Solicitud aceptada correctamente");
//             })
//             .catch((error) => {
//                 console.error("Error al aceptar la solicitud:", error);
//             });
//     };

//     return (
//         <Container className="mt-4">
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th>Nombre</th>
//                         <th>Apellidos</th>
//                         <th>Curso</th>
//                         <th>Inicio</th>
//                         <th>Estado</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {usersReq.map((request, index) => (
//                         console.log("request.id:", request.id),
//                         <tr key={index}>
//                             <td>{request.user.name}</td>
//                             <td>{request.user.surname}</td>
//                             <td>{request.program.name}</td>
//                             <td>{request.convocation.beginning}</td>
//                             <td>{request.status}</td>
//                             {/* Estado */}
//                             <Button onClick={() => {
//                                 handleAcceptRequest(request.id);
//                             }}>Aceptar</Button>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };
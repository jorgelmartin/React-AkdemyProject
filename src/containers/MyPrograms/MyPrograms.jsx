import { Container } from "react-bootstrap";
import { useFetchRequestAccepted } from "../../../hooks/useFetchRequestAccepted";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyPrograms = () => {

    //GET USERDATA FROM REDUX
    const datosCredencialesRedux = useSelector(userData);

    //GET THE ID FROM USER
    const userId = datosCredencialesRedux?.data?.userId;

    //GET THE REQUEST ACCEPTED
    const usersReq = useFetchRequestAccepted(userId);
    if (!usersReq) {
        return <div>Loading...</div>;
    }

    return (
        //RENDER MY PROGRAMS CONTAINER
        <Container className="containerData">

            <div className="dataBorder">
                <div className="dataTitle">Mis cursos</div>
            </div>


            {/* TABLE OF USER PROGRAMS */}
            <div className="tableContainerData mt-4">
                <div className="tableDataRow">
                    <div className="tableDataHeader">Nombre</div>
                    <div className="tableDataHeader">Curso</div>
                    <div className="tableDataHeader">Inicio</div>
                </div>

                {/* MAPPING USER PROGRAMS */}
                {usersReq.map((request, i) => (
                    <div className="tableDataRow" key={i}>
                        <div className="tableDataData">{request.user.name} {request.user.surname}</div>
                        <div className="tableDataData">{request.program.name}</div>
                        <div className="tableDataData">{request.convocation.beginning}</div>
                    </div>
                ))}
            </div>

        </Container>
    );
};
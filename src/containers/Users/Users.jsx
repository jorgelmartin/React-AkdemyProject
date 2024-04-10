import { useState } from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { Container } from "react-bootstrap";
import "./../../App.css";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { PageButton } from "../../components/PageButton/PageButton";

export const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const users = useFetchUsers();

  //HANDLER SEARCH
  const handleSearch = (text) => {
    if (text) {
      const searchText = text.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.surname.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.id.toString().toLowerCase().includes(searchText)
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    } else {
      setFilteredUsers(users);
    };
  };

  // CALCULATE START AND END INDEX FOR CURRENT PAGE
  const startIndex = (currentPage - 1) * 7;
  const endIndex = currentPage * 7;

  if (!users) {
    return <div>Cargando...</div>;
  };

  return (
    //RENDER USERS
    <Container className="mt-4">

      {/* USERS TITLE */}
      <div className="requestUser">Usuarios</div>

      {/* INPUT SEARCH */}
      <InputSearch onSearch={handleSearch} />

      <div className="tableContainerCheck mt-4">
        <div className="tableHeader">

          {/* USERS TABLE */}
          <div className="tableHeaderRequest">Nombre</div>
          <div className="tableHeaderRequest">Email</div>
        </div>
        <div className="tableBodyCheck">

          {/* MAPPING USER DATA */}
          {filteredUsers.slice(startIndex, endIndex).map((user) => {
            return (
              <div className="tableDataRow" key={user.id}>
                <div className="tableDataCheck">{user.name} {user.surname}</div>
                <div className="tableDataCheck">{user.email}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <PageButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          text={'🡰'}
          design="left"
        />
        <div className="numberPage">{currentPage}</div>
        <PageButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredUsers.length}
          text={'🡲'}
          design="right"
        />
      </div>
    </Container>
  );
};
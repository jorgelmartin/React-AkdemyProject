import React, { useState, useEffect } from "react";
import "./../../App.css";

export const InputSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onSearch(searchText);
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [searchText, onSearch]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <input
            className="InputSearch"
            type="text"
            name="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleInputChange}
        />
    );
};


// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import "./../../App.css";

// export const InputSearch = ({ data, searchKeys }) => {
//     // State to store the search text entered by the user.
//     const [searchText, setSearchText] = useState("");

//     // State to store the filtered elements based on the search text.
//     const [filteredData, setFilteredData] = useState([]);

//     useEffect(() => {
//         // Function executed when the search text changes.
//         const searchData = (text) => {
//             let filtered = data;
//             if (text && data) {
//                 // Filters the elements in "data" that match the search text.
//                 filtered = data.filter(item =>
//                     // Uses "searchKeys" to specify the properties to search for in each element.
//                     searchKeys.some(key => item[key].toString().includes(text))
//                 );
//             }
//             // Updates the "filteredData" state with the filtered elements.
//             setFilteredData(filtered);
//         };

//         // Uses a timer to delay the execution of the search to avoid overly frequent searches.
//         const timeOutId = setTimeout(() => searchData(searchText), 500);

//         // Clears the timer when the component unmounts or the search text changes.
//         return () => clearTimeout(timeOutId);
//     }, [searchText, data, searchKeys]);

//     // If there is no data, shows a loading message.
//     if (!data) {
//         return <div>Loading...</div>;
//     }

//     // Returns the search component with the filtered result.

//     return (
//         <Container fluid className="mt-5">
//             <input
//                 className="InputSearch"
//                 type={"text"}
//                 name={"text"}
//                 placeholder={"Buscar..."}
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//             />
//             <div className="requestUser">Resultados</div>
//             <div className="tableContainerCheck">
//                 <div className="tableHeader ">
//                     {searchKeys.map((key) => (
//                         <div className="tableHeaderCheck" key={key}>
//                             {key}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="tableBodyCheck">
//                     {filteredData.map((item) => (
//                         <div className="tableDataRow " key={item.id}>
//                             {searchKeys.map((key) => (
//                                 <div className="tableDataCheck" key={`${item.id}-${key}`}>
//                                     {item[key]}
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Container>
//     );
// };
import React, { useState, useEffect } from "react";
import "./../../App.css";

export const InputSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

//WAIT 500 UNTIL EXCECUTE THE FUNCTION
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onSearch(searchText);
        }, 500);

//IF THE VALUE OF SEARCHTEXT CHANGE BEFORE 500 EXCECUTE AGAIN
        return () => clearTimeout(timeOutId);
    }, [searchText, onSearch]);


    //UPDATE THE STAGE OF SEARCHTEXT WITH THE INPUT VALUE
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        // RENDER THE SEARCH INPUT
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
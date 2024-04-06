
import './AkdemyButton.css';

//CREATE COMPONENT AKDEMY BUTTON
export const AkdemyButton = ({ onClick, text }) => {
    return (
        <button className="akdemyButton" onClick={onClick}>
            {text}
        </button>
    );
};

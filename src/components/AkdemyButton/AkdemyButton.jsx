
import './AkdemyButton.css';

//CREATE COMPONENT AKDEMY BUTTON
export const AkdemyButton = ({ onClick, children, text }) => {
    return (
        <button className="akdemyButton"  onClick={onClick}>
            {children} {text}
        </button>
    );
};

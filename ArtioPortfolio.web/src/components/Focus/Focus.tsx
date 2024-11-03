import React from "react";
import { FocusProps } from "../../interfaces";
import "./Focus.css";

const Focus: React.FC<FocusProps> = ({ src, alt, onClick }) => {
    
    const handleClick = () => {
        console.log("Focus component clicked");
        onClick(); // Call the onClick function passed as a prop
    }

    return (
        <div className="focus-container">
            <img className="focus" src={src} alt={alt} onClick={handleClick} />
        </div>
    );
}

export default Focus;

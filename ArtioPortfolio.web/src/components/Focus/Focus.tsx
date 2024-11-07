// Focus.tsx
import React from "react";
import { FocusProps } from "../../interfaces";
import "./Focus.css";

const Focus: React.FC<FocusProps> = ({ src, alt, currentIndex, onFocusClick, selectProject }) => {
    // Handle click to include index selection
    const handleClick = () => {
        console.log("Focus clicked, current index: ", currentIndex);
        
        if (onFocusClick) onFocusClick();  // Handle fullscreen toggle
        if (selectProject) selectProject(currentIndex);  // Select project with current index
    };

    console.log(currentIndex);

    return (
        <div className="focus">
            <img 
                className="focus-image" 
                src={src} 
                alt={alt} 
                onClick={handleClick}
            />
        </div>
    );
};

export default Focus;

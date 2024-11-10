// Focus.tsx
import React from "react";
import { FocusProps } from "../../interfaces";
import "./Focus.css";

const Focus: React.FC<FocusProps> = ({
  src,
  alt,
  currentIndex,
  onFocusClick,
  selectProject,
}) => {
  // Handle click to include index selection
  const handleClick = () => {
    if (onFocusClick) onFocusClick(); // Handle fullscreen toggle
    if (selectProject) selectProject(currentIndex); // Select project with current index
  };
  const handleKeyEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="focus">
      <img
        className="focus-image"
        src={src}
        alt={alt}
        onClick={handleClick}
        onKeyDown={handleKeyEnter}
        tabIndex={4}
      />
    </div>
  );
};

export default Focus;

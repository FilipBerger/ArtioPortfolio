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

  const handleClick = () => {       //Click perfoms different actions based on the parent component of Focus
    if (onFocusClick) onFocusClick();               // Handle fullscreen toggle (Project)
    if (selectProject) selectProject(currentIndex); // Select project with current index (Gallery)
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
        tabIndex={0}
      />
    </div>
  );
};

export default Focus;

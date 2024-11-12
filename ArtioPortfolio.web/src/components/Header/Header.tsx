import { useState } from "react";
import "./Header.css";
import { HeaderProps } from "../../interfaces";

const Header: React.FC<HeaderProps> = ({
  userData,
  filterString,
  setFilterString,
  onCloseButton,
  isInProject,
  openModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (filterString === "") {
      setIsExpanded(false);
    }
  };

  const handleKeyEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      openModal();
    }
  };

  const handleKeyEnterProject = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onCloseButton(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  };

  const handleCloseButtonClick = () => {
    onCloseButton(false);
  };

  const openHamburger = () => {
    console.log("Hamburger pressed. Not Implemented.");
  };

  return (
    <div className="header">
      <div className="header-logo-name tab">
        <img
          className="header-logo"
          src={userData.logoURL}
          onClick={openModal}
          tabIndex={1}
          onKeyDown={handleKeyEnter}
          alt={userData.userName + " logo"}
        />
        <h1 className="header-artist-name">{userData.userName}</h1>
      </div>
      <div className="header-actions">
        {!isInProject && (
          <>
            <form className="header-search">
            <label htmlFor="search-input" className="screen-reader-only">Search bar input space</label>
              <input
                type="text"
                id="search-input"
                placeholder="Filter by title and tag data..."
                className={`header-search-bar ${isExpanded ? "expanded" : ""}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleInputChange}
                tabIndex={2}
              />
              <img className="header-search-icon" src="/search.svg" alt="Magnifying glass search icon"/>
            </form>
            <button className="header-menu" tabIndex={3} onClick={openHamburger}>
              <img className="header-menu-icon" src="/hamburger-menu.svg" alt="Hamburger menu icon"/>
            </button>
          </>
        )}
        {isInProject && (
          <img
            className="header-menu close-button"
            src="/close-icon.svg"
            alt="CV"
            onClick={handleCloseButtonClick}
            onKeyDown={handleKeyEnterProject}
            tabIndex={4}
          />
        )}
      </div>
    </div>
  );
};

export default Header;

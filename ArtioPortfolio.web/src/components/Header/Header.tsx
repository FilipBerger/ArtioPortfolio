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

  // Expand the search bar if it is in focus
  const handleFocus = () => {
    setIsExpanded(true);
  };

  // Collapse the search bar if the input is empty and loses focus
  const handleBlur = () => {
    if (filterString === "") {
      setIsExpanded(false);
    }
  };

  // Display modal by pressing enter during keyboard naviation
  const handleKeyEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      openModal();
    }
  };

  // Close modal by pressing enter during keyboard naviation
  const handleKeyEnterProject = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onCloseButton(false);
    }
  };

  // Update the filter string when the search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  };

  // Close project view on click
  const handleCloseButtonClick = () => {
    onCloseButton(false);
  };

  // Placeholder function for the hamburger menu click 
  const openHamburger = () => {
    console.log("Hamburger pressed. Not Implemented.");
  };

  return (
    <header className="header">
      <nav className="header-logo-name tab">
        <img
          className="header-logo"
          src={userData.logoURL}
          onClick={openModal}
          tabIndex={0}
          onKeyDown={handleKeyEnter}
          alt={userData.userName + " logo"}
        />
        <h1 
          className="header-artist-name"
          onClick={openModal}
          onKeyDown={handleKeyEnter}
          tabIndex={0}
          >{userData.userName}</h1>
      </nav>
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
                tabIndex={0}
              />
              <img className="header-search-icon" src="/search.svg" alt="Magnifying glass search icon"/>
            </form>
            <button className="header-menu" tabIndex={0} onClick={openHamburger}>
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
            tabIndex={0}
          />
        )}
      </div>
    </header>
  );
};

export default Header;

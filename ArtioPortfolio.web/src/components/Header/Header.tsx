import { useState } from "react";
import "./Header.css";
import { HeaderProps } from "../../interfaces";

const Header: React.FC<HeaderProps> = ({ 
  userData, 
  filterString, 
  setFilterString, 
  onCloseButton, 
  isInProject,
  openModal, }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

    const handleBlur = () => {
        if (filterString === "") {
            setIsExpanded(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterString(e.target.value);
    }

    const handleCloseButtonClick = () => {
        onCloseButton(false);
    }

    console.log(isInProject)

    return (
      <div className="header">
        <div className="header-logo-name">
          <img
            className="header-logo"
            src={userData.logoBase64}
            onClick={openModal}
          />
          <p className="header-artist-name">{userData.userName}</p>
        </div>
        <div className="header-actions">
          {!isInProject && (
            <>
              <div className="header-search">
                <input
                  type="text"
                  className={`header-search-bar ${isExpanded ? 'expanded' : ''}`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
                <img className="header-search-icon" src="/search.svg" />
              </div>
              <button className="header-menu">
                <img className="header-menu-icon" src="/hamburger-menu.svg" />
              </button>
            </>
          )}
          {isInProject && (

              <img className="header-menu close-button" src="/close-icon.svg" alt="CV" onClick={handleCloseButtonClick}/>

          )}
        </div>
      </div>
    );
  }

export default Header;

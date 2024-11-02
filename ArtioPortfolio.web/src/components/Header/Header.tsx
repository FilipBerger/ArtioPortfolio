import { useState } from "react"
import "./Header.css"
import { HeaderProps } from "../../interfaces"

const Header: React.FC<HeaderProps> = ({ userData, filterString, setFilterString }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const handleFocus = () => {
    setIsExpanded(true)
    }

    const handleBlur = () => {
        if (filterString === "") 
        {
            setIsExpanded(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterString(e.target.value);
    }

    return (
        <div className="header">
            <div className="header-logo-name">
                <img className="header-logo"src={userData.logoBase64}></img>
                <p className="header-artist-name">{userData.userName}</p>
            </div>
            <div className="header-actions">
                <div className="header-search">
                    <input
                        type="text"
                        className={`header-search-bar ${isExpanded ? 'expanded' : ''}`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                    />
                    <img className="header-search-icon" src="/search.svg"></img>
                </div>
                <button className="header-menu"><img className="header-menu-icon" src="/hamburger-menu.svg"></img></button>
            </div>
        </div>
    )
}

export default Header
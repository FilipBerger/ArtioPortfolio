import { useState } from "react"
import "./Header.css"
import { HeaderProps } from "../../interfaces"

const Header: React.FC<HeaderProps> = ({ userData }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [searchString, setSearchString] = useState("")

    const handleFocus = () => {
    setIsExpanded(true)
    }

    const handleBlur = () => {
        if (searchString === "") 
        {
            setIsExpanded(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    }

    return (
        <div className="header-container">
            <img className="logo"src={userData.logoBase64}></img>
            <p className="artist-name">{userData.userName}</p>
                <div className="search-container">
                    <input
                        type="text"
                        className={`search-bar ${isExpanded ? 'expanded' : ''}`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                    />
                    <img className="search-icon" src="../../../public/search.svg"></img>
                </div>
            <button className="hamburger-menu"><img className="menu-icon" src="../../../public/hamburger-menu.svg"></img></button>
        </div>
    )
}

export default Header
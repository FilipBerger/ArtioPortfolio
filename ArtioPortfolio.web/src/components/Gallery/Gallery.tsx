import { useState, useEffect } from "react"
import Header from "../Header/Header.tsx"
import { GalleryProps } from "../../interfaces.tsx"
// import Focus when ready
// import Miniature when ready

const Gallery: React.FC<GalleryProps> = ({ userData }) => {

    return (
        <div className="gallery-container">
                <Header userData={userData}/>
        </div>
    )
}

export default Gallery
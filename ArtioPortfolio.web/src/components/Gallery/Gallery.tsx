import { useState, useEffect } from "react"
import Header from "../Header/Header.tsx"
import { GalleryProps } from "../../interfaces.tsx"
import Miniature from "../Miniature/Miniature.tsx"
import "./Gallery.css"
// import Focus when ready

const Gallery: React.FC<GalleryProps> = ({ userData, projectData }) => {
    const filteredData = projectData
    .flatMap(project => 
        project.images
            .filter(image => image.imageId === 1)
            .map(image => ({ base64Image: image.base64Image, title: image.title }))
    )

    return (
        <div className="gallery-container">
                <Header userData={userData}/>
                <div className="miniatures-container">
                    {filteredData.map(data => (
                        <Miniature 
                            src={data.base64Image} 
                            alt={`Image title: ${data.title}`}
                        />
                    ))}
                </div>
                
        </div>
    )
}

export default Gallery
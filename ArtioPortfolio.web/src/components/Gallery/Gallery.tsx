import { useState } from "react"
import Header from "../Header/Header.tsx"
import { GalleryProps } from "../../interfaces.tsx"
import Miniature from "../Miniature/Miniature.tsx"
import "./Gallery.css"
import Focus from "../Focus/Focus.tsx"

const Gallery: React.FC<GalleryProps> = ({ userData, projectData }) => {
    const [focusIndex, setFocusIndex] = useState(0)

    const filteredData = projectData
    .flatMap(project => 
        project.images
            .filter(image => image.imageId === 1)
            .map(image => ({ base64Image: image.base64Image, title: image.title }))
    )

    return (
        <div className="gallery-container">
                <Header userData={userData}/>
                <Focus 
                    src={filteredData[focusIndex].base64Image}
                    alt={filteredData[focusIndex].title}
                />
                <div className="miniatures-container">
                    {filteredData.map((data, index )=> (
                        <Miniature 
                            key={index}
                            index={index}
                            src={data.base64Image} 
                            alt={`Image title: ${data.title}`}
                            focusIndex={focusIndex}
                            setFocusIndex={setFocusIndex}
                        />
                    ))}
                </div>
                
        </div>
    )
}

export default Gallery
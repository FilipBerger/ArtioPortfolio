import { ProjectData, ProjectProps, User } from "../../interfaces";
import Focus from "../Focus/Focus";
import Miniature from "../Miniature/Miniature";
import { useState } from "react";
import "./Project.css";
import Header from "../Header/Header";

const Project: React.FC<ProjectProps> = ({ userData, projectData, onCloseButton, openModal }) => {
    const [focusIndex, setFocusIndex] = useState(0);
    const [openTags, setOpenTags] = useState(false);
    const [openFullscreen, setOpenFullscreen] = useState(false);
    const tags = ["ART", "PHOTOSHOP", "SANDWICH", "ARTSY", "NOT AI", "BALLPOINT", "MARKERS"];

    const processedProjectImages = projectData.images.map(image => ({
        base64Image: image.base64Image,
        title: image.title,
    }));

    const Tag: React.FC<{ tagText: string }> = ({ tagText }) => (
        <div className="tag-box">
            <h6>{tagText}</h6>
        </div>
    );

    const handleClick = () => {
        console.log("clicked");
        setOpenFullscreen(!openFullscreen);
        // setOpenTags(!openTags); // Toggle tags
    };

    return (
        <div className="project">
            <div className="project-header">
                <Header 
                    userData={userData}
                    onCloseButton={onCloseButton}
                    isInProject={true}
                    openModal={openModal}
                />
            </div>

            <div className={`fullscreen ${openFullscreen ? 'active' : ''}`} onClick={handleClick}>
                <img
                    src={processedProjectImages[focusIndex].base64Image}
                    alt={`Image title: ${projectData.project}`}
                />
            </div>

            {processedProjectImages[focusIndex] && (
                <div className="project-focus">
                    <Focus
                        src={processedProjectImages[focusIndex].base64Image}
                        alt={"Image title: " + projectData.project}
                        currentIndex={focusIndex}  // Pass focusIndex to Focus for additional control if needed
                        onFocusClick={() => setOpenFullscreen(!openFullscreen)}  // Toggle fullscreen mode
                    />
                </div>
            )}
            <div className="project-miniatures">
                {processedProjectImages.map((data, index) => (
                    <Miniature
                        key={index}
                        index={index}
                        src={data.base64Image}
                        alt={"Image title: " + projectData.project}
                        focusIndex={focusIndex}
                        setFocusIndex={setFocusIndex}
                    />
                ))}
            </div>
            <div className="project-information">
                <h3>{projectData.project}</h3>
                <div className="description-wrapper">
                    <p>{projectData.description}</p>
                    <div className={`tag-container ${openTags ? 'active' : ''}`} onClick={handleClick}>
                        {tags.map((tag, index) => (
                            <Tag key={index} tagText={tag} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;

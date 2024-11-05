import { ProjectData } from "../../interfaces";
import Focus from "../Focus/Focus";
import Miniature from "../Miniature/Miniature";
import { useState } from "react";
import "./Project.css";

const Project: React.FC<{ projectData: ProjectData }> = ({ projectData }) => {
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
        <>
            <div className={`fullscreen ${openFullscreen ? 'active' : ''}`} onClick={handleClick}>
                <img
                    src={processedProjectImages[focusIndex].base64Image}
                    alt={`Image title: ${projectData.project}`}
                />
            </div>
            <div className="header-stand-in" />
            {processedProjectImages[focusIndex] && (
                <Focus
                    src={processedProjectImages[focusIndex].base64Image}
                    alt={"Image title: " + projectData.project}
                    onClick={handleClick}
                />
            )}
            <div className="miniatures-container">
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
                <div className="description-wrapper"> {/* New wrapper for scrolling */}
                    {/* <div className={`tag-container ${openTags ? 'active' : ''}`} onClick={handleClick}>
                        {tags.map((tag, index) => (
                            <Tag key={index} tagText={tag} />
                        ))}
                    </div> */}
                    <p>{projectData.description}</p>
                    <div className={`tag-container ${openTags ? 'active' : ''}`} onClick={handleClick}>
                        {tags.map((tag, index) => (
                            <Tag key={index} tagText={tag} />
                        ))}
                    </div>
                    {/* {tags.length > 0 && (
                        <div className="tag-box tag-reveal-button" onClick={handleClick}>
                            <h4>Q</h4>
                        </div>
                    )}                     */}
                </div>
            </div>

            {/* Tag container positioned at the bottom */}
            {/* <div className={`tag-container ${openTags ? 'active' : ''}`} onClick={handleClick}>
                {tags.map((tag, index) => (
                    <Tag key={index} tagText={tag} />
                ))}
            </div> */}
            

        </>
    );
};

export default Project;

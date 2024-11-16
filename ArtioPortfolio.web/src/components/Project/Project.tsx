import {  ProjectProps } from "../../interfaces";
import Focus from "../Focus/Focus";
import Miniature from "../Miniature/Miniature";
import { useState } from "react";
import "./Project.css";
import Header from "../Header/Header";

const Project: React.FC<ProjectProps> = ({ userData, projectData, onCloseButton, openModal }) => {
    const [focusIndex, setFocusIndex] = useState(0);
    const [openFullscreen, setOpenFullscreen] = useState(false);
    const tags = projectData.tags;

    const Tag: React.FC<{ tagText: string }> = ({ tagText }) => (
        <div className="tag-box">
            <span>{tagText}</span>
        </div>
    );

    const handleClick = () => {
        setOpenFullscreen(!openFullscreen);
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
                    src={projectData.images[focusIndex].imageURL}
                    alt={`Image ${focusIndex+1} from project titled ${projectData.project}`}
                />
            </div>

            {projectData.images[focusIndex] && (
                <div className="project-focus">
                    <Focus
                        src={projectData.images[focusIndex].imageURL}
                        alt={`Image ${focusIndex+1} from project titled ${projectData.project}`}
                        currentIndex={focusIndex}
                        onFocusClick={() => setOpenFullscreen(!openFullscreen)} 
                    />
                </div>
            )}
            <div className="project-miniatures">
                {projectData.images.map((data, index) => (
                    <Miniature
                        key={index}
                        index={index}
                        src={data.imageURL}
                        alt={`Miniture of image ${index+1} from project titled ${projectData.project}`}
                        focusIndex={focusIndex}
                        setFocusIndex={setFocusIndex}
                    />
                ))}
            </div>
            <section className="project-information">
                <h2>{projectData.project}</h2>
                <article 
                    className="description-wrapper"
                    tabIndex={0}
                >
                    <p>{projectData.description}</p>
                    <div className="tag-container">
                        {tags.map((tag, index) => (
                            <Tag key={index} tagText={tag} />
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Project;

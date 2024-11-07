import { useState, useEffect } from "react";
import Header from "../Header/Header.tsx";
import { GalleryProps, FilteredDataType } from "../../interfaces.tsx";
import Miniature from "../Miniature/Miniature.tsx";
import "./Gallery.css";
import Focus from "../Focus/Focus.tsx";

const Gallery: React.FC<GalleryProps> = ({
  userData,
  projectData,
  openModal,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [filterString, setFilterString] = useState("");
  const [filteredResults, setFilteredResults] = useState<FilteredDataType[]>(
    []
  );

  const processedProjectData = projectData.flatMap((project) =>
    project.images
      .filter((image) => image.imageId === 1)
      .map((image) => ({ base64Image: image.base64Image, title: image.title }))
  );

  useEffect(() => {
    if (filterString === "") {
      setFilteredResults(processedProjectData);
    } else {
      const filtered = processedProjectData.filter((data) =>
        data.title.toLowerCase().includes(filterString.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [filterString]);

  return (
    <div className="gallery">
      <div className="gallery-header">
        <Header
          userData={userData}
          filterString={filterString}
          setFilterString={setFilterString}
          openModal={openModal}
        />
      </div>

      <div className="gallery-focus">
        {filteredResults.length > 0 && (
          <Focus
            src={filteredResults[focusIndex].base64Image}
            alt={filteredResults[focusIndex].title}
          />
        )}
      </div>

      <div className="gallery-miniatures">
        {filteredResults.map((data, index) => (
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
  );
};

export default Gallery;

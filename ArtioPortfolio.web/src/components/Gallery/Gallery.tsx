import { useState, useEffect } from "react";
import Header from "../Header/Header.tsx";
import { GalleryProps, FilteredDataType } from "../../interfaces.tsx";
import Miniature from "../Miniature/Miniature.tsx";
import "./Gallery.css";
import Focus from "../Focus/Focus.tsx";

const Gallery: React.FC<GalleryProps> = ({
  userData,
  projectData,
  selectProject,
  openModal,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [filterString, setFilterString] = useState("");
  const [filteredResults, setFilteredResults] = useState<FilteredDataType[]>(
    []
  );

  const processedProjectData = projectData
    .flatMap((project) =>
      project.images
        .filter((image) => image.imageId === 0)
        .map((image) => ({
          imageURL: image.imageURL,
          title: image.title,
        }))
    )
    .map((image, index) => ({ ...image, originalIndex: index }))

  useEffect(() => {
    if (filterString === "") {
      setFilteredResults(processedProjectData)
    } else {
      const filtered = processedProjectData.filter((data) =>
        data.title.toLowerCase().includes(filterString.toLowerCase())
      )
      setFilteredResults(filtered);
    }
  }, [filterString])

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
            src={filteredResults[focusIndex].imageURL}
            alt={filteredResults[focusIndex].title}
            currentIndex={filteredResults[focusIndex].originalIndex}
            onFocusClick={() =>
              selectProject(filteredResults[focusIndex].originalIndex)
            }
          />
        )}
      </div>

      <div className="gallery-miniatures">
        {filteredResults.map((data, index) => (
          <Miniature
            key={index}
            index={index}
            src={data.imageURL}
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

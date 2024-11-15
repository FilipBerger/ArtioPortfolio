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
  const [filteredResults, setFilteredResults] = useState<FilteredDataType[]>( [] );

  // Extract the first image and relevant metadata from each project
  const processedProjectData = projectData
    .flatMap((project) =>
      project.images
        .filter((image) => image.imageId === 0)
        .map((image) => ({
          imageURL: image.imageURL,
          title: image.title,
          parentProject: project.project
        }))
    )
    .map((image, index) => ({ ...image, originalIndex: index }))

  // Filter rendered results based on user input
  useEffect(() => {
    if (filterString === "") {
      setFilteredResults(processedProjectData)
    } else {
      setFocusIndex(0); //Reset index to avoid out of bounds exception
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
            alt={`Image ${focusIndex+1} from project titled ${filteredResults[focusIndex].parentProject}`}
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
            alt={`Miniture display image from project titled ${data.parentProject}`}
            focusIndex={focusIndex}
            setFocusIndex={setFocusIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
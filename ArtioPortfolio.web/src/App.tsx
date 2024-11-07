import Gallery from "./components/Gallery/Gallery.tsx";
import userData from "./mocks/mockUserData.json";
import { Project, User, WelcomeProps } from "./interfaces.tsx";
import { useState } from "react";
import Welcome from "./components/Welcome/Welcome.tsx";
import projectData from "./mocks/mockProjects.json";

function App() {
  const typedUserData: User = userData as User;
  const typedProjectData: Project[] = projectData as Project[];
  const modalUserData: WelcomeProps = {
    profilePicture: userData.logoBase64,
    name: userData.userName,
    description: userData.description,
    linkedin: userData.linkedin,
    instagram: userData.instagram,
    facebook: userData.facebook,
    cv: userData.cv,
    onClose: () => setIsModalOpen(false),
  };
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  return (
    <div className="app--container">
      <Gallery
        userData={typedUserData}
        projectData={typedProjectData}
        openModal={toggleModal}
      />
      {isModalOpen && <Welcome {...modalUserData} />}
    </div>
  );
}

export default App;

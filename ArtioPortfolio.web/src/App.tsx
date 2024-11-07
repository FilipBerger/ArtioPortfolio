import Gallery from "./components/Gallery/Gallery.tsx"
import userData from "./mocks/mockUserData.json"
import { User, ProjectData, WelcomeProps } from "./interfaces.tsx"
import projectData from "./mocks/mockProjects.json"
import "./App.css"
import Project from "./components/Project/Project.tsx"
import Welcome from "./components/Welcome/Welcome.tsx";
import { useState } from "react"

function App() {
  const [projectView, setProjectView] = useState(false);
  const [projectIndex, setProjectIndex] = useState(1);
  // Convert to state variables and utlize useEffect to get and set these at a later stage
  const typedUserData: User = userData as User
  const typedProjectData: ProjectData[] = projectData as ProjectData[]
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

  const selectProject = (index: number) => {
    console.log("trigger selected project " + index)
    setProjectView(true);
    setProjectIndex(index);
  }

  return (
    <div className="app--container">
      {
        projectView && (
          <Project 
          userData={typedUserData} 
          projectData={typedProjectData[projectIndex]} 
          onCloseButton={setProjectView}
          openModal={toggleModal} />
        )
      }
      {
        !projectView && (
      <Gallery 
        userData={typedUserData} 
        projectData={typedProjectData} 
        selectProject={selectProject} 
        openModal={toggleModal}/>
        )
      }
      {isModalOpen && <Welcome {...modalUserData} />}
    </div>
  );
}

export default App;

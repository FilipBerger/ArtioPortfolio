import Gallery from "./components/Gallery/Gallery.tsx"
import userData from "./mocks/mockUserData.json"
import { User, ProjectData } from "./interfaces.tsx"
import projectData from "./mocks/mockProjects.json"
import "./App.css"
// import Focus from "./components/Focus/Focus.tsx"
import Project from "./components/Project/Project.tsx"
import { useState } from "react"

function App() {
  const [projectView, setProjectView] = useState(false);
  const [projectIndex, setProjectIndex] = useState(1);
  // Convert to state variables and utlize useEffect to get and set these at a later stage
  const typedUserData: User = userData as User
  const typedProjectData: ProjectData[] = projectData as ProjectData[]

  const selectProject = (index: number) => {
    console.log("trigger selected project " + index)
    setProjectView(true);
    setProjectIndex(index);
  }

  return (
    <div className="app--container">
      {
        projectView && (
          <Project userData={typedUserData} projectData={typedProjectData[projectIndex]} onCloseButton={setProjectView} />
        )
      }
      {
        !projectView && (
      <Gallery userData={typedUserData} projectData={typedProjectData} selectProject={selectProject}/>
        )
      }
    </div>
  )
}

export default App

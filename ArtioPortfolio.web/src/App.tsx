import Gallery from "./components/Gallery/Gallery.tsx"
import userData from "./mocks/mockUserData.json"
import { User, ProjectData } from "./interfaces.tsx"
import projectData from "./mocks/mockProjects.json"
import "./App.css"
// import Focus from "./components/Focus/Focus.tsx"
import Project from "./components/Project/Project.tsx"

function App() {
  // Convert to state variables and utlize useEffect to get and set these at a later stage
  const typedUserData: User = userData as User
  const typedProjectData: ProjectData[] = projectData as ProjectData[]

  return (
    <div className="app--container">
      <Project projectData={typedProjectData[1]}/>
      {/* <Gallery userData={typedUserData} projectData={typedProjectData}/> */}
    </div>
  )
}

export default App

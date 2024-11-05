import Gallery from "./components/Gallery/Gallery.tsx"
import userData from "./mocks/mockUserData.json"
import { User, Project } from "./interfaces.tsx"
import projectData from "./mocks/mockProjects.json"
import "./App.css"

function App() {
  // Convert to state variables and utlize useEffect to get and set these at a later stage
  const typedUserData: User = userData as User
  const typedProjectData: Project[] = projectData as Project[]

  return (
    <div className="app-container">
      <Gallery userData={typedUserData} projectData={typedProjectData}/>
    </div>
  )
}

export default App

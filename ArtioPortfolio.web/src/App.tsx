import Gallery from "./components/Gallery/Gallery.tsx"
import userData from "./mocks/mockUserData.json"
import { User } from "./interfaces.tsx"

function App() {
  const typedUserData: User = userData as User;

  return (
    <div className="app--container">
      <Gallery userData={typedUserData}/>
    </div>
  )
}

export default App

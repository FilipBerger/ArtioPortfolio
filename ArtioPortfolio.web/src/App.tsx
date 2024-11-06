import Gallery from "./components/Gallery/Gallery.tsx";
import userData from "./mocks/mockUserData.json";
import { User, WelcomeProps } from "./interfaces.tsx";
import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import Welcome from "./components/Welcome/Welcome.tsx";

function App() {
  const typedUserData: User = userData as User;
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
      <Header userData={typedUserData} openModal={toggleModal} />
      <Gallery userData={typedUserData} />
      {isModalOpen && <Welcome {...modalUserData} />}
    </div>
  );
}

export default App;

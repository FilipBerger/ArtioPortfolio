import Gallery from "./components/Gallery/Gallery.tsx";
import placeholderProjects from "./mocks/placeholderProjects.json"
import placeholderUser from "./mocks/placeholderUser.json"
import { User, ProjectData, WelcomeProps} from "./interfaces.tsx";
import "./App.css";
import Project from "./components/Project/Project.tsx";
import Welcome from "./components/Welcome/Welcome.tsx";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {

  const [userData, setUserData] = useState<User>(placeholderUser);
  const [projectData, setProjectData] = useState<ProjectData[]>(placeholderProjects);
  const [projectView, setProjectView] = useState(false);
  const [projectIndex, setProjectIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const modalUserData: WelcomeProps = {
    profilePicture: userData.logoURL,
    name: userData.userName,
    description: userData.description,
    linkedin: userData.linkedin,
    instagram: userData.instagram,
    facebook: userData.facebook,
    cv: userData.cv,
    onClose: () => setIsModalOpen(false),
  };
  
  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  const selectProject = (index: number) => {
    setProjectView(true);
    setProjectIndex(index);
  };

  useEffect(() => {
      processPortfolioData()
      processProjectData()
  }, [])

  const processPortfolioData = async () => {
    const data = await getPortfolioData()
    console.log(data);

    const portfolioData = data.data[0]

    const userObject: User = {
      userName: portfolioData.PortfolioTitle,
      description: portfolioData.Description[0].children[0].text,
      linkedin: portfolioData.SocialLinks.LinkedIn ? portfolioData.SocialLinks.LinkedIn : "",
      instagram: portfolioData.SocialLinks.Instagram ? portfolioData.SocialLinks.Instagram : "",
      facebook: portfolioData.SocialLinks.Facebook ? portfolioData.SocialLinks.Facebook : "",
      cv: "", // TODO: implement setting of CV
      logoURL: "http://localhost:1337" + portfolioData.Logo[0].formats.small.url
    }
    setUserData(userObject)
  }

  const processProjectData = async () => {
    const data = await getProjectData()

    const projectData = data.data

    const projectObjects: ProjectData[] = projectData.map(project => ({
      project: project.Title,
      description: project.Description[0].children[0].text,
      tags: [] = project.Tags.map(tag => tag.Tag),
      images: project.Images.map((image, index) => ({
        imageId: index,
        title: image.name,
        imageURL: "http://localhost:1337" + image.url
      }))
    }))
    setProjectData(projectObjects)
  }

  const getPortfolioData = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/portfolios/?populate=*");
      if (!response.ok) throw new Error("Failed to fetch portfolio data");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      return { data: [] };
    }
  }

  const getProjectData = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/art-projects/?populate=*")
      if (!response.ok) throw new Error("Failed to fetch project data");
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching project data:", error);
      return { data: [] };
    }
  }

  return (
    <HelmetProvider>
      <div className="app--container">
        {/* Set site Title and description tag dynamically */}
        <Helmet>  
          <title>{userData.userName || "Portfolio"}</title>
          <meta name="description" content={userData.description || "A creative portfolio showcasing art and projects"} />
          <meta name="robots" content="index, follow" />

          <link rel="icon" type="image/png" href={userData.logoURL} sizes="32x32" />
          <link rel="apple-touch-icon" href={userData.logoURL} />
        </Helmet>

        {projectView && (
          <Project
            userData={userData}
            projectData={projectData[projectIndex]}
            onCloseButton={setProjectView}
            openModal={toggleModal}
          />
        )}
        {!projectView && (
          <Gallery
            key={`${projectData.length}-${userData.userName}`}
            userData={userData}
            projectData={projectData}
            selectProject={selectProject}
            openModal={toggleModal}
          />
        )}
        {isModalOpen && <Welcome {...modalUserData} />}
      </div>
    </HelmetProvider>
  );
};

export default App;

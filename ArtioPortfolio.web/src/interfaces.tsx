export interface User {
  id: number;
  userName: string;
  logoBase64: string;
}

export interface HeaderProps {
    userData: User
    filterString?: string
    setFilterString?: Function
    onCloseButton?: Function
    isInProject?: boolean
    openModal: () => void;
}

export interface GalleryProps {
    userData: User
    projectData: ProjectData[]
    selectProject: Function
    openModal: () => void;
}

export interface ProjectProps {
    userData: User
    projectData: ProjectData
    onCloseButton: Function
    openModal: () => void;
}

export interface ProjectData {
    projectId: number
    project: string
    description: string
    images: Image[]
}
export interface Project {
  projectId: number;
  project: string;
  description: string;
  images: Image[];
}

export interface Image {
  imageId: number;
  title: string;
  base64Image: string;
}

export interface MiniatureProps {
  src: string;
  alt: string;
  index: number;
  focusIndex: number;
  setFocusIndex: Function;
}

export interface FocusProps {
    src: string;
    alt: string;
    currentIndex: number;
    onFocusClick?: () => void;
    selectProject?: (index: number) => void;  // Update here
}

export interface FilteredDataType {
    base64Image: string
    title: string
    originalIndex: number
}

export interface WelcomeProps {
  profilePicture: string;
  name: string;
  description: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  cv: string;
  onClose: () => void;
}

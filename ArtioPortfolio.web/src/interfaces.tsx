export interface User {
  id: number;
  userName: string;
  logoBase64: string;
}

export interface HeaderProps {
  userData: User;
  filterString: string;
  setFilterString: Function;
  openModal: () => void;
}

export interface GalleryProps {
  userData: User;
  projectData: Project[];
  openModal: () => void;
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
}

export interface FilteredDataType {
  base64Image: string;
  title: string;
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

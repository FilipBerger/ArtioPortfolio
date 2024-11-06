export interface User {
  id: number;
  userName: string;
  logoBase64: string;
}

export interface HeaderProps {
  userData: User;
  openModal: () => void;
}

export interface GalleryProps {
  userData: User;
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

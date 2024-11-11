export interface User {
  userName: string
  description: string
  linkedin: string
  instagram: string
  facebook: string
  cv: string
  logoURL: string
}

export interface HeaderProps {
    userData: User
    filterString?: string
    setFilterString?: Function
    onCloseButton?: Function
    isInProject?: boolean
    openModal: () => void
}

export interface GalleryProps {
    userData: User
    projectData: ProjectData[]
    selectProject: Function
    openModal: () => void
}

export interface ProjectProps {
    userData: User
    projectData: ProjectData
    onCloseButton: Function
    openModal: () => void
}

export interface ProjectData {
    project: string
    description: string
    tags: string []
    images: Image[]
}

// export interface Project {
//   projectId: number
//   project: string
//   description: string
//   tags: string []
//   images: Image[]
// }

export interface Image {
  imageId: number
  title: string
  imageURL: string
}

export interface MiniatureProps {
  src: string
  alt: string
  index: number
  focusIndex: number
  setFocusIndex: Function
}

export interface FocusProps {
    src: string
    alt: string
    currentIndex: number
    onFocusClick?: () => void
    selectProject?: (index: number) => void  // Update here
}

export interface FilteredDataType {
    imageURL: string
    title: string
    originalIndex: number
}

export interface WelcomeProps {
  profilePicture: string
  name: string
  description: string
  linkedin: string
  instagram: string
  facebook: string
  cv: string
  onClose: () => void
}

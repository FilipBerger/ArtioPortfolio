export interface User {
    id: number
    userName: string
    logoBase64: string
}

export interface HeaderProps {
    userData: User
    filterString?: string
    setFilterString?: Function
    onCloseButton?: Function
    isInProject?: boolean
}

export interface GalleryProps {
    userData: User
    projectData: ProjectData[]
    selectProject: Function
}

export interface ProjectProps {
    userData: User
    projectData: ProjectData
    onCloseButton: Function
}

export interface ProjectData {
    projectId: number
    project: string
    description: string
    images: Image[]
}

export interface Image {
    imageId: number
    title: string
    base64Image: string
}

export interface MiniatureProps {
    src: string
    alt: string
    index: number
    focusIndex: number
    setFocusIndex: Function
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
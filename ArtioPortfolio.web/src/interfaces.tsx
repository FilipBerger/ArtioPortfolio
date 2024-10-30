export interface User {
    id: number
    userName: string
    logoBase64: string
}

export interface HeaderProps {
    userData: User
}

export interface GalleryProps {
    userData: User
    projectData: Project[]
}

export interface Project {
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
    src: string
    alt: string
}
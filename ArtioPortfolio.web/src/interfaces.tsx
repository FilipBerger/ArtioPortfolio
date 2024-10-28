export interface User {
    id: number;
    userName: string;
    logoBase64: string;
}

export interface HeaderProps {
    userData: User;
}

export interface GalleryProps {
    userData: User;
    }

export interface ImageMetadata {
    cameraMake?: string;
    cameraModel?: string;
    exposureTime?: number;
    aperture?: number;
    iso?: number;
    focalLength?: number;
    flashUsed?: boolean;
    creator?: string;
    copyright?: string;
    creationDate?: Date;
    title?: string;
    description?: string;
    tags?: string[];
}

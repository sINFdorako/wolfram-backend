export enum ImageType {
    BACKGROUND_IMAGE = 'backgroundImage',
    ME_IMAGE = 'meImage',
    SPECIFIC_GALLERY_PREVIEW = 'specificGalleryPreview'
}
class Image {
    id?: number;
    userId: number;
    categoryId: number;
    url: string;
    filename: string;
    originalFilename: string;
    fileSize: number;
    mimeType: string;
    title?: string;
    description?: string;
    uploadDate: Date;
    lastModifiedDate?: Date;
    tags?: string[];
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
    landingpageId?: number;
    imageType?: ImageType;

    constructor({
        userId,
        categoryId,
        url,
        filename,
        originalFilename,
        fileSize,
        mimeType,
        uploadDate,
        lastModifiedDate,
        landingpageId,
        imageType,
        title,
        description,
        tags,
        cameraMake,
        cameraModel,
        exposureTime,
        aperture,
        iso,
        focalLength,
        flashUsed,
        creator,
        copyright,
        creationDate,
        id
    }: {
        userId?: number;
        categoryId?: number;
        url?: string;
        filename?: string;
        originalFilename?: string;
        fileSize?: number;
        mimeType?: string;
        uploadDate?: Date;
        lastModifiedDate?: Date;
        landingpageId?: number;
        imageType?: ImageType;
        title?: string;
        description?: string;
        tags?: string[];
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
        id?: number;
    }) {
        this.userId = userId!;
        this.categoryId = categoryId!;
        this.url = url!;
        this.filename = filename!;
        this.originalFilename = originalFilename!;
        this.fileSize = fileSize!;
        this.mimeType = mimeType!;
        this.uploadDate = uploadDate!;
        this.lastModifiedDate = lastModifiedDate!;
        this.landingpageId = landingpageId!;
        this.imageType = imageType!;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.cameraMake = cameraMake;
        this.cameraModel = cameraModel;
        this.exposureTime = exposureTime;
        this.aperture = aperture;
        this.iso = iso;
        this.focalLength = focalLength;
        this.flashUsed = flashUsed;
        this.creator = creator;
        this.copyright = copyright;
        this.creationDate = creationDate;
        this.id = id;
    }
}

export default Image;

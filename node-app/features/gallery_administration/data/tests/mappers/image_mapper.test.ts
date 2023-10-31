// imageMapper.test.ts

import { imageModelToEntity, imageEntityToModel, transformImageModelToPlainObject } from '../../mappers/image_mapper';
import { ImageModel } from '../../models/image.model';
import Image from '../../../domain/entities/image';
import { ImageType } from '../../../domain/entities/image';

jest.mock('../../models/image.model.ts');

describe('Image Mapper', () => {
  const mockImageModel = {
    id: 1,
    userId: 2,
    categoryId: 3,
    url: 'http://example.com/image.jpg',
    filename: 'image.jpg',
    originalFilename: 'original_image.jpg',
    fileSize: 12345,
    mimeType: 'image/jpeg',
    uploadDate: new Date('2023-01-01'),
    lastModifiedDate: new Date('2023-01-02'),
    title: 'Title',
    description: 'Description',
    tags: ['tag1', 'tag2'],
    cameraMake: 'Canon',
    cameraModel: 'EOS',
    exposureTime: 1.6,
    aperture: 2.8,
    iso: 100,
    focalLength: 35,
    flashUsed: false,
    creator: 'Creator',
    copyright: 'Copyright',
    creationDate: new Date('2023-01-03'),
    landingpageId: 4,
    imageType: ImageType.BACKGROUND_IMAGE,
  } as unknown as ImageModel;

  const mockImageEntity = new Image({
    id: 1,
    userId: 2,
    categoryId: 3,
    url: 'http://example.com/image.jpg',
    filename: 'image.jpg',
    originalFilename: 'original_image.jpg',
    fileSize: 12345,
    mimeType: 'image/jpeg',
    uploadDate: new Date('2023-01-01'),
    lastModifiedDate: new Date('2023-01-02'),
    title: 'Title',
    description: 'Description',
    tags: ['tag1', 'tag2'],
    cameraMake: 'Canon',
    cameraModel: 'EOS',
    exposureTime: 1.6,
    aperture: 2.8,
    iso: 100,
    focalLength: 35,
    flashUsed: false,
    creator: 'Creator',
    copyright: 'Copyright',
    creationDate: new Date('2023-01-03'),
    landingpageId: 4,
    imageType: ImageType.BACKGROUND_IMAGE,
  });

  it('should correctly map ImageModel to Image entity', () => {
    const imageEntity = imageModelToEntity(mockImageModel);
    expect(imageEntity).toEqual(mockImageEntity);
  });

  it('should correctly map Image entity to ImageModel', () => {
    const imageModel = imageEntityToModel(mockImageEntity);
    expect(imageModel).toEqual(mockImageModel);
  });

  it('should correctly transform ImageModel to plain object', () => {
    const plainObject = transformImageModelToPlainObject(mockImageModel);
    expect(plainObject).toEqual(mockImageModel);
  });
});

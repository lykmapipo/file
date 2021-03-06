import { ObjectId, GridFSBucket } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import {
  Buckets,
  bucketInfoFor,
  FileTypes,
  createModels,
  createBuckets,
  modelFor,
  bucketFor,
  fileFilterFor,
} from '../src/file.model';

describe('Index', () => {
  it('should expose bucket definitions', () => {
    expect(Buckets).to.exist;

    expect(Buckets.File).to.exist;
    expect(Buckets.File).to.be.eql({
      modelName: 'File',
      bucketName: 'fs',
      fieldName: 'file',
    });

    expect(Buckets.Image).to.exist;
    expect(Buckets.Image).to.be.eql({
      modelName: 'Image',
      bucketName: 'images',
      fieldName: 'image',
    });

    expect(Buckets.Audio).to.exist;
    expect(Buckets.Audio).to.be.eql({
      modelName: 'Audio',
      bucketName: 'audios',
      fieldName: 'audio',
    });

    expect(Buckets.Video).to.exist;
    expect(Buckets.Video).to.be.eql({
      modelName: 'Video',
      bucketName: 'videos',
      fieldName: 'video',
    });

    expect(Buckets.Document).to.exist;
    expect(Buckets.Document).to.be.eql({
      modelName: 'Document',
      bucketName: 'documents',
      fieldName: 'document',
    });
  });

  it('should be able to get bucket info', () => {
    let bucketInfo = bucketInfoFor();
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'File',
      bucketName: 'fs',
      fieldName: 'file',
    });

    bucketInfo = bucketInfoFor('fs');
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'File',
      bucketName: 'fs',
      fieldName: 'file',
    });

    bucketInfo = bucketInfoFor('images');
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'Image',
      bucketName: 'images',
      fieldName: 'image',
    });

    bucketInfo = bucketInfoFor('audios');
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'Audio',
      bucketName: 'audios',
      fieldName: 'audio',
    });

    bucketInfo = bucketInfoFor('videos');
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'Video',
      bucketName: 'videos',
      fieldName: 'video',
    });

    bucketInfo = bucketInfoFor('documents');
    expect(bucketInfo).to.exist;
    expect(bucketInfo).to.be.eql({
      modelName: 'Document',
      bucketName: 'documents',
      fieldName: 'document',
    });
  });

  it('should expose file schematype definitions', () => {
    expect(FileTypes).to.exist;

    expect(FileTypes.File).to.exist;
    expect(FileTypes.File).to.have.all.keys('type', 'ref', 'autopopulate');
    expect(FileTypes.File.type.name).to.be.equal(ObjectId.name);
    expect(FileTypes.File.ref).to.be.equal('File');

    expect(FileTypes.Image).to.exist;
    expect(FileTypes.Image).to.have.all.keys('type', 'ref', 'autopopulate');
    expect(FileTypes.Image.type.name).to.be.equal(ObjectId.name);
    expect(FileTypes.Image.ref).to.be.equal('Image');

    expect(FileTypes.Audio).to.exist;
    expect(FileTypes.Audio).to.have.all.keys('type', 'ref', 'autopopulate');
    expect(FileTypes.Audio.type.name).to.be.equal(ObjectId.name);
    expect(FileTypes.Audio.ref).to.be.equal('Audio');

    expect(FileTypes.Video).to.exist;
    expect(FileTypes.Video).to.have.all.keys('type', 'ref', 'autopopulate');
    expect(FileTypes.Video.type.name).to.be.equal(ObjectId.name);
    expect(FileTypes.Video.ref).to.be.equal('Video');

    expect(FileTypes.Document).to.exist;
    expect(FileTypes.Document).to.have.all.keys('type', 'ref', 'autopopulate');
    expect(FileTypes.Document.type.name).to.be.equal(ObjectId.name);
    expect(FileTypes.Document.ref).to.be.equal('Document');
  });

  it('should be able to create models', () => {
    const { File, Image, Audio, Video, Document } = createModels();

    expect(File).to.exist;
    expect(File.schema).to.exist;
    expect(File.modelName).to.be.equal('File');
    expect(File.collection.name).to.be.equal('fs.files');

    expect(Image).to.exist;
    expect(Image.schema).to.exist;
    expect(Image.modelName).to.be.equal('Image');
    expect(Image.collection.name).to.be.equal('images.files');

    expect(Audio).to.exist;
    expect(Audio.schema).to.exist;
    expect(Audio.modelName).to.be.equal('Audio');
    expect(Audio.collection.name).to.be.equal('audios.files');

    expect(Video).to.exist;
    expect(Video.schema).to.exist;
    expect(Video.modelName).to.be.equal('Video');
    expect(Video.collection.name).to.be.equal('videos.files');

    expect(Document).to.exist;
    expect(Document.schema).to.exist;
    expect(Document.modelName).to.be.equal('Document');
    expect(Document.collection.name).to.be.equal('documents.files');
  });

  it('should be able to create buckets', () => {
    const { files, images, audios, videos, documents } = createBuckets();

    expect(files).to.exist;
    expect(files).to.be.an.instanceof(GridFSBucket);
    expect(files.collectionName).to.be.equal('fs.files');

    expect(images).to.exist;
    expect(images).to.be.an.instanceof(GridFSBucket);
    expect(images.collectionName).to.be.equal('images.files');

    expect(audios).to.exist;
    expect(audios).to.be.an.instanceof(GridFSBucket);
    expect(audios.collectionName).to.be.equal('audios.files');

    expect(videos).to.exist;
    expect(videos).to.be.an.instanceof(GridFSBucket);
    expect(videos.collectionName).to.be.equal('videos.files');

    expect(documents).to.exist;
    expect(documents).to.be.an.instanceof(GridFSBucket);
    expect(documents.collectionName).to.be.equal('documents.files');
  });

  it('should be able to get model for a bucket', () => {
    let File = modelFor();
    expect(File).to.exist;
    expect(File.schema).to.exist;
    expect(File.modelName).to.be.equal('File');
    expect(File.collection.name).to.be.equal('fs.files');

    File = modelFor('any');
    expect(File).to.exist;
    expect(File.schema).to.exist;
    expect(File.modelName).to.be.equal('File');
    expect(File.collection.name).to.be.equal('fs.files');

    File = modelFor('files');
    expect(File).to.exist;
    expect(File.schema).to.exist;
    expect(File.modelName).to.be.equal('File');
    expect(File.collection.name).to.be.equal('fs.files');

    const Image = modelFor('images');
    expect(Image).to.exist;
    expect(Image.schema).to.exist;
    expect(Image.modelName).to.be.equal('Image');
    expect(Image.collection.name).to.be.equal('images.files');

    const Audio = modelFor('audios');
    expect(Audio).to.exist;
    expect(Audio.schema).to.exist;
    expect(Audio.modelName).to.be.equal('Audio');
    expect(Audio.collection.name).to.be.equal('audios.files');

    const Video = modelFor('videos');
    expect(Video).to.exist;
    expect(Video.schema).to.exist;
    expect(Video.modelName).to.be.equal('Video');
    expect(Video.collection.name).to.be.equal('videos.files');

    const Document = modelFor('documents');
    expect(Document).to.exist;
    expect(Document.schema).to.exist;
    expect(Document.modelName).to.be.equal('Document');
    expect(Document.collection.name).to.be.equal('documents.files');
  });

  it('should be able to get gridfs bucket', () => {
    let files = bucketFor();
    expect(files).to.exist;
    expect(files).to.be.an.instanceof(GridFSBucket);
    expect(files.collectionName).to.be.equal('fs.files');

    files = bucketFor('files');
    expect(files).to.exist;
    expect(files).to.be.an.instanceof(GridFSBucket);
    expect(files.collectionName).to.be.equal('fs.files');

    const images = bucketFor('images');
    expect(images).to.exist;
    expect(images).to.be.an.instanceof(GridFSBucket);
    expect(images.collectionName).to.be.equal('images.files');

    const audios = bucketFor('audios');
    expect(audios).to.exist;
    expect(audios).to.be.an.instanceof(GridFSBucket);
    expect(audios.collectionName).to.be.equal('audios.files');

    const videos = bucketFor('videos');
    expect(videos).to.exist;
    expect(videos).to.be.an.instanceof(GridFSBucket);
    expect(videos.collectionName).to.be.equal('videos.files');

    const documents = bucketFor('documents');
    expect(documents).to.exist;
    expect(documents).to.be.an.instanceof(GridFSBucket);
    expect(documents.collectionName).to.be.equal('documents.files');
  });

  it('should filter allowed file for a default bucket', (done) => {
    const fileFilter = fileFilterFor();
    fileFilter({}, { fieldname: 'file' }, (error, isAllowed) => {
      expect(error).to.not.exist;
      expect(isAllowed).to.exist.and.be.true;
      done(error, isAllowed);
    });
  });

  it('should filter reject file for a default bucket', (done) => {
    const fileFilter = fileFilterFor();
    fileFilter({}, { fieldname: 'any' }, (error, isAllowed) => {
      expect(error).to.not.exist;
      expect(isAllowed).to.exist.and.be.false;
      done(error, isAllowed);
    });
  });

  it('should filter allowed file for a specified bucket', (done) => {
    const fileFilter = fileFilterFor('images');
    fileFilter({}, { fieldname: 'image' }, (error, isAllowed) => {
      expect(error).to.not.exist;
      expect(isAllowed).to.exist.and.be.true;
      done(error, isAllowed);
    });
  });

  it('should filter reject file for a specified bucket', (done) => {
    const fileFilter = fileFilterFor('images');
    fileFilter({}, { fieldname: 'any' }, (error, isAllowed) => {
      expect(error).to.not.exist;
      expect(isAllowed).to.exist.and.be.false;
      done(error, isAllowed);
    });
  });
});

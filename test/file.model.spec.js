import { join as joinPath } from 'path';
import { createReadStream } from 'fs';
import { isBuffer } from 'lodash';
import { getType as mimeTypeOf } from 'mime';
import { readable as isReadableStream } from 'is-stream';
import { ObjectId } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Buckets, FileTypes, createModels } from '../src/file.model';

const readStreamFor = filename => {
  return createReadStream(joinPath(__dirname, 'fixtures', filename));
};

describe('File', () => {
  it('should expose bucket definitions', () => {
    expect(Buckets).to.exist;

    expect(Buckets.File).to.exist;
    expect(Buckets.File).to.be.eql({ modelName: 'File', bucketName: 'fs' });

    expect(Buckets.Image).to.exist;
    expect(Buckets.Image).to.be.eql({
      modelName: 'Image',
      bucketName: 'images',
    });

    expect(Buckets.Audio).to.exist;
    expect(Buckets.Audio).to.be.eql({
      modelName: 'Audio',
      bucketName: 'audios',
    });

    expect(Buckets.Video).to.exist;
    expect(Buckets.Video).to.be.eql({
      modelName: 'Video',
      bucketName: 'videos',
    });

    expect(Buckets.Document).to.exist;
    expect(Buckets.Document).to.be.eql({
      modelName: 'Document',
      bucketName: 'documents',
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

  it('should write file to File bucket', done => {
    const filename = 'file.txt';
    const contentType = mimeTypeOf('.txt');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { File } = createModels();

    File.write(options, readStream, (error, file) => {
      expect(error).to.not.exist;
      expect(file).to.exist;
      expect(file._id).to.exist;
      expect(file.filename).to.exist;
      expect(file.contentType).to.exist;
      expect(file.length).to.exist;
      expect(file.chunkSize).to.exist;
      expect(file.uploadDate).to.exist;
      expect(file.md5).to.exist;
      done(error, file);
    });
  });

  it('should write image to Image bucket', done => {
    const filename = 'image.png';
    const contentType = mimeTypeOf('.png');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Image } = createModels();

    Image.write(options, readStream, (error, image) => {
      expect(error).to.not.exist;
      expect(image).to.exist;
      expect(image._id).to.exist;
      expect(image.filename).to.exist;
      expect(image.contentType).to.exist;
      expect(image.length).to.exist;
      expect(image.chunkSize).to.exist;
      expect(image.uploadDate).to.exist;
      expect(image.md5).to.exist;
      done(error, image);
    });
  });

  it('should write audio to Audio bucket', done => {
    const filename = 'audio.mp3';
    const contentType = mimeTypeOf('.mp3');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Audio } = createModels();

    Audio.write(options, readStream, (error, audio) => {
      expect(error).to.not.exist;
      expect(audio).to.exist;
      expect(audio._id).to.exist;
      expect(audio.filename).to.exist;
      expect(audio.contentType).to.exist;
      expect(audio.length).to.exist;
      expect(audio.chunkSize).to.exist;
      expect(audio.uploadDate).to.exist;
      expect(audio.md5).to.exist;
      done(error, audio);
    });
  });

  it('should write video to Video bucket', done => {
    const filename = 'video.mp4';
    const contentType = mimeTypeOf('.mp4');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Video } = createModels();

    Video.write(options, readStream, (error, video) => {
      expect(error).to.not.exist;
      expect(video).to.exist;
      expect(video._id).to.exist;
      expect(video.filename).to.exist;
      expect(video.contentType).to.exist;
      expect(video.length).to.exist;
      expect(video.chunkSize).to.exist;
      expect(video.uploadDate).to.exist;
      expect(video.md5).to.exist;
      done(error, video);
    });
  });
});

describe.only('Document', () => {
  let doc;

  it('should write document to the bucket', done => {
    const filename = 'document.doc';
    const contentType = mimeTypeOf('.doc');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Document } = createModels();

    Document.write(options, readStream, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.exist;
      expect(created.filename).to.exist;
      expect(created.contentType).to.exist;
      expect(created.length).to.exist;
      expect(created.chunkSize).to.exist;
      expect(created.uploadDate).to.exist;
      expect(created.md5).to.exist;
      doc = created;
      done(error, created);
    });
  });

  it('should return `Buffer` when read with callback', done => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    Document.read(options, (error, content) => {
      expect(error).to.not.exist;
      expect(content).to.exist;
      expect(isBuffer(content)).to.be.true;
      done(error, content);
    });
  });

  it('should return readable stream when read with no callback', done => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    const stream = Document.read(options);
    expect(isReadableStream(stream)).to.be.true;
    done();
  });

  it('should unlink document from the bucket', done => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    Document.unlink(options, (error, unlinked) => {
      expect(error).to.not.exist;
      expect(unlinked).to.exist;
      expect(unlinked._id).to.exist.and.be.eql(doc._id);
      expect(unlinked.filename).to.exist.and.be.eql(doc.filename);
      expect(unlinked.contentType).to.exist.and.be.eql(doc.contentType);
      expect(unlinked.length).to.exist.and.be.eql(doc.length);
      expect(unlinked.chunkSize).to.exist.and.be.eql(doc.chunkSize);
      expect(unlinked.uploadDate).to.exist.and.be.eql(doc.uploadDate);
      expect(unlinked.md5).to.exist.and.be.eql(doc.md5);
      done(error, unlinked);
    });
  });
});

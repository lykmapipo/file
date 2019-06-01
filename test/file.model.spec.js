import { ObjectId } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Buckets, FileTypes } from '../src/file.model';

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
});

describe('File Instance', () => {});

describe('File Validations', () => {});

describe('File Statics', () => {});

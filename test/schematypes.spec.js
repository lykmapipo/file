import { ObjectId } from '@lykmapipo/mongoose-common';
import { expect, createTestModel } from '@lykmapipo/mongoose-test-helpers';
import { FileTypes } from '../src/file.model';

describe.only('SchemaTypes', () => {
  it('should expose valid schema paths definition', () => {
    const ChangeLog = createTestModel({
      image: FileTypes.Image,
      audio: FileTypes.Audio,
      video: FileTypes.Video,
      document: FileTypes.Document,
      file: FileTypes.File,
    });

    const image = ChangeLog.path('image');
    expect(image).to.exist;
    expect(image).to.be.an.instanceof(ObjectId);
    expect(image.options).to.exist;
    expect(image.options.ref).to.be.equal('Image');
    expect(image.options.autopopulate).to.be.true;

    const audio = ChangeLog.path('audio');
    expect(audio).to.exist;
    expect(audio).to.be.an.instanceof(ObjectId);
    expect(audio.options).to.exist;
    expect(audio.options.ref).to.be.equal('Audio');
    expect(audio.options.autopopulate).to.be.true;

    const video = ChangeLog.path('video');
    expect(video).to.exist;
    expect(video).to.be.an.instanceof(ObjectId);
    expect(video.options).to.exist;
    expect(video.options.ref).to.be.equal('Video');
    expect(video.options.autopopulate).to.be.true;

    const doc = ChangeLog.path('document');
    expect(doc).to.exist;
    expect(doc).to.be.an.instanceof(ObjectId);
    expect(doc.options).to.exist;
    expect(doc.options.ref).to.be.equal('Document');
    expect(doc.options.autopopulate).to.be.true;

    const file = ChangeLog.path('file');
    expect(file).to.exist;
    expect(file).to.be.an.instanceof(ObjectId);
    expect(file.options).to.exist;
    expect(file.options.ref).to.be.equal('File');
    expect(file.options.autopopulate).to.be.true;
  });
});

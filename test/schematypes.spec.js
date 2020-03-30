import { join as joinPath } from 'path';
import { createReadStream } from 'fs';
import { getType as mimeTypeOf } from 'mime';
import { ObjectId } from '@lykmapipo/mongoose-common';
import {
  expect,
  faker,
  createTestModel,
} from '@lykmapipo/mongoose-test-helpers';
import {
  post,
  testUpload,
  clear as clearHttp,
} from '@lykmapipo/express-test-helpers';
import actions from 'mongoose-rest-actions';
import {
  FileTypes,
  createModels,
  uploaderFor,
  AUTOPOPULATE_OPTIONS,
} from '../src/file.model';

const readStreamFor = (filename) => {
  return createReadStream(joinPath(__dirname, 'fixtures', filename));
};

describe('SchemaTypes', () => {
  let image;
  let audio;
  let video;
  let doc;
  let changelog;

  const ChangeLog = createTestModel(
    {
      image: FileTypes.Image,
      audio: FileTypes.Audio,
      video: FileTypes.Video,
      document: FileTypes.Document,
      file: FileTypes.File,
    },
    actions
  );

  before(() => clearHttp());

  before((done) => {
    const filename = 'image.png';
    const contentType = mimeTypeOf('.png');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Image } = createModels();

    Image.write(options, readStream, (error, created) => {
      image = created;
      done(error, created);
    });
  });

  before((done) => {
    const filename = 'audio.mp3';
    const contentType = mimeTypeOf('.mp3');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Audio } = createModels();

    Audio.write(options, readStream, (error, created) => {
      audio = created;
      done(error, created);
    });
  });

  before((done) => {
    const filename = 'video.mp4';
    const contentType = mimeTypeOf('.mp4');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Video } = createModels();

    Video.write(options, readStream, (error, created) => {
      video = created;
      done(error, created);
    });
  });

  before((done) => {
    const filename = 'document.doc';
    const contentType = mimeTypeOf('.doc');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Document } = createModels();

    Document.write(options, readStream, (error, created) => {
      doc = created;
      done(error, created);
    });
  });

  it('should expose valid schema paths definition', () => {
    const imagePath = ChangeLog.path('image');
    expect(imagePath).to.exist;
    expect(imagePath).to.be.an.instanceof(ObjectId);
    expect(imagePath.options).to.exist;
    expect(imagePath.options.ref).to.be.equal('Image');
    expect(imagePath.options.autopopulate).to.be.eql(AUTOPOPULATE_OPTIONS);

    const audioPath = ChangeLog.path('audio');
    expect(audioPath).to.exist;
    expect(audioPath).to.be.an.instanceof(ObjectId);
    expect(audioPath.options).to.exist;
    expect(audioPath.options.ref).to.be.equal('Audio');
    expect(audioPath.options.autopopulate).to.be.eql(AUTOPOPULATE_OPTIONS);

    const videoPath = ChangeLog.path('video');
    expect(videoPath).to.exist;
    expect(videoPath).to.be.an.instanceof(ObjectId);
    expect(videoPath.options).to.exist;
    expect(videoPath.options.ref).to.be.equal('Video');
    expect(videoPath.options.autopopulate).to.be.eql(AUTOPOPULATE_OPTIONS);

    const documentPath = ChangeLog.path('document');
    expect(documentPath).to.exist;
    expect(documentPath).to.be.an.instanceof(ObjectId);
    expect(documentPath.options).to.exist;
    expect(documentPath.options.ref).to.be.equal('Document');
    expect(documentPath.options.autopopulate).to.be.eql(AUTOPOPULATE_OPTIONS);

    const filePath = ChangeLog.path('file');
    expect(filePath).to.exist;
    expect(filePath).to.be.an.instanceof(ObjectId);
    expect(filePath.options).to.exist;
    expect(filePath.options.ref).to.be.equal('File');
    expect(filePath.options.autopopulate).to.be.eql(AUTOPOPULATE_OPTIONS);
  });

  it('should be able to create with files', (done) => {
    changelog = ChangeLog.fake();
    changelog.set({ image, audio, video, document: doc });

    ChangeLog.create(changelog, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created.image).to.exist;
      expect(created.image._id).to.exist.and.be.eql(image._id);
      expect(created.audio).to.exist;
      expect(created.audio._id).to.exist.and.be.eql(audio._id);
      expect(created.video).to.exist;
      expect(created.video._id).to.exist.and.be.eql(video._id);
      expect(created.document).to.exist;
      expect(created.document._id).to.exist.and.be.eql(doc._id);
      done(error, created);
    });
  });

  it('should find and populate files paths', (done) => {
    ChangeLog.findById(changelog._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found.image).to.exist;
      expect(found.image._id).to.exist.and.be.eql(image._id);
      expect(found.audio).to.exist;
      expect(found.audio._id).to.exist.and.be.eql(audio._id);
      expect(found.video).to.exist;
      expect(found.video._id).to.exist.and.be.eql(video._id);
      expect(found.document).to.exist;
      expect(found.document._id).to.exist.and.be.eql(doc._id);
      done(error, found);
    });
  });

  it('should set uploaded file to model file paths', (done) => {
    const files = {
      aliases: faker.random.word(),
      attach: {
        audio: `${__dirname}/fixtures/audio.mp3`,
        document: `${__dirname}/fixtures/document.doc`,
        file: `${__dirname}/fixtures/file.txt`,
        image: `${__dirname}/fixtures/image.png`,
        video: `${__dirname}/fixtures/video.mp4`,
      },
    };

    post('/v1/changelogs', uploaderFor(), (request, response) => {
      response.created(request.body);
    });

    testUpload('/v1/changelogs', files)
      .expect('Content-Type', /json/)
      .expect(201, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body.audio).to.exist;
        expect(body.document).to.exist;
        expect(body.file).to.exist;
        expect(body.image).to.exist;
        expect(body.video).to.exist;
        done(error, body);
      });
  });

  after(() => clearHttp());
});

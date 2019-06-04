import {
  clear as clearDatabase,
  expect,
  faker,
} from '@lykmapipo/mongoose-test-helpers';
import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import fileRouter from '../src/file.http.router';

const properties = [
  'length',
  'chunkSize',
  'uploadDate',
  'md5',
  'filename',
  'contentType',
  'aliases',
  'metadata',
  '_id',
  '__v',
  'id',
  'createdAt',
  'updatedAt',
];

const options = {
  pathSingle: '/files/:bucket/:id',
  pathList: '/files/:bucket',
  pathSchema: '/files/:bucket/schema',
  pathUpload: '/files/:bucket',
  pathDownload: '/files/:bucket/:id/download',
  pathStream: '/files/:bucket/:id/chunks',
};

describe('Audio HTTP API', () => {
  before(() => clearHttp());
  before(done => clearDatabase(done));

  let file;

  it('should handle HTTP POST on /files/:bucket', done => {
    const upload = {
      bucket: 'audios',
      aliases: faker.random.word(),
      attach: { audio: `${__dirname}/fixtures/audio.mp3` },
    };
    const { testUpload } = testRouter(options, fileRouter);
    testUpload(upload)
      .expect('Content-Type', /json/)
      .expect(201, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist;
        expect(body.filename).to.exist;
        expect(body.contentType).to.exist;
        expect(body.length).to.exist;
        expect(body.chunkSize).to.exist;
        expect(body.uploadDate).to.exist;
        expect(body.md5).to.exist;
        expect(body.stream).to.exist;
        expect(body.download).to.exist;
        file = body;
        done(error, body);
      });
  });

  it('should throw when HTTP POST on /files/:bucket with no file', done => {
    const upload = {
      bucket: 'audios',
      aliases: faker.random.word(),
    };
    const { testUpload } = testRouter(options, fileRouter);
    testUpload(upload)
      .expect('Content-Type', /json/)
      .expect(400, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body.code).to.be.equal(400);
        expect(body.status).to.be.equal(400);
        expect(body.name).to.be.equal('ValidationError');
        expect(body.message).to.be.equal('Validation failed');
        expect(body.description).to.be.equal('Validation failed');
        expect(body.errors.audio.message).to.be.equal(
          'Path `audio` is required.'
        );
        expect(body.errors.audio.name).to.be.equal('ValidatorError');
        expect(body.errors.audio.type).to.be.equal('required');
        expect(body.errors.audio.kind).to.be.equal('required');
        expect(body.errors.audio.path).to.be.equal('audio');
        done(error, body);
      });
  });

  it('should handle HTTP GET on /files/:bucket', done => {
    const { testGet } = testRouter(options, fileRouter);
    const params = { bucket: 'audios' };
    testGet(params)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.data).to.have.length.at.least(1);
        expect(body.total).to.exist;
        expect(body.total).to.be.at.least(1);
        expect(body.limit).to.exist;
        expect(body.limit).to.be.equal(10);
        expect(body.skip).to.exist;
        expect(body.skip).to.be.equal(0);
        expect(body.page).to.exist;
        expect(body.page).to.be.equal(1);
        expect(body.pages).to.exist;
        expect(body.pages).to.be.at.least(1);
        expect(body.lastModified).to.exist;
        expect(body.hasMore).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /files/:bucket/schema', done => {
    const { testGetSchema } = testRouter(options, fileRouter);
    testGetSchema({ bucket: 'audios' }).expect(200, (error, { body }) => {
      expect(error).to.not.exist;
      expect(body).to.exist;
      expect(body).to.have.all.keys('title', 'type', 'properties');
      expect(body.properties).to.have.any.keys(...properties);
      done(error, body);
    });
  });

  it('should handle HTTP GET on /files/:bucket/:id', done => {
    const { testGet } = testRouter(options, fileRouter);
    const params = { bucket: 'audios', id: file._id };
    testGet(params)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist.and.be.eql(file._id);
        expect(body.filename).to.exist.and.be.eql(file.filename);
        expect(body.contentType).to.exist.and.be.eql(file.contentType);
        expect(body.length).to.exist.and.be.eql(file.length);
        expect(body.chunkSize).to.exist.and.be.eql(file.chunkSize);
        expect(body.uploadDate).to.exist.and.be.eql(file.uploadDate);
        expect(body.md5).to.exist.and.be.eql(file.md5);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /files/:bucket/:id/chunks', done => {
    const { testStream } = testRouter(options, fileRouter);
    const params = { bucket: 'audios', id: file._id };
    testStream(params)
      .expect('Content-Type', 'audio/mpeg')
      .expect(200, (error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /files/:bucket/:id/download', done => {
    const { testDownload } = testRouter(options, fileRouter);
    const params = { bucket: 'audios', id: file._id };
    testDownload(params)
      .expect('Content-Type', 'audio/mpeg')
      .expect('Content-Disposition', 'attachment; filename="audio.mp3"')
      .expect(200, (error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /files/:bucket/:id', done => {
    const { testPatch } = testRouter(options, fileRouter);
    const updates = { metadata: { owner: faker.name.findName() } };
    const params = { bucket: 'audios', id: file._id };
    testPatch(params, updates)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist.and.be.eql(file._id);
        expect(body.filename).to.exist.and.be.eql(file.filename);
        expect(body.contentType).to.exist.and.be.eql(file.contentType);
        expect(body.length).to.exist.and.be.eql(file.length);
        expect(body.chunkSize).to.exist.and.be.eql(file.chunkSize);
        expect(body.uploadDate).to.exist.and.be.eql(file.uploadDate);
        expect(body.md5).to.exist.and.be.eql(file.md5);
        expect(body.metadata).to.exist.and.be.eql(updates.metadata);
        file = body;
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /files/:bucket/:id', done => {
    const { testPut } = testRouter(options, fileRouter);
    const updates = { metadata: { owner: faker.name.findName() } };
    const params = { bucket: 'audios', id: file._id };
    testPut(params, updates)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist.and.be.eql(file._id);
        expect(body.filename).to.exist.and.be.eql(file.filename);
        expect(body.contentType).to.exist.and.be.eql(file.contentType);
        expect(body.length).to.exist.and.be.eql(file.length);
        expect(body.chunkSize).to.exist.and.be.eql(file.chunkSize);
        expect(body.uploadDate).to.exist.and.be.eql(file.uploadDate);
        expect(body.md5).to.exist.and.be.eql(file.md5);
        expect(body.metadata).to.exist.and.be.eql(updates.metadata);
        file = body;
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /files/:bucket/:id', done => {
    const { testDelete } = testRouter(options, fileRouter);
    const params = { bucket: 'audios', id: file._id };
    testDelete(params)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist.and.be.eql(file._id);
        expect(body.filename).to.exist.and.be.eql(file.filename);
        expect(body.contentType).to.exist.and.be.eql(file.contentType);
        expect(body.length).to.exist.and.be.eql(file.length);
        expect(body.chunkSize).to.exist.and.be.eql(file.chunkSize);
        expect(body.uploadDate).to.exist.and.be.eql(file.uploadDate);
        expect(body.md5).to.exist.and.be.eql(file.md5);
        done(error, body);
      });
  });

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

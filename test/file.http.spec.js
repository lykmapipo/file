import { mount } from '@lykmapipo/express-common';
import {
  clear as clearDatabase,
  expect,
  faker,
} from '@lykmapipo/mongoose-test-helpers';
import {
  clear as clearHttp,
  testRouter,
  testUpload,
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
];

const options = {
  pathSingle: '/files/:bucket/:id',
  pathList: '/files/:bucket',
  pathSchema: '/files/:bucket/schema',
};

describe('HTTP API', () => {
  before(() => clearHttp());
  before(done => clearDatabase(done));

  let file;

  it('should handle HTTP POST on /files/:bucket', done => {
    mount(fileRouter);
    const upload = {
      aliases: faker.random.words().split(' '),
      attach: { file: `${__dirname}/fixtures/file.txt` },
    };
    testUpload('/v1/files/files', upload)
      .expect('Content-Type', /json/)
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body._id).to.exist;
        expect(body.filename).to.exist;
        expect(body.contentType).to.exist;
        expect(body.length).to.exist;
        expect(body.chunkSize).to.exist;
        expect(body.uploadDate).to.exist;
        expect(body.md5).to.exist;
        file = body;
        done(error, body);
      });
  });

  it.skip('should handle HTTP GET on /files/:bucket', done => done());

  it('should handle HTTP GET on /files/:bucket/schema', done => {
    const { testGetSchema } = testRouter(options, fileRouter);
    testGetSchema({ bucket: 'files' }).expect(200, (error, { body }) => {
      expect(error).to.not.exist;
      expect(body).to.exist;
      expect(body).to.have.all.keys('title', 'type', 'properties');
      expect(body.properties).to.have.all.keys(...properties);
      done(error, body);
    });
  });

  it('should handle HTTP GET on /files/:bucket/:id', done => {
    const { testGet } = testRouter(options, fileRouter);
    const params = { bucket: 'files', id: file._id };
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

  it.skip('should handle HTTP PATCH on /files/:bucket/:id', done => done());
  it.skip('should handle HTTP PUT on /files/:bucket/:id', done => done());
  it.skip('should handle HTTP DELETE on /files/:bucket/:id', done => done());

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

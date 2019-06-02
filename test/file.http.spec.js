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

  it('should handle HTTP POST on /files/:bucket', done => {
    mount(fileRouter);
    const upload = {
      aliases: faker.random.words().split(' '),
      attach: { file: `${__dirname}/fixtures/file.txt` },
    };
    testUpload('/v1/files/files', upload).expect(200, (error, { body }) => {
      expect(error).to.not.exist;
      expect(body).to.exist;
      expect(body._id).to.exist;
      expect(body.filename).to.exist;
      expect(body.contentType).to.exist;
      expect(body.length).to.exist;
      expect(body.chunkSize).to.exist;
      expect(body.uploadDate).to.exist;
      expect(body.md5).to.exist;
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

  it.skip('should handle HTTP GET on /files/:bucket/:id', done => done());
  it.skip('should handle HTTP PATCH on /files/:bucket/:id', done => done());
  it.skip('should handle HTTP PUT on /files/:bucket/:id', done => done());
  it.skip('should handle HTTP DELETE on /files/:bucket/:id', done => done());

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

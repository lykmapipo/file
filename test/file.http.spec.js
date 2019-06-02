import {
  clear as clearDatabase,
  expect,
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
];

const options = {
  pathSingle: '/files/:bucket/:id',
  pathList: '/files/:bucket',
  pathSchema: '/files/:bucket/schema',
};

describe.only('HTTP API', () => {
  before(() => clearHttp());
  before(done => clearDatabase(done));

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

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

import {
  clear as clearDatabase,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import {
  clear as clearHttp,
  testRouter,
  testUpload,
} from '@lykmapipo/express-test-helpers';
import fileRouter from '../src/file.http.router';

describe.only('HTTP API', () => {
  before(() => clearHttp());
  before(done => clearDatabase(done));

  const options = {
    pathSingle: '/files/:bucket/:id',
    pathList: '/files/:bucket',
    pathSchema: '/files/:bucket/schema',
  };

  expect(testUpload).to.exist;

  it('should handle HTTP GET on /files/:bucket/schema', done => {
    const { testGetSchema } = testRouter(options, fileRouter);
    testGetSchema({ bucket: 'files' }).expect(200, done);
  });

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

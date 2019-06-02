import {
  clear as clearDatabase,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import {
  clear as clearHttp,
  testUpload,
} from '@lykmapipo/express-test-helpers';

describe.only('File - API', () => {
  before(() => clearHttp());
  before(done => clearDatabase(done));

  expect(clearDatabase).to.exist;
  expect(testUpload).to.exist;

  after(() => clearHttp());
  after(done => clearDatabase(done));
});

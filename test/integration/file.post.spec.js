import { expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File Static Post', () => {
  before(done => {
    File.deleteMany(done);
  });

  const file = File.fake();

  it('should be able to post', done => {
    File.post(file, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(file._id);
      expect(created.description).to.eql(file.description);
      done(error, created);
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

describe('File Instance Post', () => {
  before(done => {
    File.deleteMany(done);
  });

  const file = File.fake();

  it('should be able to post', done => {
    file.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(file._id);
      expect(created.description).to.eql(file.description);
      done(error, created);
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

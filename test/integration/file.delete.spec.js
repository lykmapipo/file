import { expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File Static Delete', () => {
  before(done => {
    File.deleteMany(done);
  });

  let file = File.fake();

  before(done => {
    file.post((error, created) => {
      file = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    File.del(file._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(file._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    File.del(file._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

describe('File Instance Delete', () => {
  before(done => {
    File.deleteMany(done);
  });

  let file = File.fake();

  before(done => {
    file.post((error, created) => {
      file = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    file.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(file._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    file.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(file._id);
      done();
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

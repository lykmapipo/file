import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File Static Patch', () => {
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

  it('should be able to patch', done => {
    file = file.fakeOnly('description');
    File.patch(file._id, file, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(file._id);
      expect(updated.name).to.eql(file.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = File.fake().toObject();
    File.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

describe('File Instance Patch', () => {
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

  it('should be able to patch', done => {
    file = file.fakeOnly('description');
    file.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(file._id);
      expect(updated.name).to.eql(file.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    file.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(file._id);
      done();
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

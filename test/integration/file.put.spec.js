import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File Static Put', () => {
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

  it('should be able to put', done => {
    file = file.fakeOnly('name');
    File.put(file._id, file, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(file._id);
      expect(updated.name).to.eql(file.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = File.fake().toObject();
    File.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
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

describe('File Instance Put', () => {
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

  it('should be able to put', done => {
    file = file.fakeOnly('name');
    file.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(file._id);
      expect(updated.name).to.eql(file.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    file.put((error, updated) => {
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

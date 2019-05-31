import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File getById', () => {
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

  it('should be able to get an instance', done => {
    File.getById(file._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(file._id);
      done(error, found);
    });
  });

  it('should be able to get with options', done => {
    const options = {
      _id: file._id,
      select: 'name',
    };

    File.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(file._id);
      expect(found.name).to.exist;

      // ...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map(['namespace', 'description', 'createdAt', 'updatedAt'], field => {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });
  });

  it('should throw if not exists', done => {
    const fake = File.fake();
    File.getById(fake._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => {
    File.deleteMany(done);
  });
});

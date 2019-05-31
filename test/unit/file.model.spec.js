import { expect } from '@lykmapipo/mongoose-test-helpers';
import File from '../../src/file.model';

describe('File Instance', () => {
  it('should have pre validate logics', () => {
    const file = File.fake();
    expect(file.preValidate).to.exist;
    expect(file.preValidate).to.be.a('function');
    expect(file.preValidate.length).to.be.equal(1);
    expect(file.preValidate.name).to.be.equal('preValidate');
  });

  it('should set abbreviation on pre validate', done => {
    const file = File.fakeExcept('abbreviation');

    expect(file.abbreviation).to.not.exist;
    file.preValidate(error => {
      expect(file.abbreviation).to.exist;
      done(error);
    });
  });

  it('should set correct namespace on pre validate', done => {
    const file = File.fake();
    file.set({ bucket: 'settings', namespace: null });

    expect(file.namespace).to.not.exist;
    file.preValidate(error => {
      expect(file.namespace).to.exist;
      expect(file.namespace).to.be.equal('Setting');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', done => {
    const file = File.fake();
    file.set({ namespace: 'Setting', bucket: null });

    expect(file.bucket).to.not.exist;
    file.preValidate(error => {
      expect(file.bucket).to.exist;
      expect(file.bucket).to.be.equal('settings');
      done(error);
    });
  });
});

describe('File Validations', () => {
  it('should throw if no name', done => {
    const file = File.fakeOnly('description');
    file.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.name).to.exist;
      expect(error.errors.name.name).to.be.equal('ValidatorError');
      done();
    });
  });
});

describe('File Statics', () => {
  it('should expose model name', () => {
    expect(File.MODEL_NAME).to.exist;
    expect(File.MODEL_NAME).to.be.equal('File');
  });

  it('should expose collection name', () => {
    expect(File.COLLECTION_NAME).to.exist;
    expect(File.COLLECTION_NAME).to.be.equal('files');
  });
});

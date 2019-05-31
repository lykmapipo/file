import path from 'path';
import _ from 'lodash';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { File } from '../../src/index';

describe('File Seed', () => {
  const { SEEDS_PATH, PREDEFINE_NAMESPACES } = process.env;

  before(done => clear(done));

  before(() => {
    process.env.PREDEFINE_NAMESPACES = 'Setting';
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', done => {
    File.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', done => {
    File.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = {
      namespace: 'Setting',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$',
    };
    File.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = {
      namespace: 'Setting',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$',
    };
    File.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', done => {
    const seed = {
      namespace: 'Setting',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$',
    };
    File.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', done => {
    File.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Setting' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', done => {
    File.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Setting' })).to.exist;
      done(error, seeded);
    });
  });

  after(done => clear(done));

  after(() => {
    process.env.PREDEFINE_NAMESPACES = PREDEFINE_NAMESPACES;
    process.env.SEEDS_PATH = SEEDS_PATH;
  });
});

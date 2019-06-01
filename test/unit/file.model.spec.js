import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Buckets } from '../../src/file.model';

describe('File', () => {
  it('should expose bucket definitions', () => {
    expect(Buckets).to.exist;
    expect(Buckets.File).to.exist;
    expect(Buckets.Image).to.exist;
    expect(Buckets.Audio).to.exist;
    expect(Buckets.Video).to.exist;
    expect(Buckets.Document).to.exist;
  });
});

describe('File Instance', () => {});

describe('File Validations', () => {});

describe('File Statics', () => {});

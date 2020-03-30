import { join as joinPath } from 'path';
import { createReadStream } from 'fs';
import { isBuffer } from 'lodash';
import { getType as mimeTypeOf } from 'mime';
import { readable as isReadableStream } from 'is-stream';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { createModels } from '../src/file.model';

const readStreamFor = (filename) => {
  return createReadStream(joinPath(__dirname, 'fixtures', filename));
};

describe('Image', () => {
  let image;

  it('should write image to the bucket', (done) => {
    const filename = 'image.png';
    const contentType = mimeTypeOf('.png');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Image } = createModels();

    Image.write(options, readStream, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.exist;
      expect(created.filename).to.exist;
      expect(created.contentType).to.exist;
      expect(created.length).to.exist;
      expect(created.chunkSize).to.exist;
      expect(created.uploadDate).to.exist;
      expect(created.md5).to.exist;
      expect(created.stream).to.exist;
      expect(created.download).to.exist;
      image = created;
      done(error, created);
    });
  });

  it('should return `Buffer` when read with callback', (done) => {
    const { Image } = createModels();
    const options = { _id: image._id };

    Image.read(options, (error, content) => {
      expect(error).to.not.exist;
      expect(content).to.exist;
      expect(isBuffer(content)).to.be.true;
      done(error, content);
    });
  });

  it('should return readable stream when read with no callback', (done) => {
    const { Image } = createModels();
    const options = { _id: image._id };

    const stream = Image.read(options);
    expect(isReadableStream(stream)).to.be.true;
    done();
  });

  it('should unlink image from the bucket', (done) => {
    const { Image } = createModels();
    const options = { _id: image._id };

    Image.unlink(options, (error, unlinked) => {
      expect(error).to.not.exist;
      expect(unlinked).to.exist;
      expect(unlinked._id).to.exist.and.be.eql(image._id);
      expect(unlinked.filename).to.exist.and.be.eql(image.filename);
      expect(unlinked.contentType).to.exist.and.be.eql(image.contentType);
      expect(unlinked.length).to.exist.and.be.eql(image.length);
      expect(unlinked.chunkSize).to.exist.and.be.eql(image.chunkSize);
      expect(unlinked.uploadDate).to.exist.and.be.eql(image.uploadDate);
      expect(unlinked.md5).to.exist.and.be.eql(image.md5);
      done(error, unlinked);
    });
  });
});

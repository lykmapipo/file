import { join as joinPath } from 'path';
import { createReadStream } from 'fs';
import { isBuffer } from 'lodash';
import { getType as mimeTypeOf } from 'mime';
import { readable as isReadableStream } from 'is-stream';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { createModels } from '../src/file.model';

const readStreamFor = filename => {
  return createReadStream(joinPath(__dirname, 'fixtures', filename));
};

describe.only('File', () => {
  let file;

  it('should write file to the bucket', done => {
    const filename = 'file.txt';
    const contentType = mimeTypeOf('.txt');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { File } = createModels();

    File.write(options, readStream, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.exist;
      expect(created.filename).to.exist;
      expect(created.contentType).to.exist;
      expect(created.length).to.exist;
      expect(created.chunkSize).to.exist;
      expect(created.uploadDate).to.exist;
      expect(created.md5).to.exist;
      file = created;
      done(error, created);
    });
  });

  it('should return `Buffer` when read with callback', done => {
    const { File } = createModels();
    const options = { _id: file._id };

    File.read(options, (error, content) => {
      expect(error).to.not.exist;
      expect(content).to.exist;
      expect(isBuffer(content)).to.be.true;
      done(error, content);
    });
  });

  it('should return readable stream when read with no callback', done => {
    const { File } = createModels();
    const options = { _id: file._id };

    const stream = File.read(options);
    expect(isReadableStream(stream)).to.be.true;
    done();
  });

  it('should unlink file from the bucket', done => {
    const { File } = createModels();
    const options = { _id: file._id };

    File.unlink(options, (error, unlinked) => {
      expect(error).to.not.exist;
      expect(unlinked).to.exist;
      expect(unlinked._id).to.exist.and.be.eql(file._id);
      expect(unlinked.filename).to.exist.and.be.eql(file.filename);
      expect(unlinked.contentType).to.exist.and.be.eql(file.contentType);
      expect(unlinked.length).to.exist.and.be.eql(file.length);
      expect(unlinked.chunkSize).to.exist.and.be.eql(file.chunkSize);
      expect(unlinked.uploadDate).to.exist.and.be.eql(file.uploadDate);
      expect(unlinked.md5).to.exist.and.be.eql(file.md5);
      done(error, unlinked);
    });
  });
});

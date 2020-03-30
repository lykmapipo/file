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

describe('Document', () => {
  let doc;

  it('should write document to the bucket', (done) => {
    const filename = 'document.doc';
    const contentType = mimeTypeOf('.doc');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Document } = createModels();

    Document.write(options, readStream, (error, created) => {
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
      doc = created;
      done(error, created);
    });
  });

  it('should return `Buffer` when read with callback', (done) => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    Document.read(options, (error, content) => {
      expect(error).to.not.exist;
      expect(content).to.exist;
      expect(isBuffer(content)).to.be.true;
      done(error, content);
    });
  });

  it('should return readable stream when read with no callback', (done) => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    const stream = Document.read(options);
    expect(isReadableStream(stream)).to.be.true;
    done();
  });

  it('should unlink document from the bucket', (done) => {
    const { Document } = createModels();
    const options = { _id: doc._id };

    Document.unlink(options, (error, unlinked) => {
      expect(error).to.not.exist;
      expect(unlinked).to.exist;
      expect(unlinked._id).to.exist.and.be.eql(doc._id);
      expect(unlinked.filename).to.exist.and.be.eql(doc.filename);
      expect(unlinked.contentType).to.exist.and.be.eql(doc.contentType);
      expect(unlinked.length).to.exist.and.be.eql(doc.length);
      expect(unlinked.chunkSize).to.exist.and.be.eql(doc.chunkSize);
      expect(unlinked.uploadDate).to.exist.and.be.eql(doc.uploadDate);
      expect(unlinked.md5).to.exist.and.be.eql(doc.md5);
      done(error, unlinked);
    });
  });
});

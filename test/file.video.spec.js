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

describe('Video', () => {
  let video;

  it('should write video to the bucket', done => {
    const filename = 'video.mp4';
    const contentType = mimeTypeOf('.mp4');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);

    const { Video } = createModels();

    Video.write(options, readStream, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.exist;
      expect(created.filename).to.exist;
      expect(created.contentType).to.exist;
      expect(created.length).to.exist;
      expect(created.chunkSize).to.exist;
      expect(created.uploadDate).to.exist;
      expect(created.md5).to.exist;
      video = created;
      done(error, created);
    });
  });

  it('should return `Buffer` when read with callback', done => {
    const { Video } = createModels();
    const options = { _id: video._id };

    Video.read(options, (error, content) => {
      expect(error).to.not.exist;
      expect(content).to.exist;
      expect(isBuffer(content)).to.be.true;
      done(error, content);
    });
  });

  it('should return readable stream when read with no callback', done => {
    const { Video } = createModels();
    const options = { _id: video._id };

    const stream = Video.read(options);
    expect(isReadableStream(stream)).to.be.true;
    done();
  });

  it('should unlink video from the bucket', done => {
    const { Video } = createModels();
    const options = { _id: video._id };

    Video.unlink(options, (error, unlinked) => {
      expect(error).to.not.exist;
      expect(unlinked).to.exist;
      expect(unlinked._id).to.exist.and.be.eql(video._id);
      expect(unlinked.filename).to.exist.and.be.eql(video.filename);
      expect(unlinked.contentType).to.exist.and.be.eql(video.contentType);
      expect(unlinked.length).to.exist.and.be.eql(video.length);
      expect(unlinked.chunkSize).to.exist.and.be.eql(video.chunkSize);
      expect(unlinked.uploadDate).to.exist.and.be.eql(video.uploadDate);
      expect(unlinked.md5).to.exist.and.be.eql(video.md5);
      done(error, unlinked);
    });
  });
});

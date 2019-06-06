'use strict';

/* dependencies */
const { resolve } = require('path');
const { createReadStream } = require('fs');
const { parallel } = require('async');
const { getType: mimeTypeOf } = require('mime');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { createModels } = require(`${__dirname}/..`);

const readStreamFor = filename => {
  const filePath = resolve(`${__dirname}/../test/fixtures/${filename}`);
  return createReadStream(filePath);
};

// ensure connections
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  // models
  const { File, Image, Audio, Video, Document } = createModels();

  // prepare clear
  const clearAll = next => clear(error => next(error));

  // prepare generic file seed
  const seedFile = next => {
    const filename = 'file.txt';
    const contentType = mimeTypeOf('.txt');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    File.write(options, readStream, error => next(error));
  };

  // prepare image file seed
  const seedImage = next => {
    const filename = 'image.png';
    const contentType = mimeTypeOf('.png');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Image.write(options, readStream, error => next(error));
  };

  // prepare audio file seed
  const seedAudio = next => {
    const filename = 'audio.mp3';
    const contentType = mimeTypeOf('.mp3');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Audio.write(options, readStream, error => next(error));
  };

  // prepare video file seed
  const seedVideo = next => {
    const filename = 'video.mp4';
    const contentType = mimeTypeOf('.mp4');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Video.write(options, readStream, error => next(error));
  };

  // prepare document file seed
  const seedDocument = next => {
    const filename = 'document.doc';
    const contentType = mimeTypeOf('.doc');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Document.write(options, readStream, error => next(error));
  };

  // do seeding
  clearAll(error => {
    const seeds = [seedFile, seedImage, seedAudio, seedVideo, seedDocument];
    parallel(seeds, error => {
      // re-throw if error
      if (error) {
        throw error;
      }
      process.exit(0);
    });
  });
});

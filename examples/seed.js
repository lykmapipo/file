'use strict';

/* dependencies */
const { createReadStream } = require('fs');
const { parallel } = require('async');
const { getType: mimeTypeOf } = require('mime');
const { connect } = require('@lykmapipo/mongoose-common');
const { createModels } = require(`${__dirname}/..`);

const readStreamFor = filename => {
  return createReadStream(`${__dirname}/../test/fixtures/${filename}`);
};

// ensure connections
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  // models
  const { File, Image, Audio, Video, Document } = createModels();

  // prepare generic file seed
  const seedFile = next => {
    const filename = 'file.txt';
    const contentType = mimeTypeOf('.txt');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    File.write(options, readStream, error => next(error));
  }

  // prepare image file seed
  const seedImage = next => {
    const filename = 'image.png';
    const contentType = mimeTypeOf('.png');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Image.write(options, readStream, error => next(error));
  }

  // prepare audio file seed
  const seedAudio = next => {
    const filename = 'audio.mp3';
    const contentType = mimeTypeOf('.mp3');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Audio.write(options, readStream, error => next(error));
  }

  // prepare video file seed
  const seedVideo = next => {
    const filename = 'video.mp4';
    const contentType = mimeTypeOf('.mp4');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Video.write(options, readStream, error => next(error));
  }

  // prepare document file seed
  const seedDocument = next => {
    const filename = 'document.doc';
    const contentType = mimeTypeOf('.doc');
    const options = { filename, contentType };
    const readStream = readStreamFor(filename);
    Document.write(options, readStream, error => next(error));
  }

  // do seeding
  const seeds = [seedFile, seedImage, seedAudio, seedVideo, seedDocument];
  parallel(seeds, error => {
    // re-throw if error
    if (error) {
      throw error;
    }
    process.exit(0);
  });

});

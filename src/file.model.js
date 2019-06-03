/**
 * @module File
 * @name File
 * @description A representation of stored and served file content i.e photos,
 * videos etc. on top of MongoDB GridFS.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * import fs from 'fs';
 * import { File } from '@lykmapipo/file';
 *
 * const in = fs.createReadStream('filename.txt');
 * File.wite({ filename }, in, (error, file) => { ... });
 *
 */
import { find, get, values } from 'lodash';
import { ObjectId } from '@lykmapipo/mongoose-common';
import { createModel, createBucket } from 'mongoose-gridfs';
import actions from 'mongoose-rest-actions';

/**
 * @constant Buckets
 * @name Buckets
 * @descriptions common allowed GridFS file buckets
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { Buckets } from '@lykmapipo/file';
 * Buckets.File; //=> { modelName: 'File', bucketName: 'fs' }
 *
 */
export const Buckets = {
  File: { modelName: 'File', bucketName: 'fs' },
  Image: { modelName: 'Image', bucketName: 'images' },
  Audio: { modelName: 'Audio', bucketName: 'audios' },
  Video: { modelName: 'Video', bucketName: 'videos' },
  Document: { modelName: 'Document', bucketName: 'documents' },
};

/**
 * @function FileTypes
 * @name FileTypes
 * @description SchemaType definitions for use with models to reference files
 * @return {Object} SchemaType definitions
 * @return {Object} SchemaType.File generic file path definition
 * @return {Object} SchemaType.Image image path definition
 * @return {Object} SchemaType.Audio audio path definition
 * @return {Object} SchemaType.Video Video path definition
 * @return {Object} SchemaType.Document document path definition
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { FileTypes } from '@lykmapipo/file';
 *
 * const Profile = new Schema({ avatar: FileTypes.Image });
 * const Song = new Schema({ stream: FileTypes.Audio });
 * const Movie = new Schema({ stream: FileTypes.Video });
 * const Invoice = new Schema({ document: FileTypes.Document });
 *
 */
export const FileTypes = {
  File: { type: ObjectId, ref: 'File', autopopulate: true },
  Image: { type: ObjectId, ref: 'Image', autopopulate: true },
  Audio: { type: ObjectId, ref: 'Audio', autopopulate: true },
  Video: { type: ObjectId, ref: 'Video', autopopulate: true },
  Document: { type: ObjectId, ref: 'Document', autopopulate: true },
};

/**
 * @function createBuckets
 * @name createBuckets
 * @description Create common GridFS buckets
 * @return {Object} Buckets valid GridFS buckets
 * @return {Model} Buckets.files valid File GridFS bucket
 * @return {Model} Buckets.images valid Image GridFS bucket
 * @return {Model} Buckets.audios valid Audio GridFS bucket
 * @return {Model} Buckets.videos valid Video GridFS bucket
 * @return {Model} Buckets.documents valid Document GridFS bucket
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { createBuckets } from '@lykmapipo/file';
 *
 * const { files, images, audio, video, documents } = createBuckets();
 *
 * files.writeFile({ filename }, stream, (error, file) => { ... });
 * files.readFile({ _id }, (error, file) => { ... });
 * files.unlink(_id, (error, _id) => { ... });
 *
 */
export const createBuckets = () => {
  // create common GridFS buckets
  const files = createBucket(Buckets.File);
  const images = createBucket(Buckets.Image);
  const audios = createBucket(Buckets.Audio);
  const videos = createBucket(Buckets.Video);
  const documents = createBucket(Buckets.Document);

  // return GridFS buckets
  return { files, images, audios, videos, documents };
};

/**
 * @function createModels
 * @name createModels
 * @description Create common file models
 * @return {Object} Models valid mongoose models
 * @return {Model} Models.File valid File mongoose model
 * @return {Model} Models.Image valid Image mongoose model
 * @return {Model} Models.Audio valid Audio mongoose model
 * @return {Model} Models.Video valid Video mongoose model
 * @return {Model} Models.Document valid Document mongoose model
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { createModels } from '@lykmapipo/file';
 *
 * const { File, Image, Audio, Video, Document } = createModels();
 *
 * File.write({ filename }, stream, (error, file) => { ... });
 * File.read({ _id }, (error, file) => { ... });
 * File.unlink(_id, (error, file) => { ... });
 * File.find((error, files) => { ... });
 *
 */
export const createModels = () => {
  // create common file models
  const File = createModel(Buckets.File, actions);
  const Image = createModel(Buckets.Image, actions);
  const Audio = createModel(Buckets.Audio, actions);
  const Video = createModel(Buckets.Video, actions);
  const Document = createModel(Buckets.Document, actions);

  // return file models
  return { File, Image, Audio, Video, Document };
};

/**
 * @function modelForBucket
 * @name modelForBucket
 * @description Derive model for a given bucket name
 * @return {Model} valid mongoose models
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { modelForBucket } from '@lykmapipo/file';
 *
 * const Image = modelForBucket('images');
 *
 * Image.write({ filename }, stream, (error, file) => { ... });
 * Image.read({ _id }, (error, file) => { ... });
 * Image.unlink(_id, (error, file) => { ... });
 * Image.find((error, files) => { ... });
 *
 */
export const modelForBucket = bucket => {
  // create models
  const models = createModels();

  // use default bucket options
  let bucketInfo = Buckets.File;

  // obtain options for specified bucket
  bucketInfo = find(values(Buckets), { bucketName: bucket }) || bucketInfo;

  // obtain model name for specified bucket
  const { modelName } = bucketInfo;

  // obtain GridFS model instace for specified bucket
  const Model = get(models, modelName);

  // return found GridFS model instance
  return Model;
};

/**
 * @function bucketFor
 * @name bucketFor
 * @description Derive GridFS instance for a given bucket name
 * @return {GridFSBucket} valid instance of GridFSBucket
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { bucketFor } from '@lykmapipo/file';
 *
 * const images = bucketFor('images');
 *
 * images.writeFile({ filename }, stream, (error, file) => { ... });
 * images.readFile({ _id }, (error, file) => { ... });
 * images.unlink(_id, (error, _id) => { ... });
 *
 */
export const bucketFor = bucket => {
  // create buckets
  const buckets = createBuckets();

  // use default bucket options
  let bucketInfo = Buckets.File;

  // obtain options for specified bucket
  bucketInfo = find(values(Buckets), { bucketName: bucket }) || bucketInfo;

  // obtain real bucket name for specified bucket
  const { bucketName } = bucketInfo;

  // obtain GridFSBucket instance
  const Bucket = get(buckets, bucketName) || buckets.files;

  // return found GridFSBucket instance
  return Bucket;
};

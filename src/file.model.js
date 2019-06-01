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
import { ObjectId } from '@lykmapipo/mongoose-common';
import { createModel } from 'mongoose-gridfs';

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
  const File = createModel(Buckets.File);
  const Image = createModel(Buckets.Image);
  const Audio = createModel(Buckets.Audio);
  const Video = createModel(Buckets.Video);
  const Document = createModel(Buckets.Document);

  // return file models
  return { File, Image, Audio, Video, Document };
};
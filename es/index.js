import { mergeObjects, uniq, pkg } from '@lykmapipo/common';
import { getString, apiVersion as apiVersion$1 } from '@lykmapipo/env';
import { Router, getFor, schemaFor, getByIdFor, patchFor, putFor, deleteFor } from '@lykmapipo/express-rest-actions';
export { start } from '@lykmapipo/express-rest-actions';
import { get, forEach, isEmpty, find, values, omit, first } from 'lodash';
import { ObjectId, validationErrorFor } from '@lykmapipo/mongoose-common';
import { createBucket, createModel } from 'mongoose-gridfs';
import multer from '@lykmapipo/multer';
import actions from 'mongoose-rest-actions';

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

const AUTOPOPULATE_OPTIONS = {
  select: { filename: 1, contentType: 1, stream: 1, download: 1, length: 1 },
  maxDepth: 1,
};

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
 * Buckets.File; //=> { modelName: 'File', bucketName: 'fs', field:'file' }
 *
 */
const Buckets = {
  File: { modelName: 'File', bucketName: 'fs', fieldName: 'file' },
  Image: { modelName: 'Image', bucketName: 'images', fieldName: 'image' },
  Audio: { modelName: 'Audio', bucketName: 'audios', fieldName: 'audio' },
  Video: { modelName: 'Video', bucketName: 'videos', fieldName: 'video' },
  Document: {
    modelName: 'Document',
    bucketName: 'documents',
    fieldName: 'document',
  },
};

/**
 * @constant bucketInfoFor
 * @name bucketInfoFor
 * @descriptions Obtain bucket information of a specified bucket name.
 * @param {String} [bucket='fs'] Valid bucket name
 * @return {Object} Valid bucket information
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { bucketInfoFor } from '@lykmapipo/file';
 * const bucketInfo = bucketInfoFor('fs');
 * //=> { modelName: 'File', bucketName: 'fs', field: 'file' }
 *
 */
const bucketInfoFor = (bucket = 'fs') => {
  // obtain bucket info or default
  const info = find(values(Buckets), { bucketName: bucket }) || Buckets.File;

  // return bucket info copy
  return mergeObjects(info);
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
const FileTypes = {
  File: { type: ObjectId, ref: 'File', autopopulate: AUTOPOPULATE_OPTIONS },
  Image: { type: ObjectId, ref: 'Image', autopopulate: AUTOPOPULATE_OPTIONS },
  Audio: { type: ObjectId, ref: 'Audio', autopopulate: AUTOPOPULATE_OPTIONS },
  Video: { type: ObjectId, ref: 'Video', autopopulate: AUTOPOPULATE_OPTIONS },
  Document: {
    type: ObjectId,
    ref: 'Document',
    autopopulate: AUTOPOPULATE_OPTIONS,
  },
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
const createBuckets = () => {
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
 * @description Create common GridFS file models
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
const createModels = () => {
  // schema plugin for file stream and download urls
  const urlsFor = bucketInfo => schema => {
    // obtain bucket name
    const { bucketName } = bucketInfo;

    // plugin stream url
    schema.virtual('stream').get(function stream() {
      const id = get(this, '_id');
      return `/files/${bucketName}/${id}/chunks`;
    });

    // plugin download url
    schema.virtual('download').get(function download() {
      const id = get(this, '_id');
      return `/files/${bucketName}/${id}/download`;
    });
  };

  // create common file models
  const File = createModel(Buckets.File, urlsFor(Buckets.File), actions);
  const Image = createModel(Buckets.Image, urlsFor(Buckets.Image), actions);
  const Audio = createModel(Buckets.Audio, urlsFor(Buckets.Audio), actions);
  const Video = createModel(Buckets.Video, urlsFor(Buckets.Video), actions);
  const Document = createModel(
    Buckets.Document,
    urlsFor(Buckets.Document),
    actions
  );

  // return file models
  return { File, Image, Audio, Video, Document };
};

/**
 * @function modelFor
 * @name modelFor
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
 * import { modelFor } from '@lykmapipo/file';
 *
 * const Image = modelFor('images');
 *
 * Image.write({ filename }, stream, (error, file) => { ... });
 * Image.read({ _id }, (error, file) => { ... });
 * Image.unlink(_id, (error, file) => { ... });
 * Image.find((error, files) => { ... });
 *
 */
const modelFor = (bucket = 'fs') => {
  // create models
  const models = createModels();

  // obtain model name for specified bucket
  const { modelName } = bucketInfoFor(bucket);

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
const bucketFor = (bucket = 'fs') => {
  // create buckets
  const buckets = createBuckets();

  // obtain options for specified bucket
  const { bucketName } = bucketInfoFor(bucket);

  // obtain GridFSBucket instance
  const Bucket = get(buckets, bucketName) || buckets.files;

  // return found GridFSBucket instance
  return Bucket;
};

/**
 * @function fileFilterFor
 * @name fileFilterFor
 * @description Derive multer file filter for a given bucket name
 * @return {Function} valid multer file filter
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import multer from 'multer';
 * import { fileFilterFor } from '@lykmapipo/file';
 *
 * const fileFilter = fileFilterFor('images');
 * const uploader = multer({ fileFilter }).any();
 *
 */
const fileFilterFor = (bucket = 'fs') => {
  // obtain bucket field name
  const { fieldName } = bucketInfoFor(bucket);

  // construct file filter
  const fileFilter = (request, file, cb) => {
    const isAllowed = file && file.fieldname === fieldName;
    cb(null, isAllowed);
  };

  // return bucket file filter
  return fileFilter;
};

/**
 * @function uploadErrorFor
 * @name uploadErrorFor
 * @description Derive upload validation error for a given paths.
 * @return {...String} path list of required field names not found while upload
 * @return {ValidationError} valid mongoose validation error
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { uploadErrorFor } from '@lykmapipo/file';
 *
 * const uploadError = uploadErrorFor('image');
 * //=> { name: 'ValidationError', ... }
 *
 */
const uploadErrorFor = (...path) => {
  // prepare required paths validator options
  const paths = {};
  forEach(uniq([...path]), pathName => {
    paths[pathName] = {
      type: 'required',
      path: pathName,
      value: undefined,
      reason: 'Not provided',
      message: 'Path `{PATH}` is required.',
    };
  });

  // build and return validation error
  const error = validationErrorFor({ paths });
  return error;
};

/**
 * @function bucketUploaderFor
 * @name bucketUploaderFor
 * @description Derive multer uploader for a given bucket name
 * @return {Object} uploader Derived bucket uploader details
 * @return {Model} uploader.File valid file model for the bucket
 * @return {String} uploader.fieldName expected file field name on the request
 * @return {Function} uploader.upload valid multer file uploader
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @private
 * @example
 *
 * import { bucketUploaderFor } from '@lykmapipo/file';
 *
 * const { upload }= bucketUploaderFor('images');
 * upload(request, response, error => { ... });
 *
 */
const bucketUploaderFor = (bucket = 'fs') => {
  // obtain bucket options
  const { fieldName, bucketName } = bucketInfoFor(bucket);

  // obtain GridFSBucket storage
  const storage = bucketFor(bucketName);

  // obtain model for the bucket
  const File = modelFor(bucketName);

  // const file filter
  const fileFilter = fileFilterFor(bucketName);

  // create multer file uploader
  const upload = multer({ storage, fileFilter }).any();

  // return multer upload handler with bucket info
  return { fieldName, bucketName, upload, File };
};

/**
 * @function uploderFor
 * @name uploderFor
 * @description Conventional upload middleware for use with file types
 * @return {Function} valid multer file uploader for file, image, audio, video,
 * document field names.
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { post } from '@lykmapipo/express-common';
 * import { uploderFor } from '@lykmapipo/file';
 *
 * post('/v1/changelogs', uploadFor(), (request, response, next) => {
 *   console.log(request.body);
 *   //=> { image: ..., audio: ..., video: ..., ... }
 * });
 *
 */
const uploaderFor = () => {
  // build file upload middleware
  return (request, response, next) => {
    // create buckets
    const { files, images, audios, videos, documents } = createBuckets();

    // prepare per field storage bucket
    const storage = files;
    const storages = {
      file: files,
      image: images,
      audio: audios,
      video: videos,
      document: documents,
    };

    // TODO: handle different fieldnames
    // TODO: handle required fieldname
    // TODO: handle array of files per fieldname

    // create multi storage multer uploader
    const upload = multer({ storage, storages }).any();

    // handle bucket file upload
    upload(request, response, error => {
      // backoff on error
      if (error) {
        return next(error);
      }

      // ignore if no file uploaded
      if (isEmpty(request.files)) {
        return next();
      }

      // attach uploaded file to request body
      request.body = !isEmpty(request.body) ? request.body : {};
      forEach(request.files, file => {
        const File = modelFor(file.fieldname);
        request.body[file.fieldname] = new File(file);
      });

      // continue after upload
      return next();
    });
  };
};

/**
 * @apiDefine File File
 *
 * @apiDescription A representation of stored and served file content i.e photos,
 * videos etc. on top of MongoDB GridFS.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/files/:bucket/:id';
const PATH_CHUNKS = '/files/:bucket/:id/chunks';
const PATH_DOWNLOAD = '/files/:bucket/:id/download';
const PATH_LIST = '/files/:bucket';
const PATH_SCHEMA = '/files/:bucket/schema';

/* declarations */
const router = new Router({ version: API_VERSION });

/**
 * @api {get} /files/:bucket List Files
 * @apiVersion 1.0.0
 * @apiName GetFiles
 * @apiGroup File
 * @apiDescription Returns a list of files
 * @apiUse RequestHeaders
 * @apiUse Files
 *
 * @apiUse RequestHeadersExample
 * @apiUse FilesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      return File.get(omit(options, 'filter.bucket'), done);
    },
  })
);

/**
 * @api {get} /files/:bucket/schema Get File Schema
 * @apiVersion 1.0.0
 * @apiName GetFileSchema
 * @apiGroup File
 * @apiDescription Returns file json schema definition
 * @apiUse RequestHeaders
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      const jsonSchema = File.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @api {post} /files/:bucket Create New File
 * @apiVersion 1.0.0
 * @apiName PostFile
 * @apiGroup File
 * @apiDescription Create new file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse FileSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, (request, response, next) => {
  // prepare bucket upload hanlder
  const { bucket = 'fs' } = request.params;
  const { upload, fieldName, File } = bucketUploaderFor(bucket);

  // handle bucket file upload
  upload(request, response, error => {
    // backoff on error
    if (error) {
      return next(error);
    }
    // handle file validation error
    if (isEmpty(request.files)) {
      const uploadError = uploadErrorFor(fieldName);
      return next(uploadError);
    }
    // build response
    const file = new File(first(request.files));
    return response.created(file);
  });
});

/**
 * @api {get} /files/:bucket/:id/chunks Stream Existing File
 * @apiVersion 1.0.0
 * @apiName StreamFile
 * @apiGroup File
 * @apiDescription Stream existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_CHUNKS, (request, response, next) => {
  const { id, bucket } = request.params;
  const File = modelFor(bucket);
  File.getById(id, (error, file) => {
    if (error) {
      return next(error);
    }
    response.type(file.contentType);
    return file.read().pipe(response);
  });
});

/**
 * @api {get} /files/:bucket/:id/download Download Existing File
 * @apiVersion 1.0.0
 * @apiName DownloadFile
 * @apiGroup File
 * @apiDescription Download existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_DOWNLOAD, (request, response, next) => {
  const { id, bucket } = request.params;
  const File = modelFor(bucket);
  File.getById(id, (error, file) => {
    if (error) {
      return next(error);
    }
    response.attachment(file.filename);
    return file.read().pipe(response);
  });
});

/**
 * @api {get} /files/:bucket/:id Get Existing File
 * @apiVersion 1.0.0
 * @apiName GetFile
 * @apiGroup File
 * @apiDescription Get existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse FileSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      return File.getById(omit(options, 'filter.bucket'), done);
    },
  })
);

/**
 * @api {patch} /files/:bucket/:id Patch Existing File
 * @apiVersion 1.0.0
 * @apiName PatchFile
 * @apiGroup File
 * @apiDescription Patch existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse FileSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      return File.patch(omit(options, 'filter.bucket'), done);
    },
  })
);

/**
 * @api {put} /files/:bucket/:id Put Existing File
 * @apiVersion 1.0.0
 * @apiName PutFile
 * @apiGroup File
 * @apiDescription Put existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse FileSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      return File.put(omit(options, 'filter.bucket'), done);
    },
  })
);

/**
 * @api {delete} /files/:bucket/:id Delete Existing File
 * @apiVersion 1.0.0
 * @apiName DeleteFile
 * @apiGroup File
 * @apiDescription Delete existing file
 * @apiUse RequestHeaders
 * @apiUse File
 *
 * @apiUse RequestHeadersExample
 * @apiUse FileSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    soft: false,
    del: (options, done) => {
      const File = modelFor(get(options, 'filter.bucket'));
      return File.unlink(get(options, '_id'), done);
    },
  })
);

/**
 * @module File
 * @name File
 * @description A representation of stored and served file content i.e photos,
 * videos etc. on top of MongoDB GridFS.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { start } = require('@lykmapipo/file');
 * start((error) => { ... });
 *
 */

const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

const apiVersion = apiVersion$1();

export { Buckets, FileTypes, apiVersion, bucketFor, createBuckets, createModels, router as fileRouter, info, modelFor, uploadErrorFor, uploaderFor };

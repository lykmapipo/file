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

/**
 * @apiDefine File
 * @apiSuccess {String} _id Unique file identifier.
 * @apiSuccess {Number} length The size of file in bytes.
 * @apiSuccess {Number} chuckSize The size of each file chunk in bytes.
 * @apiSuccess {Date} uploadDate The date the file was first stored.
 * @apiSuccess {String} md5 md5 file digest.
 * @apiSuccess {String} filename A human-readable file name.
 * @apiSuccess {String} contentType A valid MIME type for the file.
 * @apiSuccess {String[]} [aliases] An array of alias strings for the file.
 * @apiSuccess {Object} [metadata] The metadata field may be of any data type
 * and can hold any additional information you want to store.
 * @apiSuccess {String} stream A valid url relative to base url used
 * for streaming a file.
 * @apiSuccess {String} download A valid url relative to base url used
 * for downloading a file.
 *
 */

/**
 * @apiDefine Files
 * @apiSuccess {String} data._id Unique file identifier.
 * @apiSuccess {Number} data.length The size of file in bytes.
 * @apiSuccess {Number} data.chuckSize The size of each file chunk in bytes.
 * @apiSuccess {Date} data.uploadDate The date the file was first stored.
 * @apiSuccess {String} data.md5 md5 file digest.
 * @apiSuccess {String} data.filename A human-readable file name.
 * @apiSuccess {String} data.filename A human-readable file name.
 * @apiSuccess {String} data.contentType A valid MIME type for the file.
 * @apiSuccess {String[]} [data.aliases] An array of alias strings for the file.
 * @apiSuccess {Object} [data.metadata] The metadata field may be of any data
 * type and can hold any additional information you want to store.
 * @apiSuccess {String} stream A valid url relative to base url used
 * for streaming a file.
 * @apiSuccess {String} download A valid url relative to base url used
 * for downloading a file.
 * @apiSuccess {Number} total Total number of file
 * @apiSuccess {Number} size Number of files returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest file
 * was last modified
 *
 */

/**
 * @apiDefine FileSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "_id": "5cf27b2424f7781da035a7a9",
 *  "length": 9510,
 *  "chunkSize": 261120,
 *  "uploadDate": "2019-06-01T13:18:30.812Z",
 *  "md5": "1a390457089d61efab08550a85c1988a",
 *  "filename": "file.txt",
 *  "contentType": "text/plain"
 *  "aliases": ["notes"],
 *  "stream": "/files/documents/5cf6432dc3c6b6117efee74f/chunks",
 *  "download": "/files/documents/5cf6432dc3c6b6117efee74f/download"
 * }
 *
 */

/**
 * @apiDefine FilesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [{
 *    "_id": "5cf27b2424f7781da035a7a9",
 *    "length": 9510,
 *    "chunkSize": 261120,
 *    "uploadDate": "2019-06-01T13:18:30.812Z",
 *    "md5": "1a390457089d61efab08550a85c1988a",
 *    "filename": "file.txt",
 *    "contentType": "text/plain"
 *    "aliases": ["notes"],
 *    "stream": "/files/documents/5cf6432dc3c6b6117efee74f/chunks",
 *    "download": "/files/documents/5cf6432dc3c6b6117efee74f/download"
 *   }],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 *
 */

/* dependencies */
import { first, get, isEmpty, omit } from 'lodash';
import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  getByIdFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import { modelFor, bucketUploaderFor, uploadErrorFor } from './file.model';

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
  upload(request, response, (error) => {
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

/* expose file router */
export default router;

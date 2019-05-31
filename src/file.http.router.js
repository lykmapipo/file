/**
 * @apiDefine File File
 *
 * @apiDescription A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/**
 * @apiDefine File
 * @apiSuccess {String} _id Unique file identifier
 * @apiSuccess {String} name Human readable value of a file.
 * @apiSuccess {String} [code] Human(and machine) readable, unique identifier
 * of a prefined.
 * @apiSuccess {String} [symbol] A mark or sign that representing a prefined.
 * @apiSuccess {String} [abbreviation] Human readable short form of a
 * file value.
 * @apiSuccess {String} [description] A brief summary about a file if
 * available i.e additional details that clarify what a file is for.
 * @apiSuccess {Number} [weight=0] Weight of the file to help in ordering
 * files of a given namespace.
 * @apiSuccess {String} [color] A color in hexadecimal format used to
 * differentiate filed value visually from one other.
 * @apiSuccess {String} [icon] An icon in url or base64 format used to
 * differentiate files visually.
 * @apiSuccess {Geometry} [geometry] A geo-geometry representation of a
 * filed.
 * @apiSuccess {Map} [properties] A map of key value pairs to allow to associate
 * other meaningful information to a filed.
 * @apiSuccess {Date} [createdAt] Date when file was created
 * @apiSuccess {Date} [updatedAt] Date when file was last updated
 *
 */

/**
 * @apiDefine Files
 * @apiSuccess {Object[]} data List of files
 * @apiSuccess {String} data._id Unique file identifier
 * @apiSuccess {String} data.name Human readable value of a file.
 * @apiSuccess {String} [data.code] Human(and machine) readable, unique
 * identifier of a prefined.
 * @apiSuccess {String} [data.symbol] A mark or sign that representing a
 * prefined.
 * @apiSuccess {String} [data.abbreviation] Human readable short form of a
 * file value.
 * @apiSuccess {String} [data.description] A brief summary about a file if
 * available i.e additional details that clarify what a file is for.
 * @apiSuccess {Number} [data.weight=0] Weight of the file to help in
 * ordering files of a given namespace.
 * @apiSuccess {String} [data.color] A color in hexadecimal format used to
 * differentiate filed value visually from one other.
 * @apiSuccess {String} [data.icon] An icon in url or base64 format used to
 * differentiate files visually.
 * @apiSuccess {Geometry} [data.geometry] A geo-geometry representation of a
 * filed.
 * @apiSuccess {Map} [data.properties] A map of key value pairs to allow to
 * associate other meaningful information to a filed.
 * @apiSuccess {Date} [data.createdAt] Date when file was created
 * @apiSuccess {Date} [data.updatedAt] Date when file was last updated
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
 *   _id: "5ce1a93ba7e7a56060e42981",
 *   name: "Kilogram",
 *   code: "Kg",
 *   abbreviation: "Kg",
 *   weight: 0,
 *   color: "#F2AB6D",
 *   updatedAt: "2019-05-19T19:09:52.261Z",
 *   createdAt: "2019-05-19T19:06:35.721Z"
 * }
 *
 */

/**
 * @apiDefine FilesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [{
 *     _id: "5ce1a93ba7e7a56060e42981",
 *     name: "Kilogram",
 *     code: "Kg",
 *     abbreviation: "Kg",
 *     weight: 0,
 *     color: "#F2AB6D",
 *     updatedAt: "2019-05-19T19:09:52.261Z",
 *     createdAt: "2019-05-19T19:06:35.721Z"
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
import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import File from './file.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/files/:bucket/:id';
const PATH_LIST = '/files/:bucket';
const PATH_SCHEMA = '/files/:bucket/schema/';

/* declarations */
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /files List Files
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
    get: (options, done) => File.get(options, done),
  })
);

/**
 * @api {get} /files/schema Get File Schema
 * @apiVersion 1.0.0
 * @apiName GetFileSchema
 * @apiGroup File
 * @apiDescription Returns file json schema definition
 * @apiUse RequestHeaders
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = File.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @api {post} /files Create New File
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
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => File.post(body, done),
  })
);

/**
 * @api {get} /files/:id Get Existing File
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
    getById: (options, done) => File.getById(options, done),
  })
);

/**
 * @api {patch} /files/:id Patch Existing File
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
    patch: (options, done) => File.patch(options, done),
  })
);

/**
 * @api {put} /files/:id Put Existing File
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
    put: (options, done) => File.put(options, done),
  })
);

/**
 * @api {delete} /files/:id Delete Existing File
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
    del: (options, done) => File.del(options, done),
    soft: true,
  })
);

/* expose file router */
export default router;

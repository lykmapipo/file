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
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { start } from '@lykmapipo/express-rest-actions';
import {
  Buckets,
  FileTypes,
  createBuckets,
  createModels,
  modelFor,
  bucketFor,
} from './file.model';
import fileRouter from './file.http.router';

export const info = pkg(
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

export const apiVersion = httpApiVersion();

export {
  Buckets,
  FileTypes,
  createBuckets,
  createModels,
  modelFor,
  bucketFor,
  fileRouter,
  start,
};

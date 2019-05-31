/**
 * @module File
 * @name File
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { File } = require('@lykmapipo/file');
 *
 * const unit = {
 *  namespace: 'Unit',
 *  name: 'Kilogram',
 *  code: 'Kg',
 *  abbreviation: 'Kg'
 * };
 * File.create({}, (error, created) => { ... });
 *
 */

/* dependencies */
import _ from 'lodash';
import randomColor from 'randomcolor';
import { sortedUniq, abbreviate } from '@lykmapipo/common';
import { getString, getStrings } from '@lykmapipo/env';
import {
  createSchema,
  model,
  collectionNameOf,
} from '@lykmapipo/mongoose-common';
import { Geometry } from 'mongoose-geojson-schemas';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

/* constants */
const MODEL_NAME = getString('PREDEFINE_MODEL_NAME', 'File');
const COLLECTION_NAME = getString('PREDEFINE_COLLECTION_NAME', 'files');
const SCHEMA_OPTIONS = { collection: COLLECTION_NAME };
const DEFAULT_NAMESPACE = getString('PREDEFINE_DEFAULT_NAMESPACE', 'Setting');
const NAMESPACES = sortedUniq([
  DEFAULT_NAMESPACE,
  ...getStrings('PREDEFINE_NAMESPACES', DEFAULT_NAMESPACE),
]);
const NAMESPACE_MAP = _.map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});
const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);
const BUCKETS = sortedUniq(_.map(NAMESPACE_MAP, 'bucket'));

/**
 * @name FileSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const FileSchema = createSchema(
  {
    /**
     * @name namespace
     * @alias domain
     * @description Human readable namespace of a filed.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark field as required
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} hide - mark field as hidden
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Unit, Currency
     *
     */
    namespace: {
      type: String,
      trim: true,
      required: true,
      enum: NAMESPACES,
      index: true,
      searchable: true,
      taggable: true,
      hide: true,
      default: DEFAULT_NAMESPACE,
      fake: true,
    },

    /**
     * @name bucket
     * @alias collection
     * @alias key
     * @description Machine readable collection name of a file.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} required - mark required
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} hide - mark field as hidden
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * units, currencies
     *
     */
    bucket: {
      type: String,
      trim: true,
      required: true,
      enum: BUCKETS,
      index: true,
      searchable: true,
      taggable: true,
      hide: true,
      default: DEFAULT_BUCKET,
      fake: true,
    },

    /**
     * @name name
     * @alias value
     * @description Human readable value of a file.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} required - mark required
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Kilogram, US Dollar
     *
     */
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => f.commerce.productName(),
    },

    /**
     * @name code
     * @description Human(and machine) readable, unique identifier of a
     * prefined.
     *
     * It used in generation of physical tag or barcode when needed.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * kg, usd
     *
     */
    code: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => f.finance.currencyCode(),
    },

    /**
     * @name symbol
     * @description A mark or sign that representing a prefined.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * £, $
     *
     */
    symbol: {
      type: String,
      trim: true,
      exportable: true,
      fake: f => f.finance.currencySymbol(),
    },

    /**
     * @name abbreviation
     * @description Human readable short form of a file value.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * kg, usd
     *
     */
    abbreviation: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => _.toUpper(f.hacker.abbreviation()),
    },

    /**
     * @name description
     * @description A brief summary about a file if available.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Default date format
     *
     */
    description: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      exportable: true,
      fake: f => f.lorem.sentence(),
    },

    /**
     * @name weight
     * @description Weight of the file to help in ordering files of
     * a given namespace.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 0
     *
     */
    weight: {
      type: Number,
      index: true,
      default: 0,
      exportable: true,
      fake: f => f.random.number(),
    },

    /**
     * @name color
     * @description A color in hexadecimal format used to differentiate
     * filed value visually from one other.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * #CCCCCC
     *
     */
    color: {
      type: String,
      trim: true,
      uppercase: true,
      exportable: true,
      default: () => _.toUpper(randomColor({ luminosity: 'light' })),
      fake: true,
    },

    /**
     * @name icon
     * @description An icon in url or base64 format used to differentiate
     * files visually.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} default - default value set when none provided
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * https://img.icons8.com/ios/50/000000/marker.png
     *
     */
    icon: {
      type: String,
      trim: true,
      fake: f => f.image.image(),
    },

    /**
     * @name geometry
     * @description A geo-geometry representation of a filed.
     *
     * @type {object}
     * @property {object} geomentry - geojson geometry
     * @property {string} geometry.type - geojson geometry type
     * @property {number[]} geometry.coordinates - coordinates pair(s) of a
     * geometry
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *    type: 'Point',
     *    coordinates: [-76.80207859497996, 55.69469494228919]
     * }
     *
     */
    geometry: Geometry,

    /**
     * @name properties
     * @description A map of key value pairs to allow to associate
     * other meaningful information to a filed.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "section": "Billing"
     * }
     *
     */
    properties: {
      type: Map,
      of: String,
      index: true,
      taggable: true,
      fake: f => f.helpers.createTransaction(),
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on resource and action
 * to force unique file definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const uniqueIndex = { namespace: 1, bucket: 1, name: 1, code: 1 };
FileSchema.index(uniqueIndex, { unique: true });

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @function validate
 * @description file schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
FileSchema.pre('validate', function onPreValidate(done) {
  this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description file schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
FileSchema.methods.preValidate = function preValidate(done) {
  // ensure correct namespace and bucket
  if (!_.isEmpty(this.bucket) && _.isEmpty(this.namespace)) {
    const bucketAndNamespace = _.find(NAMESPACE_MAP, { bucket: this.bucket });
    if (!_.isEmpty(bucketAndNamespace)) {
      this.set(bucketAndNamespace);
    }
  }

  // ensure correct namespace and bucket
  if (!_.isEmpty(this.namespace) && _.isEmpty(this.bucket)) {
    const bucketAndNamespace = _.find(NAMESPACE_MAP, {
      namespace: this.namespace,
    });
    if (!_.isEmpty(bucketAndNamespace)) {
      this.set(bucketAndNamespace);
    }
  }

  // ensure abbreviation
  this.abbreviation = _.trim(this.abbreviation) || abbreviate(this.name);

  // ensure code
  this.code = _.trim(this.code) || this.abbreviation;

  // continue
  done();
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
FileSchema.statics.MODEL_NAME = MODEL_NAME;
FileSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
FileSchema.statics.DEFAULT_NAMESPACE = DEFAULT_NAMESPACE;
FileSchema.statics.NAMESPACES = NAMESPACES;
FileSchema.statics.DEFAULT_BUCKET = DEFAULT_BUCKET;
FileSchema.statics.BUCKETS = BUCKETS;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {Object} seed filed to be seeded
 * @returns {Object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.2.0
 * @version 0.1.0
 * @static
 */
FileSchema.statics.prepareSeedCriteria = seed => {
  const criteria = _.get(seed, '_id')
    ? _.pick(seed, '_id')
    : _.pick(seed, 'namespace', 'bucket', 'name', 'code');
  return criteria;
};

/* export file model */
export default model(MODEL_NAME, FileSchema);

/* dependencies */
const _ = require('lodash');
const { connect } = require('@lykmapipo/mongoose-common');
const { get, mount, start } = require('@lykmapipo/express-common');

const { info, fileRouter, BUCKETS, apiVersion } = require(`${__dirname}/..`);

// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  // expose module info
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // mount router
  mount(fileRouter);

  // fire the app
  start((error, env) => {
    // re-throw if error
    if (error) {
      throw error;
    }

    // start http server
    _.forEach(BUCKETS, bucket => {
      const path = `files/${bucket}`;
      console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/${path}`);
    });
  });
});

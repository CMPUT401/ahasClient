/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ahasweb',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  
  ENV['ember-simple-auth'] = {  
    store: 'session-store:local-storage',
    routeAfterAuthentication: 'search-patient'
};

    if (environment === 'development') {
	ENV.host = 'http://localhost:4200';
  ENV.server = 'https://ahas.herokuapp.com';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.server = 'https://ahas.herokuapp.com'; //wont actually post bc mirage will intercept
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'datadotchapman',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    
		// CSP
		contentSecurityPolicy: {
		  'default-src': "'none' 'unsafe-eval' https://*.firebase.io/ https://*.firebaseio.com/",
		  'script-src': "'self' 'unsafe-eval' https://*.firebase.io/ https://*.firebaseio.com",
		  'font-src': "'self' http://fonts.gstatic.com",
		  'connect-src': "'self' 'unsafe-eval' wss://*.firebaseio.com/ https://auth.firebase.com/",
		  'img-src': "'self' data: http://www2.chapman.edu/ https://res.cloudinary.com/",
		  'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
		  'media-src': "'self'"
		},
    
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
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

/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app      = new EmberApp();


// Chapman Web Components
app.import('bower_components/chapman-web-components/dist/cu_components.css');
app.import('bower_components/chapman-web-components/dist/cu_components.js');
app.import('bower_components/chapman-web-components/dist/images/chapman-logo-horizontal.svg', { destDir: 'assets/images' });
app.import('bower_components/chapman-web-components/dist/images/sprite.svg', { destDir: 'assets/images' });




/** Export */
module.exports = app.toTree();

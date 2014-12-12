import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.resource('parking');
  this.route('weather');
  this.route('social');
  this.route('jobs');
});

export default Router;

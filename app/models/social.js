import {Model, attr, hasMany, hasOne} from 'fireplace';

var Social = Model.extend({
  service:      attr('string'),
  text:         attr('string'),
  timestamp:    attr('date'),
  external_uri: attr('string'),
  
  author: hasOne(),
  photos: hasMany()
});

export default Social;

Social.reopenClass({
  firebasePath: 'social'
});
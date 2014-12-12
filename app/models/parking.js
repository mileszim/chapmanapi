import {Model, attr, hasMany} from 'fireplace';

var Parking = Model.extend({
  name:         attr('string'),
  available:    attr('number'),
  capacity:     attr('number'),
  last_updated: attr('date'),
  
  levels: hasMany()
});

export default Parking;

Parking.reopenClass({
  firebasePath: 'parking'
});
import {Model, attr} from 'fireplace';

export default Model.extend({
  name:      attr('string'),
  capacity:  attr('number'),
  available: attr('number')
});

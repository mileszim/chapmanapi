import {Model, attr} from 'fireplace';

export default Model.extend({
  avatar:       attr('string'),
  display_name: attr('string'),
  user_name:    attr('string')
});

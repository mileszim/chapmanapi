import {Model, attr} from 'fireplace';

export default Model.extend({
  url: attr('string'),
  
  background: function() {
    return "background-image:url('" + this.get('url') +"');"
  }.property('url')
});
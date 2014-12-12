import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  service_icon: function() {
    return '/assets/images/sprite.svg#' + this.get('service');
  }.property('service'),
  
  hasPhotos: Ember.computed.notEmpty('photos')
  
});

import Ember from 'ember';
import { moment, ago } from 'ember-moment/computed';

export default Ember.ObjectController.extend({
  
  timeSince: ago('last_update', true),
  
  used: function() {
    return this.get('capacity') - this.get('available');
  }.property('capacity', 'available'),
  
  progressText: function() {
    return this.get('available') + ' spots left';
  }.property('available')
  
});

import Ember from 'ember';
 
export default Ember.Route.extend({
  model: function() {
    return {
      events: Ember.A([
        {title: "Hackathon \n ayelmao \n ayelmao2", start: Date.now()},
      ])
    };
  }
});
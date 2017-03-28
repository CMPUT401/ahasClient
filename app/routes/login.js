import Ember from 'ember';  
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {  
  actions: {
    invalidateSession: function() {
        this.get('session').invalidate();
    }

},
 setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
   
    //if we transition to this route we simply want to transition away
    if (this.get('session.isAuthenticated')){
		this.transitionTo('/client-list');
	}
  }
});
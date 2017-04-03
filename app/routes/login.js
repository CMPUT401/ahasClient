import Ember from 'ember';  
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

/**
* Route for login
* @class LoginRoute
*/
export default Ember.Route.extend(ApplicationRouteMixin, {  
  actions: {

 /**  
  * handles action called when user logs out
  * @method invalidateSession
  */ 
    invalidateSession: function() {
        this.get('session').invalidate();
    }

},

/**  
  * handles case where someone tries to visit login route while already logged in 
  * if already logged in we transition to search-client
  * @method setupController
  */ 
 setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    if (this.get('session.isAuthenticated')){
		  this.transitionTo('/search-client');
	}
  }
});
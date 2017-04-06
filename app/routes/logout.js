import Ember from 'ember';  
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

/**
* Route for logout
* @class LogoutRoute
*/
export default Ember.Route.extend(ApplicationRouteMixin, {  
  session: Ember.inject.service(),
  beforeModel(){
		this.get('session').invalidate();
        this.transitionTo('login');
	}

});

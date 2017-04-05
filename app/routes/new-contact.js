import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for new contact
* @class NewContactRoute
*/

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
    model() {
        return{
        //default attribute is that contact is not a laboratory type
        //this is used for the initial setup of the input fields on this page
        //since these respond to dropdown configuration
		laboratory: false
		};
    },
    /**  
  * handles case where someone tries to visit new contact route manually as a user not admin 
  * in that case we transition back to search-contact
  * @method setupController
  */ 
 setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    if (this.get('session.data.authenticated.role')!=='Admin'){
		  this.transitionTo('/search-contact');
	}
  }
  
});

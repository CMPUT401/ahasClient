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
    }
});

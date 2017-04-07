import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
	    /**
    *model of the newpatient route, assigns stuff from the get to the patient
    *@class model
    */
	model(params){
		return{
		clientid: params.clientID
		};
	}
});

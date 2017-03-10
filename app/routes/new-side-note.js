import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{

    ajax: Ember.inject.service(),
	model(param) {
		{patientID:(param[0]),
		medID : (param[2])}

	},
	

});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	
	{
	
    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/1/medical_records'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.appointment.id).replace(/\"/g, ""),
						   notes: JSON.stringify(data.appointment.note).replace(/\"/g, ""),
						   species: JSON.stringify(data.appointment.sig).replace(/\"/g, ""),
				});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
                console.log("status is " + JSON.stringify(data));
				console.log("status is " + JSON.stringify(data.appointment.sig));
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);

	},
	

});

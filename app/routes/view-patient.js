import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{

    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/1'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.patient.id),
						   name: JSON.stringify(data.patient.name),
						   species: JSON.stringify(data.patient.species),
						   age: JSON.stringify(data.patient.age),
						   colour: JSON.stringify(data.patient.colour),
						   tattoo: JSON.stringify(data.patient.tattoo),
						   microchip: JSON.stringify(data.patient.microchip),
						   status: JSON.stringify(data.patient.reproductive_status),
						   gender: JSON.stringify(data.patient.gender)
					
				
				});
					//console.log("we getdont here"); 
    		  });
                console.log("status is " + JSON.stringify(data));
				console.log("status is " + JSON.stringify(data.patient.name));
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

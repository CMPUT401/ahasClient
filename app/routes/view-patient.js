import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{

    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/40'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
						   first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: JSON.stringify(data.patient.age).replace(/\"/g, ""),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   status: JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   gender: JSON.stringify(data.patient.gender).replace(/\"/g, "")
				});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
				console.log("status is " + JSON.stringify(data));
				console.log('/api/client/' + JSON.stringify(data.patient.id));
				//var self = this;
				var ajaxGet = new Ember.RSVP.Promise((resolve) =>
				self.get('ajax').request('/api/client/'+ JSON.stringify(data.patient.id)
					).then(function(data){
						Ember.run.later(function() {
							resolve({ 
								firstName: JSON.stringify(data.client.firstName),
								lastName: JSON.stringify(data.client.lastName),
								address: JSON.stringify(data.client.address),
								phoneNumber: JSON.stringify(data.client.phoneNumber),
								email: JSON.stringify(data.client.email),
								licos: JSON.stringify(data.client.licos),
								aish: JSON.stringify(data.client.aish),
								socialAssistance: JSON.stringify(data.client.socialAssistance),
								alternativeContactFirstName: JSON.stringify(data.client.alternativeContactFirstName),
								alternativeContactEmail: JSON.stringify(data.client.alternativeContactEmail),
								alternativeContactLastName: JSON.stringify(data.client.alternativeContactLastName),
								alternativeContactPhoneNumber:JSON.stringify(data.client.alternativeContactPhoneNumber),
								alternativeContact2ndPhone: JSON.stringify(data.client.alternativeContact2ndPhone),
								alternativeContactAddress: JSON.stringify(data.client.alternativeContactAddress)
							});
						});
						console.log("status is " + JSON.stringify(data));
					},
					function(data){
						if (data === false){
							self.transitionTo('/unauthorized');
							console.log("status is " + JSON.stringify(data));
						}
					}));
					return(ajaxGet);
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

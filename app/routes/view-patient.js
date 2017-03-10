import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{

    ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID
			).then(function(data){
				Ember.run.later(function() 
					{
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
						   gender: JSON.stringify(data.patient.gender).replace(/\"/g, ""),
						   firstName: JSON.stringify(data.patient.client.firstName).replace(/\"/g, ""),
							lastName: JSON.stringify(data.patient.client.lastName).replace(/\"/g, ""),
							address: JSON.stringify(data.patient.client.address).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							phoneNumber: JSON.stringify(data.patient.client.phoneNumber).replace(/\"/g, ""),
							email: JSON.stringify(data.patient.client.email).replace(/\"/g, ""),
							licos: JSON.stringify(data.patient.client.licos).replace(/\"/g, ""),
							aish: JSON.stringify(data.patient.client.aish).replace(/\"/g, ""),
							socialAssistance: JSON.stringify(data.patient.client.socialAssistance).replace(/\"/g, ""),
							notes: JSON.stringify(data.patient.client.notes).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							alternativeContactFirstName: JSON.stringify(data.patient.client.alternativeContactFirstName).replace(/\"/g, ""),
							alternativeContactEmail: JSON.stringify(data.patient.client.alternativeContactEmail).replace(/\"/g, ""),
							alternativeContactLastName: JSON.stringify(data.patient.client.alternativeContactLastName).replace(/\"/g, ""),
							alternativeContactPhoneNumber:JSON.stringify(data.patient.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
							alternativeContact2ndPhone: JSON.stringify(data.patient.client.alternativeContact2ndPhone).replace(/\"/g, ""),
							alternativeContactAddress: JSON.stringify(data.patient.client.alternativeContactAddress).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
				console.log("status is " + JSON.stringify(data));
				console.log('/api/client/' + JSON.stringify(param.patientID));
				//var self = this;
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

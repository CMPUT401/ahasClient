import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
	// TODO: load from /api/client/{id}
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		// console.log("param is " + param.clientID);
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
				resolve({
					client: deserialClient(data);
				});
			  });
			
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
					self.get('session').invalidate();
					}
				self.transitionTo('/login');
					console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	},
});
function deserialPatients(patients){
	var deserial = [];
	for(var i = 0; i < patients.length; i++) {
		var patient = patients[i];
		patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
		patient.firstName = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
		patient.lastName = JSON.stringify(patients[i].last_name).replace(/\"/g, "");
		
		deserial.push(patient);

	}
	return(deserial);
}

function deserialClient(client){
	var deserial;
	//only one client to deserial
	client.firstName = JSON.stringify(client.firstName).replace(/\"/g, "");
	client.lastName = JSON.stringify(client.lastName).replace(/\"/g, "");
	client.phoneNumber = JSON.stringify(client.phoneNumber).replace(/\"/g, "");
	client.email = JSON.stringify(client.email).replace(/\"/g, "");
	client.address = JSON.stringify(client.address).replace(/\\n/g, " <br> " ).replace(/\"/g, "");

	client.licos = JSON.stringify(client.licos).replace(/\"/g, "");
	client.aish = JSON.stringify(client.aish).replace(/\"/g, "");
	client.socialAssistance = JSON.stringify(client.socialAssistance).replace(/\"/g, "");
	client.pets = JSON.stringify(client.pets).replace(/\"/g, "");
	
	client.created_at = JSON.stringify(client.created_at).replace(/\"/g, "").slice(0, 10);
	client.updated_at = JSON.stringify(client.updated_at).replace(/\"/g, "").slice(0, 10);
	client.notes = JSON.stringify(client.notes).replace(/\"/g, "").replace(/\\n/g, ' <br> ' );

	client.alternativeContactFirstName = JSON.stringify(
		client.alternativeContactFirstName).replace(/\"/g, "");
	client.alternativeContactLastName = JSON.stringify(
		client.alternativeContactLastName).replace(/\"/g, "");
	client.alternativeContactPhoneNumber = JSON.stringify(
		client.alternativeContactPhoneNumber).replace(/\"/g, "");
	client.alternativeContact2ndPhone = JSON.stringify(
		client.alternativeContact2ndPhone).replace(/\"/g, "");
	client.alternativeContactAddress = JSON.stringify(
		client.alternativeContactAddress).replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	client.alternativeContactEmail = JSON.stringify(
			client.alternativeContactEmail).replace(/\"/g, "");

	client.clientID = JSON.stringify(data.client.id).replace(/\"/g, "");
	client.patients = deserialAttributes(data.client.patients);

	return client;
}

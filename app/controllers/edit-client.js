import Ember from 'ember';

/**
* Controller for edit-client
* @class EditClientController
*/
export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	clientId: 0,
	actions:{
		/**
		* makes an ajax PUT request to save the client info
		* @param {object} the model from the page
		* @method saveClient
		*/
		saveClient: function(client){
			//disable button
			document.getElementById("create-client-button").disabled = true; 
			console.log("saving client!" + this.clientId);
			this.clientId = client.clientID;
			//make ajax put request

			var self = this;
			let ajaxPut = this.get('ajax').put('api/client/' + this.clientId, {
				type: 'application/json',
				data: {client: {
					firstName: client.firstName,
					lastName: client.lastName,
					address: client.address,
					phoneNumber: client.phoneNumber,
					email: client.email,
					licos: client.licos,
					aish: client.aish,
					socialAssistance: client.socialAssistance,
					pets: "",
					created_at: client.created_at,
					updated_at: new Date(),
					alternativeContactFirstName: client.alternativeContactFirstName,
					alternativeContactLastName: client.alternativeContactLastName,
					alternativeContactPhoneNumber: client.alternativeContactPhoneNumber,
					alternativeContactAddress: client.alternativeContactAddress,
					notes: client.notes,
					alternativeContact2ndPhone: client.alternativeContact2ndPhone,
					alternativeContactEmail: client.alternativeContactEmail,
					patients: client.patients
				}},
			}).then(function(data){
				console.log("status is " + JSON.stringify(data));
				self.transitionToRoute('/client-info/' + self.clientId);
			},function(response){
				console.log("status is " + JSON.stringify(response));
				document.getElementById("create-client-button").disabled = false;
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					clearFields(self);
					self.transitionToRoute('/login');
				}
			});
			return ajaxPut;
		}
	}
});

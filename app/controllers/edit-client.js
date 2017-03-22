import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	clientId: 0,
	actions:{
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
					firstName: this.get('clientFirstName'),
					lastName: this.get('clientLastName'),
					address: this.get('clientAddress'),
					phoneNumber: this.get('clientPhone'),
					// phoneNumber: client.phoneNumber,
					email: this.get('clientEmail'),
					licos: this.get('clientLICO'),
					aish: this.get('clientAISH'),
					socialAssistance: this.get('clientAS'),
					pets: "",
					created_at: client.created_at,
					updated_at: new Date(),
					alternativeContactFirstName: this.get('alternativeFirstName'),
					alternativeContactLastName: this.get('alternativeLastName'),
					alternativeContactPhoneNumber: this.get('alternativePrimaryPhone'),
					alternativeContactAddress: this.get('alternativeAddress'),
					notes: this.get('clientNotes'),
					alternativeContact2ndPhone: this.get('alternativeSecondaryPhone'),
					alternativeContactEmail: this.get('alternativeEmail'),
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

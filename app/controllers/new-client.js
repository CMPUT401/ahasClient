import Ember from 'ember';

/**
* Controller for new-client
* @class NewClientController
*/
export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	//let cName, let cAddress, let cPhone,
	actions: {
		/**
		* makes an ajax POST request to save the new client
		* @method submitNewClient
		*/
		submitNewClient: function(){
			//disable button
			document.getElementById("create-client-button").disabled = true; 
			console.log("making new client!");
			//make asynch post request
			var self = this;
			//let cName = this.get('clientName');
			//TODO check inputs
			let ajaxPost = this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
					firstName: this.get('clientFirstName'),
					lastName: this.get('clientLastName'),
					address: this.get('clientAddress'),
					phoneNumber: this.get('clientPhone'),
					email: this.get('clientEmail'),
					licos: this.get('clientLICO'),
					aish: this.get('clientAISH'),
					socialAssistance: this.get('clientAS'),
					pets: "",
					created_at: new Date(),
					updated_at: "",
					alternativeContactFirstName: this.get('alternativeFirstName'),
					alternativeContactLastName: this.get('alternativeLastName'),
					alternativeContactPhoneNumber: this.get('alternativePrimaryPhone'),
					alternativeContactAddress: this.get('alternativeAddress'),
					notes: this.get('clientNotes'),
					alternativeContact2ndPhone: this.get('alternativeSecondaryPhone'),
					alternativeContactEmail: this.get('alternativeEmail')
				}}, 
			}).then(function(data){
					//console.log("name is " + cName);
					// TODO display confrimation page
					// TODO prevent user from going back into this page
					console.log("status is " + JSON.stringify(data));
					clearFields(self);
					self.transitionToRoute('client-list');
				},
				function(response){
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
			//createNewCLient();
			//this.transitionToRoute('/login');
			return ajaxPost;
		}
	}
});

/**
* clears the page's input fields
* @param {object} page the controller
* @method clearFields
*/
function clearFields(page){
	page.set('clientFirstName', '');
	page.set('clientLastName', '');
	page.set('clientAddress', '');
	page.set('clientPhone', '');
	page.set('clientEmail', '');
	page.set('clientLICO', '');
	page.set('clientAISH', '');
	page.set('clientAS', '');
	page.set('alternativeFirstName', '');
	page.set('alternativeLastName', '');
	page.set('alternativePrimaryPhone', '');
	page.set('alternativeAddress', '');
	page.set('clientNotes', '');
	page.set('alternativeSecondaryPhone', '');
	page.set('alternativeEmail', '');
}

import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//let cName, let cAddress, let cPhone,
	actions: {
		submitNewCient(){
			var self = this;
			//let cName = this.get('clientName');
			//TODO check inputs
			let ajaxPost = this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
					name: this.get('clientName'),
					address: this.get('clientAddress'),
					phoneNumber: this.get('clientPhone'),
					email: this.get('clientEmail'),
					licos: this.get('clientLICO'),
					aish: this.get('clientAISH'),
					socialAssistance: this.get('clientAS'),
					pets: "",
					created_at: new Date(),
					updated_at: "",
					clientID: this.get('clientID'),
					alternativeContactName: this.get('alternativeName'),
					alternativeContactPhoneNumber: this.get('alternativePrimaryPhone'),
					alternativeContactAddress: this.get('alternativeAddress'),
					notes: this.get('clientNotes'),
					alternativeContact2ndPhone: this.get('alternativeSecondaryPhone'),
					alternativeContactEmail: this.get('alternativeEmail')
					// name: 'Boby',
					// address: '123 somewehere st, Edmonton',
					// phoneNumber: '780-555-1234',
					// email: 'someBoby@email.com',
					// licos: '12345',
					// socialAssistance: '4313',
					// pets: ''
				}}, 
			}).then(function(data){
					//console.log("name is " + cName);
					// TODO display confrimation page
					// TODO prevent user from going back into this page
					console.log("status is " + JSON.stringify(data));
					self.transitionToRoute('login');
				},
				function(data){
					console.log("status is " + JSON.stringify(data));
				});
			//createNewCLient();
			//this.transitionToRoute('/login');
			return ajaxPost;
		}
	}
});

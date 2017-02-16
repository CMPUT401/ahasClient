import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	actions: {
		sendRequest(){
			self = this;
			let ajaxPost = this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
					// name: model.clientName,
					// address: model.clientAddress,
					// phoneNumber: model.clientPhone,
					// email: model.clientEmail,
					// licos: model.clientLICO,
					// socialAssistance: model.clientAS
					name: '',
					address: '123 somewehere st, Edmonton',
					phoneNumber: '780-555-1234',
					email: 'someBoby@email.com',
					licos: '12345',
					socialAssistance: '4313',
					pets: ''
				}}, 
			}).then(function(data){
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

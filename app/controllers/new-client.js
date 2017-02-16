import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//let cName, let cAddress, let cPhone,
	actions: {
		sendRequest(){
			self = this;
			let cName = this.get('clientName');
			// cAddress = clientAddress,
			// cPhone = clientPhone,
			let ajaxPost = this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
					// name: model.clientName,
					// address: model.clientAddress,
					// phoneNumber: model.clientPhone,
					// email: model.clientEmail,
					// licos: model.clientLICO,
					// socialAssistance: model.clientAS
					name: 'Boby',
					address: '123 somewehere st, Edmonton',
					phoneNumber: '780-555-1234',
					email: 'someBoby@email.com',
					licos: '12345',
					socialAssistance: '4313',
					pets: ''
				}}, 
			}).then(function(data){
					console.log("name is " + cName.toString());
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

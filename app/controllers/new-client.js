import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	actions: {
		sendRequest(){
			return this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
					// name: model.clientName,
					// address: model.clientAddress,
					// phoneNumber: model.clientPhone,
					// email: model.clientEmail,
					// licos: model.clientLICO,
					// socialAssistance: model.clientAS
					name: 'bob',
					address: '123 somewehere st, Edmonton',
					phoneNumber: '780-555-1234',
					email: 'some@email.com',
					licos: '12345',
					socialAssistance: '4313',
					pets: ''
				}}
			});
		}
	}
});

import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	actions: {
		sendRequest(){
			return this.get('ajax').request('/api/client' ,{
				method: 'POST',
				client: {
					name:  ,
					address:  ,
					phoneNumber:  ,
					email:  ,
					licos:  ,
					socialAssistance:  ,
					pets:  
				}
			});
		}
	}
});

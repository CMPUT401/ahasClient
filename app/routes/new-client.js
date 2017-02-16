import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model() {
		//return this.store.createRecord('newClient');
		return this.get('ajax').request('/api/client');
	},
	actions:{
		createNewClient(){
			let clientInfo = this.modelFor(this.routeName);
			clientInfo.save().then(function () {
				//sendRequest();
				//this.transitionTo('new-client');
			}).catch(function (reason){

			});
		}
	}
});

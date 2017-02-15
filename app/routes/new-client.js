import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.createRecord('newClient');
	},
	actions:{
		createNewClient(){
			let clientInfo = this.modelFor(this.routeName);
			newClient.save().then(function () {

				//this.transitionTo('new-client');
			}).catch(function (reason){

			});
		}
	}
});

import Ember from 'ember';

export default Ember.Route.extend({
	// TODO: load from /api/client/{id}
	ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		console.log("param is " + param.clientID);
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
	   			resolve({ 
					client: deserialAttributes(data.client),
				
				});
			  });
			
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	},
});
function deserialAttributes(client){
	firstName: JSON.stringify(client.firstName).replace(/\"/g, "");
	lastName: JSON.stringify(client.lastName).replace(/\"/g, "");
	phoneNumber: JSON.stringify(client.phoneNumber).replace(/\"/g, "");
	email: JSON.stringify(client.email).replace(/\"/g, "");
	address: JSON.stringify(client.address).replace(/\"/g, "");
}

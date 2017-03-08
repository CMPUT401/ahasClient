import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client'
			).then(function(data){
				Ember.run(function() {
					// console.log("data is " + JSON.stringify(data), JSON.stringify(data.client));
					resolve({ 
						clients: deserialAttributes(data.clients),

					});
					//self.get('store').push(clients);

				});
				//self.get('store').pushPayload(data);
				self.get('store').createRecord('client-list', data.clients);
				// self.get('store').push(deserialAttributes(data.clients));
				
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/unauthorized');
            	}
            }));

		// console.log("ajax is " + ajaxGet);
		// return this.get('store').findAll('client-list');
		return ajaxGet;
	}
});

function deserialAttributes(clients){
	var deserial = [];
	// console.log("clients is " + clients);
	for(var i = 0; i < clients.length; i++) {

		var client= clients[i];
		// console.log("client at " + i + " is" + client)
		client.id = JSON.stringify(clients[i].id);
		client.firstName = JSON.stringify(clients[i].firstName).replace(/\"/g, "");
		// console.log("first name of " + i + " is " + client.firstName);
		// if(clients[i].last_name)
		client.lastName = JSON.stringify(clients[i].lastName).replace(/\"/g, "");
		deserial.push(client);

	}
	// console.log("deserial is " + deserial);
	return(deserial);
}

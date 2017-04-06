import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


/**
* Route for search client. Makes a get request for clients when loaded.  
* @class SearchClientRoute
*/
export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client'
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						clients: deserialAttributes(data.clients),
						clientsFiltered: deserialAttributes(data.clients),
					});

				});
				
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/login');
            	}
            }));
		return ajaxGet;
	}
});

/**
* deserializes the attributes in the JSON object and converts it to an array of strings.
* @method deserialAttributes
* @param {object} client Client object from the JSON, data.clients
*/
function deserialAttributes(clients){
	var deserial = [];
	for(var i = 0; i < clients.length; i++) {
		var client = clients[i];
		client.id = JSON.stringify(clients[i].id).replace(/\"/g, "");
		client.firstName = JSON.stringify(clients[i].firstName).replace(/\"/g, "");
		client.lastName = JSON.stringify(clients[i].lastName).replace(/\"/g, "");
		deserial.push(client);

	}
	return(deserial);
}

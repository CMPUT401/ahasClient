import Ember from 'ember';

/**
* Controller for client-list
* @class ClientListController
*/
export default Ember.Controller.extend({
	actions: {
		/**
		* fitlers clients according to user input
		* @method filterClient
		*/
		filterClient: function(){
			var input = document.getElementById('search-bar').value.trim();
			if(input === "" || input === undefined){
				this.set('model.clientsFiltered', this.get('model.clients'));
			}
			else {
				filter(input, this.get('model'), this);
			}
		},
		/**
		* handles action called when user clicks on a client's name. Redirects to that client's
		* info page. 
		* @method viewClient
		* *param {int} clientID The ID of the client
		*/
		viewClient: function(clientID){
            console.log(clientID);
            this.transitionToRoute("/client-info/" + clientID);
        },
        /**
        * handles action called when user clicks New Client button. 
        * Redirects to the client page
		* @method newPatient
        */
        newClient: function(){
        	this.transitionToRoute("/new-client/");
        }

	}
});

function filter(input, model, self){
	var results = [];
	for(var i = 0; i < model.clients.length; i++){
		if(input === model.clients[i].firstName || input === model.clients[i].lastName){
			var client = {
							firstName: model.clients[i].firstName,
							lastName: model.clients[i].lastName,
							id: model.clients[i].id
						};
			results.push(client);
		}
	}
	self.set('model.clientsFiltered', results);
}

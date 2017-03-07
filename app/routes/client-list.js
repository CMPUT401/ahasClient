import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		// TODO GET model with AJAX instead of using dummy data
		var self = this;
		// let ajaxGet = this.get('ajax').request('/api/client' , {
		// 	// type: 'application/json',
		// 	dataType: 'application/json',
		// 	// data: {client: {
		// 	// 	firstName: '',
		//  //  lastName: '',
		// 	// 	id: ''
		// 	// }}
		// 	//method: 'GET'
		// }).then(function(data){
		// 	//console.log("name is " + cName);
		// 	console.log("success status is " + JSON.stringify(data));
		// },
		// function(data){
		// 	console.log("error status is " + JSON.stringify(data));
		// 	if (data === false){
		// 		if (self.get('session.isAuthenticated')){
		// 			self.get('session').invalidate();
		// 			}
		// 		self.transitionToRoute('/unauthorized');
		// 	}
		// });

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client'
			).then(function(data){
				Ember.run(function() {
					console.log("data is " + JSON.stringify(data), JSON.stringify(data.client));
					resolve({ 
						clients: deserialAttributes(data),
					});
				});
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
		return ajaxGet;
		
		// return {
		// 	clients: [{
		// 		firstName: 'Boby',
		// 		lastName: 'Oor',
		// 		id :110
		// 	},
		// 	{
		// 		firstName: 'Sally',
		// 		lastName: 'Stenson',
		// 		id :111
		// 	},
		// 	{
		// 		firstName: 'Jonathan',
		// 		lastName: 'Lafleur',
		// 		id :112
		// 	},
		// 	{
		// 		firstName: 'Erica',
		// 		lastName: 'Smith',
		// 		id :113
		// 	},
		// 	{
		// 		firstName: 'Joe',
		// 		lastName: 'Blo',
		// 		id :114
		// 	},
		// 	{
		// 		firstName: 'Frank',
		// 		lastName: 'Wurst',
		// 		id :115
		// 	},
		// 	{
		// 		firstName: 'Francine',
		// 		lastName: 'Mancine',
		// 		id :116
		// 	}]
		// };
	}
});

function deserialAttributes(clients){
	var deserial = [];
	for(var i = 0; i < clients.length; i++) {

		var client= clients[i];
		client.id = JSON.stringify(clients[i].id);
		client.first_name = JSON.stringify(clients[i].first_name).replace(/\"/g, "");
		client.last_name = JSON.stringify(clients[i].last_name).replace(/\"/g, "");
		deserial.push(client);

	}
	return(deserial);
}

import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model(){
		// TODO GET model with AJAX instead of using dummy data
		/*
		let ajaxGet = this.get('ajax').get('/api/client' , {
			type: 'application/json',
			data: {client: {
				name: ""
			}}, 
		}.then(function(data){
			//console.log("name is " + cName);
			console.log("status is " + JSON.stringify(data));
			self.transitionToRoute('login');
		},
		function(data){
			console.log("status is " + JSON.stringify(data));
		});
		return ajaxGet.JSON.stringify(data);
		*/
		return [{
			name: 'Boby'
		},
		{
			name: 'Sally'
		},
		{
			name: 'Jonathan'
		},
		{
			name: 'Erica'
		},
		{
			name: 'Joe'
		},
		{
			name: 'Frank'
		},
		{
			name: 'Francine'
		}];
	}
});

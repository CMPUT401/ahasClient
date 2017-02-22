import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		// TODO GET model with AJAX instead of using dummy data
		var self = this;
		let ajaxGet = this.get('ajax').request('/api/client' , {
			// type: 'application/json',
			dataType: 'application/json',
			// data: {client: {
			// 	name: '',
			// 	id: ''
			// }}
			//method: 'GET'
		}).then(function(data){
			//console.log("name is " + cName);
			console.log("success status is " + JSON.stringify(data));
		},
		function(data){
			console.log("error status is " + JSON.stringify(data));
			// if (data === false){
			// 	if (self.get('session.isAuthenticated')){
			// 		self.get('session').invalidate();
			// 		}
			// 	self.transitionToRoute('/unauthorized');
			// }
		});
		console.log("ajax is " + ajaxGet);
		return ajaxGet;
		
		// return [{
		// 	name: 'Boby'
		// },
		// {
		// 	name: 'Sally'
		// },
		// {
		// 	name: 'Jonathan'
		// },
		// {
		// 	name: 'Erica'
		// },
		// {
		// 	name: 'Joe'
		// },
		// {
		// 	name: 'Frank'
		// },
		// {
		// 	name: 'Francine'
		// }];
	}
});

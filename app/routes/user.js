import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
/**
* Route for view a user
* @class UserRoute
*/
export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(params){
		var self = this;
		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request(`/api/admin/users/${params.id}`
			).then(function(data){
				console.log(data);
				Ember.run(function() {
					resolve({ 
						user: data.user
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
				self.transitionTo('/admin');
            }));
		return ajaxGet;
	}
});
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(params){
		var self = this;
        console.log(params);
		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request(`/api/users/${params.id}`
			).then(function(data){
				Ember.run(function() {
                    console.log(data.user);
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
            }));
		return ajaxGet;
	}
});
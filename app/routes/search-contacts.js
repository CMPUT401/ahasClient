import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts'
			).then(function(data){
				Ember.run(function() {
       			 resolve({ 
                           overall:  JSON.stringify(data),
                           status: JSON.stringify(data.success),
						   data: JSON.stringify(data.contacts)
				
				});
    		  });
			
			},
			function(data){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
            }
		}));
		return(ajaxGet);
	},
	
});

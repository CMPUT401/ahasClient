import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model() {
		/*var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts'
			).then(function(data){
				Ember.run(function() {
       			 resolve({ 

						   contacts: JSON.stringify(data.contacts)
				
				});
    		  });
			
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
            }
		}));
		//return(ajaxGet);*/
		return 
			[{id:1,"first_name":"Jonah","last_name":"Smith"},{id:2,"first_name":"Ryan","last_name":"Jones"},{id:3,"first_name":"Fran","last_name":"Stoker"}];
	},
	
});

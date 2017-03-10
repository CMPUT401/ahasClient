import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/'
			).then(function(data){
				Ember.run(function() {
       			 resolve({ 
       			 		patientFiltered : data.patients
				});
				console.log("status is " + JSON.stringify(data));
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
	return(ajaxGet);
		
	}
	
});

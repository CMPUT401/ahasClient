import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{

    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Promise((resolve) =>
		this.get('ajax').request('/api/patients/1'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.patient.id),
						   name: JSON.stringify(data.patient.name)
					
				
				});
					console.log("we getdont here"); 
    		  }, 3000);
                console.log("status is " + JSON.stringify(data));
				console.log("status is " + JSON.stringify(data.patient.name));
				
				 //self.set('patient', data.patient);
				 return[JSON.stringify(data.patient)];
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);
	},
	

});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID
			).then(function(data){
				data.patient = fixNulls(data.patient);
				data.patient.client = fixNulls(data.patient.client);
				Ember.run.later(function() 
					{
       			 resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
						   first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: JSON.stringify(data.patient.age).replace(/\"/g, ""),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   status: JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   gender: JSON.stringify(data.patient.gender).replace(/\"/g, "")
						});
				//this.get('ajax').request('/api/client/1');

    		  });
				//var self = this;
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/login');
            	}
		}));
		return(ajaxGet);

	},
	

});



function fixNulls(data){
	var fixed = {};

	for(var key in data){
		if(data[key] === null || data[key] === undefined || data[key] === 'null'){
			fixed[key] = '';
		}
		else{
			fixed[key] = data[key];
		}
	}

	return fixed;
}
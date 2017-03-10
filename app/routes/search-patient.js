import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients'
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						patients: deserialAttributes(data.patients),
						patientFiltered: deserialAttributes(data.patients),
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

		return ajaxGet;
	}
});

function deserialAttributes(patients){

	var deserial = [];
	for(var i = 0; i < patients.length; i++) {
		var patient = patients[i];
		patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
		patient.first_name = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
		patient.last_name = JSON.stringify(patients[i].last_name).replace(/\"/g, "");
		deserial.push(patient);

	}
	return(deserial);
}
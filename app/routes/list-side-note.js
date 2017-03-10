import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/1/medical_records/1/notes/'
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						notesW: data.notes,
						patientID : "1",//param.patientID
						medID: "1" //param.medID
					});
					console.log("status is " + data.notes);
					console.log(data.notes instanceof String);
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

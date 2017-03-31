import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(param){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/'+param.patientID+'/medical_records/'+param.recordID+'/notes/'
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						notesW: data.notes,
						patientID : param.patientID,
						recordID: param.recordID
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

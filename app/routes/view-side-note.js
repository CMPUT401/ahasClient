import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	
	{
	
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/1/medical_records/1/notes/1'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.note.id).replace(/\"/g, ""),
						   body: JSON.stringify(data.note.body).replace(/\"/g, "").replace(/\\n/g, " <br> "),
						   initials: JSON.stringify(data.note.initials).replace(/\"/g, ""),
				});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
                console.log("status is " + JSON.stringify(data));
				//console.log("status is " + JSON.stringify(data.appointment.sig));
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

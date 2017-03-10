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
						notesW: (data.notes)
					});
					console.log("status is " + JSON.stringify(data.notes));
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

function deserialAttributes(notes){

	var deserial = [];
	for(var i = 0; i < notes.length; i++) {
		var note = notes[i];
		note.id = JSON.stringify(notes[i].id).replace(/\"/g, "");
		deserial.push(note);

	}
	return(deserial);
}
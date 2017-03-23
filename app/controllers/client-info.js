import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		newPatient: function(clientID){
			console.log(clientID);
			this.transitionToRoute("/new-patient/").then(function(newRoute){
				newRoute.controller.set("c_ID",clientID)
			});
			//this.transitionTo('new-patient', { queryParams: { clientID: '1' }});
		},
		viewPatient: function(petId){
			console.log(petId);
			this.transitionToRoute("/view-patient/" + petId);
		},
		editClient: function(clientID){
			this.transitionToRoute('/edit-client/' + clientID);
		},

		newAppointment: function(clientID){
			console.log(clientID);
			this.transitionToRoute("/new-calendar/").then(function(newRoute){
				newRoute.controller.set("c_ID",clientID)
			});
		}
	}
});

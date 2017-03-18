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

		newSchedule: function(clientID){
			this.transitionToRoute("/new-calendar/" + clientID);
		}
	}
});

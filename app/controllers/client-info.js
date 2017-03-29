import Ember from 'ember';

/**
* Controller for client-info
* @class ClientInfoController
*/
export default Ember.Controller.extend({
	actions: {
		/** 
		* handles action called when user clicks New Patient button. 
		* redirects to the client's new patient page
		* @method newPatient
		* @param {int} clientID The ID of the client 
		*/
		newPatient: function(clientID){
			this.transitionToRoute("/new-patient/").then(function(newRoute){
				newRoute.controller.set("c_ID",clientID);
			});
			//this.transitionTo('new-patient', { queryParams: { clientID: '1' }});
		},
		/** 
		* handles the action called when user clicks on a patient's name. 
		* redirects to the patient's view-patient page
		* @method viewPatient
		* @param {int} petID The ID of the patient
		*/
		viewPatient: function(petId){
			this.transitionToRoute("/view-patient/" + petId);
		},
		/**
		* handles the action called when the user clicks the Edit Client button. 
		* redirects to the client's endit-client page
		* @method editClient
		* @param {int} clientID The ID of the client
		*/
		editClient: function(clientID){
			this.transitionToRoute('/edit-client/' + clientID);
		},
		/**
		* handles the action called when a user clicks the Make Appointment button. 
		* redirects to the client's callendar
		* @method newAppointment
		* @param {int} clientID The ID of the client
		*/
		newAppointment: function(clientID){
			this.transitionToRoute("/new-calendar/").then(function(newRoute){
				newRoute.controller.set("c_ID",clientID);
			});
		}
	}
});

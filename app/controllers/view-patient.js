import Ember from 'ember';
/**
* Controller for the view patients page
* This shows all the thisngs required for patient\
*only thing needed was to have a button to take you to upload a picture
* @class view-patient
*/
export default Ember.Controller.extend({
	 actions: {
	 			/**
		*Controller for edit patient
		*This changes the page to edit patient and transitions it away
		*@method editPatient()
		*/

		editPatient: function(patientID){
			this.transitionToRoute("/edit-patient/" + patientID);
		},
	 	
        uploadPicture(patientID){
            this.transitionToRoute("/upload-patient/"+patientID);
        },

        newAppointment: function(clientID){
			this.transitionToRoute("/new-calendar/").then(function(newRoute){
				newRoute.controller.set("c_ID",clientID);
			});
		}

}

});

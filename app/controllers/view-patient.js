import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patientID){
            console.log("we get here", patientID);
            this.transitionToRoute("/medical-record/").then(function(newRoute){
                newRoute.controller.set("p_ID",patientID)
            });
            //this.transitionToRoute('/medical-record/'+patient);
        },
        viewMedicalRecords(patient){
            console.log('patient', patient);
            this.transitionToRoute('/view-medical-record/').then(function(newRoute) {
            newRoute.currentModel.patientId = patient;
            console.log('new route', newRoute, newRoute.currentModel);
            //newRoute.currentModel.patient_id =  patient;
        });
     }

}

});
import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patient){
            console.log("we get here", patient);
            this.transitionToRoute('/medical-record/'+patient);
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
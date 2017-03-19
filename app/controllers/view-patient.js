import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patient){
            console.log("we get here", patient);
            this.transitionToRoute("/view-patient/"+patient+"/medical-record");
        },
        viewMedicalRecords(patient){
            console.log('patient', patient);
            this.transitionToRoute('/view-patient/'+patient+'/view-medical-record/1').then(function(newRoute) {
            console.log("holy fuck",newRoute.controller);
            newRoute.controller.set("p_ID",patient);
            console.log("at long last",newRoute.controller.get("p_ID"), ('view-patient').currentModel);
        });
     }

}

});
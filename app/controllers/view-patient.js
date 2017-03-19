import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patient){
            console.log("we get here", patient);
            this.transitionToRoute("/medical-record/").then(function(newRoute){
                controllerFor('medical-record').set("p_ID",patient);
                //newRoute.controller.set("p_ID",patient);
            });
        },
        viewMedicalRecords(patient){
            console.log('patient', patient);
            this.transitionToRoute('/view-medical-record/').then(function(newRoute) {
            console.log("holy fuck",newRoute.controller);
            newRoute.controller.set("p_ID",patient);
            console.log("at long last",newRoute.controller.get("p_ID"), ('view-patient').currentModel);
        });
     }

}

});
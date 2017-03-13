import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patient){
            console.log("we get here", patient);
            this.transitionToRoute('/medical-record/'+patient);
        }
	 }

});
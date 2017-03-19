import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        gotoMedicalRoute(patient){
            this.transitionToRoute("/view-patient/"+patient+"/medical-record");
        },
        viewMedicalRecords(patient){
            this.transitionToRoute('/view-patient/'+patient+'/view-medical-record/1');
            //this is still hardcoded for med rec number until i actually have a list to come from
     }

}

});
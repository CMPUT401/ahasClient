import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
	    sideNotes(model){
            console.log(model.medID,model.patID);
            this.transitionToRoute('/view-patient/' + model.patID + '/view-medical-record/'+ model.medID + '/notes');
        }
    }
});

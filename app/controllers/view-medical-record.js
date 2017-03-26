import Ember from 'ember';

/**
* Controller for view-medical-record
* @class ViewMedicalRecordController
*/

export default Ember.Controller.extend({
	actions: {
    /** 
		* handles action called when user clicks side-note-button
        * transitions to view-patient/:id/view-medical-record/:id/notes which is notes 
        * specific to one patient from one client
		* @method sideNotes
        * @param {object} model the model for this route and is passed in on action
		*/
	    sideNotes(model){
            console.log(model.medID,model.patID);
            this.transitionToRoute('/view-patient/' + model.patID + '/view-medical-record/'+ model.medID + '/notes');
        }
    }
});

import Ember from 'ember';

//{path: '/view-patient/:patientID/view-medical-record/:recordID/note/'}
export default Ember.Controller.extend({
    actions: {
        getNote(note){
            //console.log("we get here", patient);
            this.transitionToRoute('/api/patients/1/medical_records/1/notes/'+note);
        },
        createSideNote: function(model){
        	console.log(model.patientID , model.recordID);
                this.transitionToRoute("/new-side-note/").then(function(newRoute){
                newRoute.controller.set("r_ID",model.recordID)
            });
        }
    }
});
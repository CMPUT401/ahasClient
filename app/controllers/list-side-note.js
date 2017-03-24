import Ember from 'ember';

//{path: '/view-patient/:patientID/view-medical-record/:recordID/note/'}
export default Ember.Controller.extend({
    actions: {
        getNote(model,note){
            //console.log(model);
            this.transitionToRoute('/view-patient/'+model.patientID+'/view-medical-record/'+model.recordID+'/notes/'+note);
        },
        createSideNote: function(model){
        	console.log(model.patientID , model.recordID);
                this.transitionToRoute("/new-side-note/").then(function(newRoute){
                newRoute.controller.set("r_ID",model.recordID),
                newRoute.controller.set("p_ID",model.patientID)
            });
        }
    }
});
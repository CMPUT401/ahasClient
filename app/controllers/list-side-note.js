import Ember from 'ember';
/**
* Controller for the list side note page
* This shows all the side notes related to that specific patient, and medical record
* @class List-Side-Note Controller
*/
export default Ember.Controller.extend({
    actions: {
        /**
        * Redirects to a new fresh page of notes for creation
        * @method getNote
        * @params {object, int} model is the model passed in, note is the note number
        */
        getNote(model,note){
            //console.log(model);
            this.transitionToRoute('/view-patient/'+model.patientID+'/view-medical-record/'+model.recordID+'/notes/'+note);
        },
        /**
        * Redirects to the the view of the side notes individual
        * @method createSideNote
        * @params {object} the model first passed in through the route
        */
        createSideNote: function(model){
        	console.log(model.patientID , model.recordID);
                this.transitionToRoute("/new-side-note/").then(function(newRoute){
                newRoute.controller.set("r_ID",model.recordID);
                newRoute.controller.set("p_ID",model.patientID);
            });
        }
    }
});
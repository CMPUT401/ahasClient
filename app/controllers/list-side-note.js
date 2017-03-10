import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getNote(note){
            //console.log("we get here", patient);
            this.transitionToRoute('/api/patients/1/medical_records/1/notes/'+note);
        },
        filterPatient: function(){
            this.transitionToRoute('/api/patients/1/medical_records/1/notes/'+note);
        },
    }
});
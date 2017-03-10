import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getPatient(patient){
            console.log("we get here", patient);
            this.transitionToRoute('/view-patient/'+patient);
        },
        filterPatient: function(){
            var input = document.getElementById('search-bar').value.trim();
            if(input === "" || input === undefined){
                this.set('model.patientFiltered', this.get(model.patient));
            }
            else {
                filter(input, this.get('model'), this);
            }
        },
    }
});


function filter(input, model, self){
    var results = [];
    for(var i = 0; i < model.patient.length; i++){
        if(input === model.patients[i].first_name || input === model.patients[i].last_name){
            var patients = {
                            first_name: model.patients[i].first_name,
                            last_name: model.patients[i].last_name,
                            id: model.patients[i].id
                        };
            results.push(patient);
        }
    }
    self.set('model.patientFiltered', results);
}
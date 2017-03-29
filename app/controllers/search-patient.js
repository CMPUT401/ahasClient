import Ember from 'ember';
/**
* Controller for the search patient
* This shows all the patients in the backend
* @class search-patient Controller
*/

export default Ember.Controller.extend({
    actions: {

        /**
        * Redirects to a patient
        * @method getPatient
        * @params {int} patient id from model passed in
        */
        getPatient(patient){
            this.transitionToRoute('/view-patient/'+patient);
        },
        /**
        * Filters patient search bar
        * @method filterPatient
        */
        filterPatient: function(){
            var input = document.getElementById('search-bar').value.trim();
            if(input === "" || input === undefined){
                this.set('model.patientFiltered', this.get(model.patients));
            }
            else {
                filter(input, this.get('model'), this);
            }
        },
    }
});

        /**
        * Filters patient search bar
        * @method filterPatient
        */
function filter(input, model, self){
    var results = [];
    for(var i = 0; i < model.patients.length; i++){
        if(input === model.patients[i].first_name || input === model.patients[i].last_name){
            var patient = {
                            first_name: model.patients[i].first_name,
                            last_name: model.patients[i].last_name,
                            id: model.patients[i].id
                        };
            results.push(patient);
        }
    }
    self.set('model.patientFiltered', results);
}
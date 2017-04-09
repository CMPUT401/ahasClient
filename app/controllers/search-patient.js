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
                this.set('model.patientFiltered', this.get('model.patients'));
            }
            else {
                var lowerCaseInput = input.toLowerCase();
                filter(lowerCaseInput, this.get('model'), this);
            }
        },
    }
});

        /**
        * Filters patient search bar
        * @method filterPatient
        */
function filter(input, model, self){
    var reg = processSearch(input)
    var results = [];
    for(var i = 0; i < model.patients.length; i++){
        var firstName = model.patients[i].first_name.toLowerCase();
        var lastName = model.patients[i].last_name.toLowerCase();
        var fullName = firstName + " " + lastName;
        if(input === firstName || input === lastName || input === fullName || reg.test(fullName)){
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

/** 
 * used to build a regular expression pattern that can match full and partial
 * for example an input of alc for the possible client alice will find this result
 * @method processSearch
 * @param {string} input The searchbar input
 */  
function processSearch(input){
   
    var partialParsed = input[0];

    for (var i=1; i < input.length; i++){
        partialParsed = partialParsed + "[a-z]*" + input[i];
    }

    var parsed = new RegExp( partialParsed );

    return(parsed);
}
import Ember from 'ember';

/**
* Controller for search-contacts
* @class SearchContactController
*/


export default Ember.Controller.extend({
    actions: {

        /** 
		* action for clicking on a contact in the displayed list
        * takes us to the view-contact page for that contact
		* @method getContact
		* @param {id} contact The contact id for the contact we wish to view
		*/
        
        getContact(contact){

            this.transitionToRoute('/view-contact/'+contact);
        },
         /** 
		* action for clicking on te search-contacts-button or pressing enter while in the searchbar
        * if input is none we reset the search
        * else we filter the displayed lists based on input
		* @method filterContact
        */

        filterContact(){
            var input = document.getElementById('search-bar').value.trim();
            if (input === "" || input === undefined ){
                
                //on empty input reset to show all

                this.set('model.contactsFilteredVeterinarian', this.get('model.contactsVeterinarian'));
                this.set('model.contactsFilteredVolunteer', this.get('model.contactsVolunteer'));
                this.set('model.contactsFilteredLaboratory', this.get('model.contactsLaboratory'));
            
        }
            else{
            
            var lowerCaseInput = input.toLowerCase();

            filter(lowerCaseInput, this.get('model') , this);
           
            }

        }
    }
});
 /** 
		* used to filter the lists for searching for contacts
        * sets model attributes to the list to display which is contructed
        * from objects in the full model list which match the input criteria
		* @method filter
		* @param {string} input The searchbar input
        * @param {model} model The model for this controller
        * @param {self} controller the search-contact controller
		*/   

function filter(input, model, self){

    var reg = new RegExp( input );
    
    //filter volunteers
    var resultVolunteer = [];
    for (var i = 0; i<model.contactsVolunteer.length; i++){

        var firstNameVolunteer = model.contactsVolunteer[i].first_name.toLowerCase();
        var lastNameVolunteer = model.contactsVolunteer[i].last_name.toLowerCase();
        var volunteerFullName = firstNameVolunteer + " " + lastNameVolunteer;
        
        if (input ===  firstNameVolunteer || input === lastNameVolunteer || input === volunteerFullName || reg.test(volunteerFullName)){
            
            var contactVolunteer = { first_name : model.contactsVolunteer[i].first_name , last_name : model.contactsVolunteer[i].last_name, id: model.contactsVolunteer[i].id };
            resultVolunteer.push(contactVolunteer);
            
        }

    }

    self.set('model.contactsFilteredVolunteer', resultVolunteer);
    
    //filter veterinarians
    var resultVeterinarian = [];
    for (var x = 0; x<model.contactsVeterinarian.length; x++){

        var firstNameVeterinarian = model.contactsVeterinarian[x].first_name.toLowerCase();
        var lastNameVetrinarian = model.contactsVeterinarian[x].last_name.toLowerCase();
        var veterinarianFullName = firstNameVeterinarian + " " + lastNameVetrinarian;
         
        if (input === firstNameVeterinarian || input === lastNameVetrinarian || input === veterinarianFullName || reg.test(veterinarianFullName)){
            
            var contactVeterinarian = { first_name : model.contactsVeterinarian[x].first_name , last_name : model.contactsVeterinarian[x].last_name, id: model.contactsVeterinarian[x].id };
            resultVeterinarian.push(contactVeterinarian);
           
        }

    }
    self.set('model.contactsFilteredVeterinarian', resultVeterinarian);


    //filter laboratory
    var resultLaboratory = [];
    for (var j = 0; j<model.contactsLaboratory.length; j++){

        var firstNameLaboratory = model.contactsLaboratory[j].first_name.toLowerCase();
        var lastNameLaboratory = model.contactsLaboratory[j].last_name.toLowerCase();
        var LaboratoryFullName = firstNameLaboratory + " " + lastNameLaboratory;
        
        if (input === firstNameLaboratory || input === lastNameLaboratory || input === LaboratoryFullName || reg.test(LaboratoryFullName)){

            var contactLaboratory = { first_name : model.contactsLaboratory[j].first_name , last_name : model.contactsLaboratory[j].last_name , id: model.contactsLaboratory[j].id};
            resultLaboratory.push(contactLaboratory);
        }

    }
     self.set('model.contactsFilteredLaboratory', resultLaboratory);
}



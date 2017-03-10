import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("we get here", contact);
            this.transitionToRoute('/view-contact/'+contact);
        },
        filterContact(){
            var input = document.getElementById('search-bar').value.trim();
            if (input === "" || input === undefined ){
                
                //on empty input reset to show all

                this.set('model.contactsFilteredVeterinarian', this.get('model.contactsVeterinarian'));
                this.set('model.contactsFilteredVolunteer', this.get('model.contactsVolunteer'));
                this.set('model.contactsFilteredLaboratory', this.get('model.contactsLaboratory'));
            
        }
            else{
            
            filter(input, this.get('model') , this);
           
            }

        }
    }
});

function filter(input, model, self){
    
    //filter volunteers
    var resultVolunteer = [];
    for (var i = 0; i<model.contactsVolunteer.length; i++){
        
        if (input === model.contactsVolunteer[i].first_name || input === model.contactsVolunteer[i].last_name){
            
            var contactVolunteer = { first_name : model.contactsVolunteer[i].first_name , last_name : model.contactsVolunteer[i].last_name };
            resultVolunteer.push(contactVolunteer);
            
        }

    }

    self.set('model.contactsFilteredVolunteer', resultVolunteer);
    
    //filter veterinarians
    var resultVeterinarian = [];
    for (var x = 0; x<model.contactsVeterinarian.length; x++){
         
        if (input === model.contactsVeterinarian[x].first_name || input === model.contactsVeterinarian[x].last_name){
            
            var contactVeterinarian = { first_name : model.contactsVeterinarian[x].first_name , last_name : model.contactsVeterinarian[x].last_name };
            resultVeterinarian.push(contactVeterinarian);
           
        }

    }
    self.set('model.contactsFilteredVeterinarian', resultVeterinarian);

    //filter laboratory
    var resultLaboratory = [];
    for (var j = 0; j<model.contactsLaboratory.length; j++){
        
        if (input === model.contactsLaboratory[j].first_name || input === model.contactsLaboratory[j].last_name){

            var contactLaboratory = { first_name : model.contactsLaboratory[j].first_name , last_name : model.contactsLaboratory[j].last_name };
            resultLaboratory.push(contactLaboratory);
        }

    }
     self.set('model.contactsFilteredLaboratory', resultLaboratory);
}



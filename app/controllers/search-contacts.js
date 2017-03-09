import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("we get here", contact);
            this.transitionToRoute('/view-contact/'+contact);
        },
        filterContact(){
            var input = document.getElementById('search-bar').value.trim()
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
            
            var contact = { first_name : model.contactsVolunteer[i].first_name , last_name : model.contactsVolunteer[i].last_name };
            resultVolunteer.push(contact);
            
        }

    }

    self.set('model.contactsFilteredVolunteer', resultVolunteer);
    
    //filter veterinarians
    var resultVeterinarian = [];
    for (var i = 0; i<model.contactsVeterinarian.length; i++){
         
        if (input === model.contactsVeterinarian[i].first_name || input === model.contactsVeterinarian[i].last_name){
            
            var contact = { first_name : model.contactsVeterinarian[i].first_name , last_name : model.contactsVeterinarian[i].last_name };
            resultVeterinarian.push(contact);
           
        }

    }
    self.set('model.contactsFilteredVeterinarian', resultVeterinarian);

    //filter laboratory
    var resultLaboratory = [];
    for (var i = 0; i<model.contactsLaboratory.length; i++){
        
        if (input === model.contactsLaboratory[i].first_name || input === model.contactsLaboratory[i].last_name){

            var contact = { first_name : model.contactsLaboratory[i].first_name , last_name : model.contactsLaboratory[i].last_name };
            resultLaboratory.push(contact);
        }

    }
     self.set('model.contactsFilteredLaboratory', resultLaboratory);
}



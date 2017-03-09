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
}
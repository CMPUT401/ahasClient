import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("we get here", contact);
            this.transitionToRoute('/view-contact/'+contact);
        },
        filterContact(model){
            var lol = document.getElementsByClassName('veterinariansContact');
           //just clear all for now, conservative in clearing all. maybe not necessary
           //guess only want to do this if the query is valid.... lol 
           Ember.$('.veterinariansContact').html('<div></div>');
           Ember.$('.volunteersContact').html('<div></div>');
           Ember.$('.laboratoryContact').html('<div></div>');

            console.log(JSON.stringify(model) ,document.getElementById('search-bar').value , lol);
        }
    }
});



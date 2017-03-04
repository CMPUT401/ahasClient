import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("we get here", contact);
            //this.transitionToRoute('/view-contact/'+contact);
        }
    }
});

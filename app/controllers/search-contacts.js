import Ember from 'ember';


export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("yes");
            //this.transitionToRoute('/view-contact/'+contact);
        }
    }
});

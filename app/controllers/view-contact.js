import Ember from 'ember';

/**
* Controller for view-contact
* @class ViewContactController
*/


export default Ember.Controller.extend({
     actions:{
/** 
		* handles action called when user clicks edit-contact-button
		* transitions to edit-contact for that specific contact
		* @method gotoEditContact
    * @param {string} id The id to use to transition
		*/
     gotoEditContact: function(id, role) {
        if(role){
        this.transitionToRoute('/edit-contact/'+id );
        }
     }
  }
});

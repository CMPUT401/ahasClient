import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     gotoEditContact: function(id) {
        this.transitionToRoute('/edit-contact/'+id );
     }
  }
});

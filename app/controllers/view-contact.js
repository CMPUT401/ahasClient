import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     gotoEditContact: function(model) { 
         this.transitionToRoute('/edit-contact');
     }
  }
});

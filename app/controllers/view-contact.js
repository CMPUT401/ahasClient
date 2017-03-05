import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     gotoEditContact: function(model) {
         //so that we can fetch this locally in the next template
        localStorage.setItem("contact", JSON.stringify(model) );
        var model = localStorage.getItem("contact");
        this.transitionToRoute('/edit-contact');
     }
  }
});

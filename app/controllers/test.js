import Ember from 'ember';

export default Ember.Controller.extend({  
  // An independent list is needed as a container for each type of med
  medicine: [],
  vaccine: [],
  other: [],
  actions:{
    alertMedication: function(){
      // Add things to a new array to see what it looks like
      alert(JSON.stringify([].concat(this.medicine).concat(this.vaccine).concat(this.other)));
    }
  }
});

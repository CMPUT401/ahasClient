import Ember from 'ember';

export default Ember.Controller.extend({  
  // An independent list is needed as a container for each type of med
  medicine: [],
  vaccine: [],
  other: []
});

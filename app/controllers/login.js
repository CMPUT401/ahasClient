import Ember from 'ember';

export default Ember.Controller.extend({  
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties
        ('identification', 'password'),
        authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).then(()=>{
        this.transitionToRoute('/afterlogin');
        },
          (reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
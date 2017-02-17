import Ember from 'ember';

export default Ember.Controller.extend({  
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties
        ('username', 'password'),
        authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).catch((reason)=>{
        console.log("ahh", reason.error, reason);
        this.set('errorMessage', reason.error || reason);
      });
       if (this.get('session.isAuthenticated')){
       this.transitionToRoute('/afterlogin');
        }
    }
  }
});
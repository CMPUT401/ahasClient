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
        this.set('errorMessage', reason.error || reason);
      });
       this.transitionToRoute('/afterlogin');
        /*.then(()=>{
        console.log("we get here", jwt);
        console.log("we get here yay");
        this.transitionToRoute('/afterlogin');
        },
          (reason) => {
        this.set('errorMessage', reason.error || reason);
      });*/
    }
  }
});
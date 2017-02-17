import Ember from 'ember';

export default Ember.Controller.extend({  
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('username', 'password');
      const { username, password } = credentials;
      var inputFilled = checkFields(username, password);
      if(inputFilled){
        var authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).catch((reason)=>{
        this.set('errorMessage', reason.error || reason);
      });
       if (this.get('session.isAuthenticated')){
       this.transitionToRoute('/afterlogin');
        }
    }
  }
}
});

//make sure that we dont post undefined to server
function checkFields(username, password){
  if(username === undefined || password === undefined){
    return false;
  }
  return true;
}
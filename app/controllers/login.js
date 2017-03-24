import Ember from 'ember';

/**
* Controller for login
* @class LoginController
*/

export default Ember.Controller.extend({  
  session: Ember.inject.service(),

  actions: {
    /** 
		* handles action called when user clicks the login-button
    * delegates for input checking and if those succeed it uses the authenticator in jwt.js to authenticate
		* @method authenticate
		*/
    authenticate: function() {
      var credentials = this.getProperties('username', 'password');
      const { username, password } = credentials;
      var inputFilled = checkFields(username, password);
      if (inputFilled === false ){
        showAlert('Please fill in all fields');
      }
      else if (this.get('session.isAuthenticated')){
       showAlert('You are already logged in!');
        }
      else if(inputFilled){
        var authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).catch((reason)=>{
        this.set('errorMessage', reason.error || reason);
      });     
    }
  }
}
});

/** 
		* make sure that we dont post undefined to server
		* @method  checkFields
		* @param {string} username The attempted username
  	* @param {string} password The attempted password
		*/   
function checkFields(username, password){
  if(username === undefined || password === undefined){
    return false;
  }
  return true;
}

/** 
		* used to provide feedback to user on fail condition
		* @method  showAlert
		* @param {string} message The message to display in the alert
		*/   
function showAlert(message) {
        
      Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        
 }
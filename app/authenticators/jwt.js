import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';  
import config from '../config/environment';
const { RSVP: { Promise } } = Ember;

/**
* jwt authenticator
* @class authenticator
*/


export default Base.extend({  
  ajax: Ember.inject.service(),
  tokenEndpoint: `${config.server}/api/user_token`,
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  /** 
	* handles call from login file
  * makes a post request to the server with authentication items
  * if this is success , gets a jwt back and ember-simple-auth addon handles method that stores it
	* @method authenticate
	*/
  authenticate(creds) {
    const { username, password } = creds;

    return new Promise((resolve, reject) =>
    this.get('ajax').post(this.tokenEndpoint, {
        type: 'application/json',
        data: { auth: {
          email: username,
          password: password,
        }
    }
    }).then((response) => {
    const { jwt } = response;
    Ember.run(() => {
      resolve({
        token: jwt
      });
    });
    }, function() {
        showAlert("The username and password you entered do not match");
    }, (error) => {
      //not sure if we will ever need this or if it is the appropriate message for whatever this condition will be
        showAlert("There was an error logging in");
        Ember.run(() => {
          reject(error);
        });
    }));
  }, 
  
  /** 
	* used to invalidate a session
	* @method invalidate
	*/
  invalidate(data) {
    return Promise.resolve(data);
  }
});

/** 
		* used to provide feedback to user on fail condition
		* @method  showAlert
		* @param {string} message The message to display in the alert
		*/  

function showAlert(message) {

     Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
 
}
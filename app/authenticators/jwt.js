import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';  
import config from '../config/environment';
const { RSVP: { Promise } } = Ember;
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
  authenticate(creds) {
    const { username, password } = creds;

    return this.get('ajax').post(this.tokenEndpoint, {
        type: 'application/json',
        data: { auth: {
          email: username,
          password: password,
        }
    }
    }).then(function(response){
        console.log("our response", response, response.jwt);
        const { jwt } = response.jwt;
        token: jwt
      }, function(){
          //maybe want to display something
    });
  }, 
  invalidate(data) {
    return Promise.resolve(data);
  }
});
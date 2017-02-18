import Base from 'ember-simple-auth/authorizers/base';  
import Ember from 'ember';

export default Base.extend({  
  session: Ember.inject.service(),
  authorize(data, request) {
    if (Ember.testing) {
      request.setRequestHeader('Authorization', 'Bearer beyonce');
    }
    const { token } = data;
    console.log("getting places");
    if (this.get('session.isAuthenticated') && token) {
      console.log("THE auth data" , data, token, request);
      request.setRequestHeader('Authorization', `Bearer ${token}`);
      //this is how to add a field to preexisting header which is what we want. but how to get request to here?
      // all amber-ajax ever returns is promises, not request before sending.....
    }
  }
});
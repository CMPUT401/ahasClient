import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';


export default AjaxService.extend({
	//not sure if this is needed
	trustedHosts: [
   'https://ahas.herokuapp.com'
  ],
	host: 'https://ahas.herokuapp.com',
	

	session: Ember.inject.service(),
  	headers: Ember.computed('session.data.authenticated.token', {
    get() {
	  let headers = {};
	  const token = this.get('session.data.authenticated.token'); // const  token = false;
      if (this.get('session.isAuthenticated') && token) {
		headers['Authorization'] = 'Bearer ' + token; 
		console.log("HOW ABOUT NOW", token, headers);
      }
	  return(headers);
    }
  })
});


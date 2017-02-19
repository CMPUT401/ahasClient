import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';


export default AjaxService.extend({
	trustedHosts: [
   'https://ahas.herokuapp.com'
  ],
	host: 'https://ahas.herokuapp.com',
	
	//the reason this wont work for us is because it overwrites previous header, only want to add to preexisting . 

	session: Ember.inject.service(),
  	headers: Ember.computed('session.data.authenticated.token', {
    get() {
	  let headers = {};
	  const  token  = this.get('session.data.authenticated.token');
      if (this.get('session.isAuthenticated') && token) {
		headers['Authorization'] = token; 
		console.log("HOW ABOUT NOW", token, headers);
      }
	  return(headers);
    }
  })
});


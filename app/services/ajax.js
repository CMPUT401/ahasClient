import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';


export default AjaxService.extend({
	host: 'https://ahas.herokuapp.com',
	
	//the reason this wont work for us is because it overwrites previous header, only want to add to preexisting . 

	/*session: Ember.inject.service(),
  	headers: Ember.computed('session.token', {
    get() {
	  let headers = {};
	  const  token  = this.get('session.token'); //also undefined here for some reason...
	  console.log("WE USE THIS", token);
      if (this.get('session.isAuthenticated') && token) {
		headers['auth-token'] = token; 
		console.log("HOW ABOUT NOW", token);
      }
	  return(headers);
    }
  })*/
});


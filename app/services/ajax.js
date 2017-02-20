import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';


export default AjaxService.extend({

	host: 'https://ahas.herokuapp.com',

	session: Ember.inject.service(),
  	headers: Ember.computed('session.data.authenticated.token', {
    get() {
	  let headers = {};
	  const token = this.get('session.data.authenticated.token');
      if (this.get('session.isAuthenticated') && token) {
		headers['Authorization'] =  token ; 
      }
	  return(headers);
    }
  })
});


import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default Ember.Service.extend({
	//TODO add header of the format
	// “Authorization”: “Bearer ” + JWT
	host: 'https://ahas.herokuapp.com'
});

import AjaxService from 'ember-ajax/services/ajax';

// export default Ember.Service.extend({

// });

export default AjaxService.extend({
	//TODO add header of the format
	// “Authorization”: “Bearer ” + JWT
	host: 'https://ahas.herokuapp.com'
});

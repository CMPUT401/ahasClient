import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	actions:{
		saveClient: function(){
			console.log("saving client!");
		}
	}
});

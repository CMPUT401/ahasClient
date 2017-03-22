import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	actions:{
		saveClient: function(){
			//disable button
			document.getElementById("create-client-button").disabled = true; 
			console.log("saving client!");
			//make ajax put request
		}
	}
});

import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		fileLoaded: function(file){
			console.log("name is " + file.name);
			console.log("type is " + file.type);
			console.log("data is ");
			console.log(file.data);
			console.log("size is " + file.size + " bytes");
		},
		sendFile:function(file){
			console.log("uploading file " + file.name);
		}
	}
});

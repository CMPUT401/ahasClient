import Ember from 'ember';

export default Ember.Controller.extend({
	loadedFile: null,
	actions: {
		fileLoaded: function(file){
			this.set('loadedFile', file);
			console.log("name is " + file.name);
			console.log("type is " + file.type);
			console.log("data is ");
			console.log(file.data);
			console.log("size is " + file.size + " bytes");
		},
		sendLabResults: function(){
			console.log("uploading file " + this.loadedFile.name);
		}
	}
});

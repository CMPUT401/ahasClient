import Ember from 'ember';

export default Ember.Controller.extend({
	loadedFile: null,
	ajax: Ember.inject.service(),
	actions: {
		fileLoaded: function(file){
			this.set('loadedFile', file);
			// console.log("name is " + file.name);
			// console.log("type is " + file.type);
			// console.log("data is ");
			// //console.log(file.data);
			// console.log("size is " + file.size + " bytes");
		},
		sendLabResults: function(patientId){
			console.log("uploading file " + this.loadedFile.name + 
				" " + this.loadedFile.data);
			console.log("patient id is " + patientId);
			// var = self;
			// let ajaxPost = this.get('ajax').post('api/lab', {
			// 	type
			// })
		}
	}
});

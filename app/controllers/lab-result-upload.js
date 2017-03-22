import Ember from 'ember';

export default Ember.Controller.extend({
	loadedFile: null,
	session: Ember.inject.service(),
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
			document.getElementById("saveLabResults").disabled = true;
			console.log("uploading file " + this.loadedFile.name + 
				" " + this.loadedFile.data);
			console.log("patient id is " + patientId);
			console.log("date is " + this.get('datePicker'));
			var self = this;
			let ajaxPost = this.get('ajax').post('api/patients/' + patientId + "/images", {
				type: 'application/json',
				data: {image: {
					patient_id: patientId,
					file_name: this.loadedFile.name,
					data: this.loadedFile.data,
					picture_type: "lab result",
					date: this.get('datePicker')
				}},
			}).then(function(response){
				console.log("status is " +JSON.stringify(response));
				self.transitionToRoute('/view-patient/' + patientId);

			}, function(response){
				document.getElementById("saveLabResults").disabled = false;
				console.log("status is " + JSON.stringify(response));
				if(response === false){
					if(self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionToRoute('/login');
				}
			});
			return ajaxPost;
		}
	}
});

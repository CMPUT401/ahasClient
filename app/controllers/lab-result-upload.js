import Ember from 'ember';

/**
* Controller for lab-result-upload
* @class labResultUploadController
*/
export default Ember.Controller.extend({
	loadedFile: null,
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	actions: {
		fileLoaded: function(file){
			this.set('loadedFile', file);
		},
		/**
		* makes an ajax POST request to save the lab result
		* @param {int} the patient's id
		* @method sendLabResults
		*/
		sendLabResults: function(patientId){
			document.getElementById("saveLabResults").disabled = true;
			var partialDate = this.get('datePicker');
			var partialDate2 = partialDate.toString().split(' ');
			var imageDate = partialDate2[2] + "/" + partialDate2[1] + "/" + partialDate2[3];
			var self = this;
			let ajaxPost = this.get('ajax').post('api/patients/' + patientId + "/images", {
				type: 'application/json',
				data: {image: {
					patient_id: patientId,
					name: this.loadedFile.name,
					data: this.loadedFile.data,
					picture_type: "lab result",
					date: Date.parse(imageDate)/1000
				}},
			}).then(function(response){
				self.transitionToRoute('/view-patient/' + patientId);

			}, function(response){
				document.getElementById("saveLabResults").disabled = false;
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

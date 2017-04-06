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
			// if(file.type.toString() === "image/jpeg"){
			// 	console.log("we have a jpg");
			// } else if (file.type.toString() === "image/png"){
			// 	console.log("we have a png");
			// } else if (file.type.toString() === "application/pdf"){
			// 	console.log("we have a pdf");
			// } else{
			// 	console.log("invalid file type");
			// }
			// console.log(file.type.toString());
			this.set('loadedFile', file);
		},
		/**
		* makes an ajax POST request to save the lab result
		* @param {int} the patient's id
		* @method sendLabResults
		*/
		sendLabResults: function(patientId){
			
			var partialDate = this.get('datePicker');
			var partialDate2 = partialDate.toString().split(' ');
			var imageDate = partialDate2[2] + "/" + partialDate2[1] + "/" + partialDate2[3];
			var self = this;

			if(checkFileType(self)){
				document.getElementById("saveLabResults").disabled = true;
				let ajaxPost = this.get('ajax').post('api/patients/' + patientId + "/images", {
					type: 'application/json',
					data: {image: {
						patient_id: patientId,
						name: this.loadedFile.name,
						data: this.loadedFile.data,
						picture_type: "lab result",
						date: Date.parse(imageDate)/1000,
						data_type: this.loadedFile.type
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
	}
});


/** 
* used to provide feedback to user on success condition as well as fail condition
* only displayed very briefly on success condition however before transition
* @method  showAlert
* @param {string} message The message to display in the alert
* @param {boolean} isGood Determines if this is a warning alert or confirmation alert. true for good, false for bad
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/   
function showAlert(message, isGood, divID) {
        if(isGood){
            Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
}


/**
* Checks that the file type is valid. shows alert and return false if it not, true otherwise
* @method checkFileType
* @param {object} self The controller
*/
function checkFileType(self){
	var fType = self.loadedFile.type.toString();
	if(fType === "image/jpeg" || fType === "application/pdf" || fType === "image/png" ){
		return true;
	}else{
		showAlert("Invalid file type. File must be jpg, png, or pdf", false, "fileType");
		return false;
	}
}
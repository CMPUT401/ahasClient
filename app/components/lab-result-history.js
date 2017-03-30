import Ember from 'ember';

/**
* controller for the lab-result-history component. Make AJAX get request on init
* @class LabResultHistoryComponentController
*/
export default Ember.Component.extend({
	isVisible: false,
	patientId: 0,
	ajax: Ember.inject.service(),
	labResultList: [],
	router: Ember.inject.service('-routing'),
	actions: {
		/**
		* Redirects to the lab result upload page when user clicks on the Upload Lab Result button
		* @method uploadResult
		*/
		uploadResult: function(){
			// console.log("making a new medical history entry");
			this.get('router').transitionTo('lab-result-upload', [this.patientId]);
		},
		/**
		* Redirects to the lab result page when the user clicks on it in the list
		* @param {int} labResultID The ID of the lab result that has been clicked
		* @method viewEntry
		*/
		viewEntry: function(labResultID){
			// TODO transition to lab result
			this.get('router').transitionTo('view-image-record', [this.patientId, labResultID]);
		}
	},
	init(){
		this._super(...arguments);
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/images'
				).then(function(data){
					Ember.run(function(){
						resolve({
							// labResults: deserialAttributes(data.images)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('labResultList', deserialAttributes(data.images));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
					}		
				})
		);
	}
});

/**
* deserializes the lab results after they have been received by the AJAX request. 
* Filters picture_type for lab result. Also formats dates
* @param {object} labResults the JSON object received
* @method deserialAttributes
*/
function deserialAttributes(labResults){
	var deserial = [];
	for(var i = 0; i < labResults.length; i++) {
		var entry = labResults[i];
		if(entry.picture_type.toLowerCase() === "lab result"){
			// console.log("is lab result")
			entry.imageId = JSON.stringify(labResults[i].id).replace(/\"/g, "");
			if(JSON.stringify(labResults[i].file_name) != null){
				entry.name = JSON.stringify(labResults[i].name).replace(/\"/g, "");
			} 
			if(JSON.stringify(labResults[i].date) != null){
				// var partialDate = JSON.stringify(labResults[i].date).replace(/\"/g, "").slice(0, 10);
				// var partialDate2 = partialDate.split("-");
				// entry.date = partialDate2[1] + "/" +partialDate2[2] + "/" + partialDate2[0];
				var date = new Date(JSON.stringify(labResults[i].date)*1000);
				entry.date = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
			}
			deserial.push(entry);
		}
	}
	return(deserial);
}

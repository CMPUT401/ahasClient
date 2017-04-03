import Ember from 'ember';

/**
* controller for the medication-history component. Make AJAX get request on init
* @class MedicationHistoryComponentController
*/
export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	medicationList: [],
	router: Ember.inject.service('-routing'),
	actions:{
		/**
		* Redirects to the new medical entry page when user clicks on the New Entry button
		* @method newEntry
		*/
		newEntry: function(){
			this.get('router').transitionTo('new-medical-record', [this.patientId]);
		},
		/**
		* Redirects to the medical record page when the user clicks on it in the list
		* @param {int} recordID The ID of the medical record that has been clicked
		* @method viewEntry
		*/
		viewEntry: function(recordID){
			//this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
			this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
		}
	},
	init(){
		this._super(...arguments);
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/medications'
				).then(function(data){
					Ember.run(function(){
						resolve({
							// medications: deserialAttributes(data.medications)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicationList', deserialAttributes(data.medications));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
					}		
				})
		);
		return(ajaxGet);
	}
});

/**
* deserializes the mdeications after they have been received by the AJAX request. 
* Filters med_type for medicine. Also formats dates
* @param {object} meds the JSON object received
* @method deserialAttributes
*/
function deserialAttributes(meds){
	var deserial = [];
	for(var i = 0; i < meds.length; i++) {
		var entry = meds[i];
		if(entry.med_type.toLowerCase() === "medicine"){
			entry.recordId = JSON.stringify(meds[i].id).replace(/\"/g, "");
			if(JSON.stringify(meds[i].medical_record_id) != null){
				entry.medical_record_id = JSON.stringify(meds[i].medical_record_id).replace(/\"/g, "");
			}
			// if(JSON.stringify(meds[i].med_type) === "medicine"){
			if(JSON.stringify(meds[i].name) != null){
				entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
			}
			if(JSON.stringify(meds[i].created_at) != null){
				var partialDate = JSON.stringify(meds[i].created_at).replace(/\"/g, "").slice(0, 10);
				var partialDate2 = partialDate.split("-");
				entry.date = partialDate2[1] + "/" +partialDate2[2] + "/" + partialDate2[0];
			}
			deserial.push(entry);
		}
		
		// }else{
		// 	console.log(JSON.stringify(meds[i].med_type));
		// }
	}
	return(deserial);
}

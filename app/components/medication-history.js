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
		* @param {Date} date Date of the medical record. 
		* @method viewEntry
		*/
		viewEntry: function(recordID, date){
			var check = checkUpdate(date);
			if(check){
				this.get('router').transitionTo('view-medical-record-editable', [this.patientId, recordID]);
			}
			else{
				this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
			}
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
						
						});
		
						self.set('medicationList', deserialAttributes(data.medications));
					});
				},
				function(data){
					if (data === false){

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
			if(JSON.stringify(meds[i].name) != null){
				entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
			}
			if(JSON.stringify(meds[i].created_at) != null){
				var parital1 = JSON.stringify(meds[i].created_at).replace(/\"/g, "").slice(0, 10);
				var parital2 = parital1.split("-");
				entry.dateToDisplay = parital2[1] + "/" +parital2[2] + "/" +parital2[0]; 
				entry.date = parital2;
			}
			deserial.push(entry);
		}
		
	}
	return(deserial);
}

/**
* checks to see if the medical record can still be edited
* @param {date} date Date of the medical record. not in unix time for once, was parsed from created_at field 
* @method checkUpdate
*/
function checkUpdate(date){

	var day = date[2] ;
    var month = date[1] -1 ;
	var year = date[0];

    var current = new Date();

    var currentMonth = current.getMonth()  ;
    var currentYear = current.getFullYear();

	if(current.getDate() < 10){
		var currentDay =  '0'+ current.getDate().toString();
	}
	else{
		var currentDay =  current.getDate().toString();
	}

    if (currentDay === day.toString() && currentMonth.toString() === month.toString() && currentYear.toString() === year.toString() ){
        return(true);
    }
    return(false);
}
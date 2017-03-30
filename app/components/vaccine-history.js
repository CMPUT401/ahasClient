import Ember from 'ember';

/**
* controller for the vaccine-history component. Make AJAX get request on init
* @class VaccineHistoryComponentController
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
           	this.get('router').transitionTo('medical-record', [this.patientId]);
		},
		toggleVisibility: function(){
			// console.log("show medication, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible'),
		/**
		* Redirects to the medical record page when the user clicks on it in the list. Medical record
		* may be editable depending on the date
		* @param {int} recordID The ID of the medical record that has been clicked
		* @param {Date} date Date of the medical record. In Unix time.
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
							vaccines: deserialAttributes(data.medications)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('vaccineList', deserialAttributes(data.medications));
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
* deserializes the vaccines after they have been received by the AJAX request. 
* Filters med_type for vaccine.
* @param {object} meds the JSON object received
* @method deserialAttributes
*/
function deserialAttributes(meds){
	var deserial = [];
	for(var i = 0; i < meds.length; i++) {
		var entry = meds[i];
        if (entry.med_type === "Vaccine" || entry.med_type === "vaccine"){
		
		if(JSON.stringify(meds[i].medical_record_id) != null){
			entry.medical_record_id = JSON.stringify(meds[i].medical_record_id).replace(/\"/g, "");
		}
		// if(JSON.stringify(meds[i].med_type) === "medicine"){
		if(JSON.stringify(meds[i].name) != null){
			entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
		}
		if(JSON.stringify(meds[i].created_at) != null){
			
			var parital1 = JSON.stringify(meds[i].created_at).replace(/\"/g, "").slice(0, 10);
			var parital2 = parital1.split("-");
			entry.dateToDisplay = parital2[1] + "/" +parital2[2] + "/" +parital2[0]; 
			//entry.dateToDisplay =meds[i].created_at;
			entry.date = parital2;
          
		}
		deserial.push(entry);
	}
    }
	return(deserial);
}

/**
* checks to see if the medical record can still be edited
* @param {date} olddate Date of the medical record. In Unix time.
* @method checkUpdate
*/
function checkUpdate(date){

	var day = date[2] ;
    var month = date[1] -1 ;
	var year = date[0];

    var current = new Date();

    var currentDay = current.getDate() ;
    var currentMonth = current.getMonth()  ;
    var currentYear = current.getFullYear();

    if (currentDay.toString() === day.toString() && currentMonth.toString() === month.toString() && currentYear.toString() === year.toString() ){
        return(true);
    }
    return(false);
}


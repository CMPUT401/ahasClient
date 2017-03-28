import Ember from 'ember';

/**
* controller for the patient-history component. Make AJAX get request on init. 
* Shows the entire medical history for the patient in chronological order. 
* @class patientHistoryComponentController
*/
export default Ember.Component.extend({
	isVisible: true,
	patientId: 0,
	ajax: Ember.inject.service(),
	medicalRecord: [],
	router: Ember.inject.service('-routing'),
	actions:{
			newEntry: function(){
           	this.get('router').transitionTo('medical-record', [this.patientId]);
		},
		toggleVisibility: function(){
			// console.log("show chrono, the id is " + patientId);
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
			this.get('ajax').request('api/patients/' + this.patientId + '/medical_records'
				).then(function(data){
					Ember.run(function(){
						resolve({
							//why is this in here as well as self.set ect? -kristy
							history: deserialAttributes(data.medical_records)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicalRecord', deserialAttributes(data.medical_records));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
					}		
				})
		);
		return(ajaxGet);
	}
});

/**
* deserializes the medical history after they have been received by the AJAX request. 
* Filters med_type for medicine.
* @param {object} history the JSON object received
* @method deserialAttributes
*/
function deserialAttributes(history){
	var deserial = [];
	for(var i = 0; i < history.length; i++) {
		var entry = history[i];
		entry.recordId = JSON.stringify(history[i].id).replace(/\"/g, "");
		if(JSON.stringify(history[i].exam_notes) != null){
			entry.examNotes = JSON.stringify(history[i].summary).replace(/\"/g, "");
		}else {
			entry.examNotes = JSON.stringify(history[i].summary);
		}
		if(JSON.stringify(history[i].created_at) !== null){
			//convert from unix time to a date string
			var formattedDateCreated = format(history[i].created_at);
			entry.dateToDisplay = formattedDateCreated;
			//also want to keep one unix time for our checkUpdate function
			entry.date = history[i].created_at;
		}else{
			//not sure when we would ever get here...
			var formattedDateOrig = format(history[i].date);
			entry.dateToDisplay = formattedDateOrig;
			entry.date = history[i].date;
		}
		deserial.push(entry);

	}
	return(deserial);
}

/**
* checks to see if the medical record can still be edited
* @param {date} olddate Date of the medical record. In Unix time.
* @method checkUpdate
*/
function checkUpdate(olddate){

	var date = new Date(olddate*1000);

    var day = date.getDay() ;
    var month = date.getMonth()  ;
    var year = date.getFullYear();

    var current = new Date();

    var currentDay = current.getDay() ;
    var currentMonth = current.getMonth()  ;
    var currentYear = current.getFullYear();
    var currentHours = current.getHours();

    //exact minute of midnight is when we will autofinalize
    if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24 ){
        return(true);
    }
    return(false);
}

/**
* format he date to month/day/year
* @param{date} {Date} Date in unix time
* @method format
*/
function format(date){
	var entryDate = new Date(JSON.stringify(date).replace(/\"/g, "") *1000);
	var day = (entryDate.getDate()<10?'0':'' )+ entryDate.getDate();
	var month = (entryDate.getMonth()<10?'0':'' )+ (entryDate.getMonth()+1);
	var year = entryDate.getFullYear();
	var newDate = month + "/" + day + "/" + year;
	return(newDate);

}
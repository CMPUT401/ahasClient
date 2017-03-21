import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	medicationList: [],
	router: Ember.inject.service('-routing'),
	actions:{
		newEntry: function(){
            //this should just go to medical record creation right? or is this button even needed?
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			// console.log("show medication, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible'),
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
					console.log("data is" + JSON.stringify(data));
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
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		console.log(this.medicationList);
	}
});

function deserialAttributes(meds){
	var deserial = [];
	for(var i = 0; i < meds.length; i++) {
		var entry = meds[i];
        if (entry.med_type === "Vaccine" || entry.med_type === "vaccine"){
		entry.recordId = JSON.stringify(meds[i].id).replace(/\"/g, "");
		if(JSON.stringify(meds[i].medical_record_id) != null){
			entry.medical_record_id = JSON.stringify(meds[i].medical_record_id).replace(/\"/g, "");
		}
		// if(JSON.stringify(meds[i].med_type) === "medicine"){
		if(JSON.stringify(meds[i].name) != null){
			entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
		}
		if(JSON.stringify(meds[i].created_at) != null){
			
			entry.dateToDisplay =meds[i].created_at;
			//also want to keep one unix time for our checkUpdate function
            entry.date = new Date(meds[i].created_at).now;
            console.log(entry.date);
		}
		deserial.push(entry);
	}
    }
	return(deserial);
}

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

function format(date){
	var entryDate = new Date(JSON.stringify(date).replace(/\"/g, "") *1000);
	var day = (entryDate.getDate()<10?'0':'' )+ entryDate.getDate();
	var month = (entryDate.getMonth()<10?'0':'' )+ (entryDate.getMonth()+1);
	var year = entryDate.getFullYear();
	var newDate = month + "/" + day + "/" + year;
	return(newDate);

}
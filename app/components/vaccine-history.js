import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	medicationList: [],
	router: Ember.inject.service('-routing'),
	actions:{
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
		console.log('getting ajax for vaccine');
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
		return(ajaxGet);
	}
});

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


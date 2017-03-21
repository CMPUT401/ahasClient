import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	medicationList: [],
	router: Ember.inject.service('-routing'),
	actions:{
		newEntry: function(){
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
		viewEntry: function(recordID){
			//this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
			console.log('view entry ' + recordID);
		}
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax");
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/medical_records/medication'
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
							medications: deserialAttributes(data.medications)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicationList', deserialAttributes(data.medications));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
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
		entry.recordId = JSON.stringify(meds[i].id).replace(/\"/g, "");
		if(JSON.stringify(meds[i].type) != null){
			entry.type = JSON.stringify(meds[i].type).replace(/\"/g, "");
		}else {
			entry.type = JSON.stringify(meds[i].type);
		}
		if(JSON.stringify(meds[i].name) != null){
			entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
		}else {
			entry.name = JSON.stringify(meds[i].name);
		}
		if(JSON.stringify(meds[i].reminder) != null){
			//convert from unix time to a date string
			var entryDate = new Date(JSON.stringify(meds[i].reminder).replace(/\"/g, "") *1000);
			var day = entryDate.getDate();
			var month = entryDate.getMonth();
			var year = entryDate.getFullYear();
			entry.date = month + "/" + day + "/" + year;
		}else{
			entry.date = JSON.stringify(meds[i].reminder);
		}
		deserial.push(entry);

	}
	return(deserial);
}

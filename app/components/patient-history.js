import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: true,
	patientId: 0,
	ajax: Ember.inject.service(),
	medicalRecord: [],
	router: Ember.inject.service('-routing'),
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			// console.log("show chrono, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible'),
		viewEntry: function(recordID){
			// this.get('router').transitionTo('/view-patient/'+ this.patientId +
			// 	'/view-medical-record/'+ recordID);
			this.get('router').transitionTo('view-patient.view-medical-record', [this.patientId, recordID]);
			// this.get('router').transitionTo('client-list');
			// this.get('router').transitionTo('view-medical-record', this.patientId, recordID);
		}
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax");
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/medical_records'
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
							history: deserialAttributes(data.medical_records)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicalRecord', deserialAttributes(data.medical_records));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		console.log(this.medicalRecord);
		// this.medicalRecord = [{"id": "1", "examNotes": "something", "date": "now"}, 
		// {"id": "2", "examNotes": "something else", "date": "later"}];
	}
});

function deserialAttributes(history){
	var deserial = [];
	for(var i = 0; i < history.length; i++) {
		var entry = history[i];
		entry.recordId = JSON.stringify(history[i].id).replace(/\"/g, "");
		if(JSON.stringify(history[i].exm_notes) != null){
			entry.examNotes = JSON.stringify(history[i].summary).replace(/\"/g, "");
		}else {
			entry.examNotes = JSON.stringify(history[i].summary);
		}
		// TODO convert from Unix time, to something more readable
		if(JSON.stringify(history[i].date) != null){
			var entryDate = new Date(JSON.stringify(history[i].created_at).replace(/\"/g, "") *1000);
			var day = entryDate.getDate();
			var month = entryDate.getMonth();
			var year = entryDate.getFullYear();
			entry.date = month + "/" + day + "/" + year;
		}else{
			entry.date = JSON.stringify(history[i].created_at);
		}
		deserial.push(entry);

	}
	return(deserial);
}

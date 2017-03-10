import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: true,
	patientId: 0,
	ajax: Ember.inject.service(),
	medicalRecord: null,
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
		}.observes('isVisible')
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax");
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/medical_records'
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
							history: deserialAttributes(data.medical_records)
						});
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		this.medicalRecord = history;
	}
});

function deserialAttributes(history){
	var deserial = [];
	for(var i = 0; i < history.length; i++) {
		var entry = history[i];
		entry.id = JSON.stringify(history[i].id).replace(/\"/g, "");
		if(JSON.stringify(history[i].exm_notes) != null){
			entry.examNotes = JSON.stringify(history[i].exm_notes).replace(/\"/g, "");
		}
		if(JSON.stringify(history[i].date) != null){
			entry.date = JSON.stringify(history[i].date).replace(/\"/g, "");
		}
		deserial.push(entry);

	}
	return(deserial);
}

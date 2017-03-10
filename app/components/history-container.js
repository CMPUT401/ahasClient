import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	patientID: 0,
	// init(patientId){
	// 	//this.set('patientID', patientId);
	// 	this._super(...arguments);
	// },
	actions: {
		showChronological: function(){
			// console.log("show chrono, the id is " + patientId);
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
		},
		showMedication: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
		}
	}
});

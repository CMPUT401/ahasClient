import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	actions: {
		showChronological: function(patientId){
			console.log("show chrono, the id is " + patientId);
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
		},
		showMedication: function(patientId){
			console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
		}
	}
});

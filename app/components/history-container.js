import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	labResultIsVisible:false,
	patientID: 0,
	actions: {
		showChronological: function(){
			// console.log("show chrono, the id is " + patientId);
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
		},
		showMedication: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
			this.set('labResultIsVisible', false);
		},
		showLabResults: function(){
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', true);
		}
	}
});

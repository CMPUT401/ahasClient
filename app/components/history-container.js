import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	labResultIsVisible:false,
	vaccineIsVisible: false,
	radiographyIsVisible: false,
	patientID: 0,
	actions: {
		showChronological: function(){
			// console.log("show chrono, the id is " + patientId);
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		showMedication: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		showLabResults: function(){
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', true);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		showVaccine: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', true);
			this.set('radiographyIsVisible', false);
		},
		showRadiographs: function(){
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', true);
		}

	}
});

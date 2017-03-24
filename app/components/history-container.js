import Ember from 'ember';

/**
* Controller for the history-container component
* @class HistoryContainerComponentController
*/
export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	labResultIsVisible:false,
	vaccineIsVisible: false,
	radiographyIsVisible: false,
	patientID: 0,
	actions: {
		/**
		* Shows the component which shows the list of all medical records for the patient in chronological order
		* @method showChronological
		*/ 
		showChronological: function(){
			// console.log("show chrono, the id is " + patientId);
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		/**
		* Shows the component which shows the list of all medicine for the patient
		* @method showMedication
		*/ 
		showMedication: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		/**
		* Shows the component which shows the list of all lab results for the patient
		* @method showLabResults
		*/ 
		showLabResults: function(){
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', true);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', false);
		},
		/**
		* Shows the component which shows the list of all vaccines for the patient
		* @method showVaccine
		*/ 
		showVaccine: function(){
			// console.log("show medication, the id is " + patientId);
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', true);
			this.set('radiographyIsVisible', false);
		},
		/**
		* Shows the component which shows the list of all radiographs for the patient
		* @method showRadiographs
		*/ 
		showRadiographs: function(){
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', false);
			this.set('labResultIsVisible', false);
			this.set('vaccineIsVisible', false);
			this.set('radiographyIsVisible', true);
		}

	}
});

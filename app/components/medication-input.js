import Ember from 'ember';

/**
* controller for the medication-input component
* Simple container to capture state from entry boxes
* @class MedicationInputComponentController
*/
export default Ember.Component.extend({
	actions: {
		
		/** 
		* Set update action to delete callback passed in
		* handles updating just one medication input
		* @method update
		*/
		update: function(){
			this.update(this.index, this.name, this.reminder);
		},
	/** 
		* Set delete action to delete callback passed in
		* handles deleting just one medication input
		* @method delete
		*/
		delete: function(){
			this.delete(this.index);
		}
	}
});
import Ember from 'ember';

// Simple container to capture state from entry boxes
export default Ember.Component.extend({
	actions: {
		// Set update action to callback passed in to component
		update: function(){
			//this.update(this.index, this.name, this.date);
		},
		delete: function(){
		// Set delete action to delete callback passed in
			//this.delete(this.index);
		}
	}
});
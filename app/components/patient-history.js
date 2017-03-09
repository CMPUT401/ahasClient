import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: true,
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			this.toggleProperty('isVisible');
		}
	}
});

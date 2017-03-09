import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible')
		// toggleVisibility: function(){
		// 	this.toggleProperty('isVisible');
		// }
	}
});

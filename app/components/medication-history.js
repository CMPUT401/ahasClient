import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			// console.log("show medication, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible')
	}
});

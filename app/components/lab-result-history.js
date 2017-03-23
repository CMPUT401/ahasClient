import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId: 0,
	ajax: Ember.inject.service(),
	labResultList: [],
	router: Ember.inject.service('-routing'),
	actions: {
		uploadResult: function(){
			console.log("making a new medical history entry");
		}
	}
});
